import { LoadingService } from 'src/app/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { PagseguroService } from 'src/app/services/pagseguro.service';
import { VariableGlobalService } from 'src/app/services/variable-global.service';

declare let PagSeguroDirectPayment: any;

@Component({
  selector: 'app-acquisition-form',
  templateUrl: './acquisition-form.component.html',
  styleUrls: ['./acquisition-form.component.scss']
})
export class AcquisitionFormComponent implements OnInit {

  items = [];
  load = true;
  public payments = [];

  constructor(private pagseguroService: PagseguroService, private variableGlobal: VariableGlobalService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('item'));
    console.log(this.items);

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

          this.loadPaymentMethods();
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

  loadPaymentMethods() {

    PagSeguroDirectPayment.getPaymentMethods({
      amount: 1,
      success: function (response) {
        console.log(response)
      },
      error: function (response) {
        console.log(response)
      },
      complete: function (response) {
      }
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.items = []
  }

}
