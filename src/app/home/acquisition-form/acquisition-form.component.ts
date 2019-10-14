import { LoadingService } from 'src/app/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { PagseguroService } from 'src/app/services/pagseguro.service';
import { VariableGlobalService } from 'src/app/services/variable-global.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

declare let PagSeguroDirectPayment: any;

@Component({
  selector: 'app-acquisition-form',
  templateUrl: './acquisition-form.component.html',
  styleUrls: ['./acquisition-form.component.scss']
})
export class AcquisitionFormComponent implements OnInit {

  isLinear = false;
  items = [];
  load = true;
  firstFormGroup: FormGroup;

  constructor(private pagseguroService: PagseguroService, private formBuilder: FormBuilder,
    private variableGlobal: VariableGlobalService, private loadingService: LoadingService) { }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      method: ['CARTÃO DE CRÉDITO'],
    });

    this.items = JSON.parse(localStorage.getItem('item'));
    this.loadJavascriptPagseguro();

  }

  loadJavascriptPagseguro() {

    if (!this.variableGlobal.getStatusScript()) {

      new Promise((resolve) => {

        let script: HTMLScriptElement = document.createElement('script');
        script.addEventListener('load', r => resolve());
        script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
        document.head.appendChild(script);

      });

      this.pagseguroService.startSession().subscribe(
        data => {
          PagSeguroDirectPayment.setSessionId(data.session.id[0])
          this.load = false;
          console.log(data);

          PagSeguroDirectPayment.getPaymentMethods({
            amount: this.getTotalCost(),
            success: function (response) {
              console.log(response);

              $.each(response.paymentMethods.CREDIT_CARD.options, function (i, obj) {
                $('.creditCard').append("<img src=https://stc.pagseguro.uol.com.br./" + obj.images.MEDIUM.path + ">");
              })
              $.each(response.paymentMethods.BOLETO.options, function (i, obj) {
                $('.boleto').append("<div><img src=https://stc.pagseguro.uol.com.br./" + obj.images.MEDIUM.path + ">" + "<h1>" + obj.displayName + "</h1>" + "</div>");
              })

            },
            error: function (response) {
              return response
            },
            complete: function (response) {
            }
          });

        },
        e => {
          console.log(e);
        },
        () => { }
      );
      this.variableGlobal.setStatusScript(true);
    }

  }

  getTotalCost() {
    return this.items.map(t => t.product.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  firstFormGroupSubmit() {
    console.log(this.firstFormGroup.value.method)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.items = []
  }

}
