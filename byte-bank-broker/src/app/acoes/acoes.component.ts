import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Acoes} from './modelo/acoes';
import {AcoesService} from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  acoesInput = new FormControl();
  todasAcoes$=this.acoesService.getAcoes().pipe(tap(console.log));
  filtroPeloInput$=this.acoesInput.valueChanges.pipe(tap(()=>{console.log('Fluxo do Filtro')}),switchMap((valorDigitado)=>this.acoesService.getAcoes(valorDigitado)));


  //ESSA FUNCAO MERGE COMBINA DOIS FLUXOS INDENPOENDEDNTES
  acoes$ =merge(this.todasAcoes$,this.filtroPeloInput$);


  constructor(private acoesService:AcoesService) {}


}
