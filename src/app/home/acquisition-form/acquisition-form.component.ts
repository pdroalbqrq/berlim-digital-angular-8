import { QueryCepService } from './../../services/query-cep.service';
import User from 'src/app/models/user-model';
import { UserService } from './../../services/user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { PagseguroService } from 'src/app/services/pagseguro.service';
import { VariableGlobalService } from 'src/app/services/variable-global.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

declare let PagSeguroDirectPayment: any;

@Component({
  selector: 'app-acquisition-form',
  templateUrl: './acquisition-form.component.html',
  styleUrls: ['./acquisition-form.component.scss'],
})
export class AcquisitionFormComponent implements OnInit {

  user: User;
  isLinear = false;
  items = [];
  load = true;
  cards;
  boleto;
  sessionId: string;
  brandImg: string;
  values = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  userInfo: FormGroup;

  month: any[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];
  year: number[] = [];

  constructor(private pagseguroService: PagseguroService, private formBuilder: FormBuilder,
    private userService: UserService, private queryCep: QueryCepService) {

  }

  ngOnInit() {
    this.userInfo = this.formBuilder.group({
      name: [null],
      email: [null],
      adress: this.formBuilder.group({
        postalCode: [null],
        street: [null],
        district: [null],
        city: [null],
        state: [null]
      })
    })

    this.userService.currentUser.subscribe(
      user => {
        this.user = user
        this.userInfo.patchValue(user);
        console.log(user);
      });

    this.secondFormGroup = this.formBuilder.group({
      sessionId: [null],
      amount: [null],
      cardNumber: [null, Validators.required],
      cardCvv: [null, Validators.required],
      cardExpirationMonth: [null],
      cardExpirationYear: [null],
    });
    this.firstFormGroup = this.formBuilder.group({
      method: ['creditCard'],
    });


    this.createYearArray();
    this.items = JSON.parse(localStorage.getItem('item'));
    console.log(this.items);
    this.loadJavascriptPagseguro();

  }
  userInfoSubmit() {
    console.log(this.userInfo.value);
  }

  createYearArray() {

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentLimitYear = currentYear + 25;
    let i = 0;

    for (let index = currentYear; index < currentLimitYear; index++) {
      this.year.push(currentYear + i++);
    }
  }

  getTotalCost() {
    return this.items.map(t => t.product.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  firstFormGroupSubmit() {
    console.log(this.firstFormGroup.value.method)
  }

  secondFormGroupSubmit() {
    const { cardNumber, cardCvv, cardExpirationMonth, cardExpirationYear } = this.secondFormGroup.value

    this.pagseguroService.getCardToken({ sessionId: this.sessionId, amount: this.getTotalCost(), cardBrand: this.brandImg, cardNumber, cardCvv, cardExpirationMonth, cardExpirationYear }).subscribe(data => {

    })

  }
  keyPress(e) {
    if (e.target.value.length >= 6) {
      this.pagseguroService.getCardFlag(e.target.value, this.sessionId).subscribe(data => {
        this.brandImg = `https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/68x30/${data.bin.brand.name}.png`;
      }, e => this.brandImg = '')
    } else {
      this.brandImg = ''
    }

  }

  postalCodeValue() {
    let postalCode = this.userInfo.get('adress.postalCode').value;

    if (postalCode != null && postalCode !== '') {
      if (postalCode.length > 5)
        this.queryCep.queryCep(postalCode).subscribe((data: any) => {

          const { cep, logradouro, bairro, localidade, uf } = data;

          this.userInfo.patchValue({
            adress: {
              postalCode: cep,
              street: logradouro,
              district: bairro,
              city: localidade,
              state: uf
            }
          });
          console.log(data);
        })
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.items = []
  }

  loadJavascriptPagseguro() {

    new Promise((resolve) => {

      let script: HTMLScriptElement = document.createElement('script');
      script.addEventListener('load', r => resolve());
      script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
      document.head.appendChild(script);

    });

    this.pagseguroService.startSession().subscribe(
      async data => {
        this.sessionId = data.session.id[0];
        await PagSeguroDirectPayment.setSessionId(data.session.id[0])
        this.secondFormGroup.value.sessionId = data.session.id[0];
        this.load = false;

        await this.pagseguroService.getPaymentMethods(this.getTotalCost(), data.session.id[0]).subscribe(data => {
          this.cards = data.paymentMethods.CREDIT_CARD.options;
          this.boleto = data.paymentMethods.BOLETO.options;
        });

      },
      e => {
        console.log(e);
      },
    );

  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return obj[key]
    });
  }


}
