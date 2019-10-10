import { TrainingService } from './../../services/training.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare let PagSeguroDirectPayment: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  training;

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-treinamentos-lq.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-treinamentos.jpg';

  constructor(private trainingService: TrainingService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Treinamentos - Berlim Digital');
    this.trainingService.getTrainings().subscribe(data => {
      this.training = data;
    })

    this.trainingService.teste().subscribe(data => {
      PagSeguroDirectPayment.setSessionId(data.session.id[0]);
      console.log(data.session.id[0]);

    });
  }


  carregaJavascriptPagseguro() {

    if (!this.variableGlobal.getStatusScript()) {
      //SEJA O JAVASCRIPT NO CABEÇÁRIO DA PÁGINA
      new Promise((resolve) => {
        let script: HTMLScriptElement = document.createElement('script');
        script.addEventListener('load', r => resolve());
        script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
        document.head.appendChild(script);
      });

      //BUSCA UM ID DE SESSÃO NO SERVIDOR (ESTE ID É GERADO PELA API DO PAGSEGURO QUE VOCÊ DEVE CONSUMIR USANDO SEU SERVIDOR. LER DOCUMENTAÇÃO PARA SABER COMO GERAR)
      this.pagamentoService.startSession().subscribe(result => PagSeguroDirectPayment.setSessionId(result));

      this.variableGlobal.setStatusScript(true);
    }

  }


}
