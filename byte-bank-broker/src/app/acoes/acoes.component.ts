import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Acoes} from './modelo/acoes';
import {AcoesService} from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
const ESPERA_DIGITACAO=300;
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  acoesInput = new FormControl();
  todasAcoes$=this.acoesService.getAcoes().pipe(tap(console.log));
  filtroPeloInput$=this.acoesInput.valueChanges.pipe(
  debounceTime(ESPERA_DIGITACAO),
  tap(()=>{console.log('Fluxo do Filtro')}),
  tap(console.log),
  filter((valorDigitado)=>valorDigitado.length >=3 || !valorDigitado.length),
  distinctUntilChanged(),
  switchMap((valorDigitado)=>this.acoesService.getAcoes(valorDigitado)));


  //ESSA FUNCAO MERGE COMBINA DOIS FLUXOS INDENPOENDEDNTES
  acoes$ =merge(this.todasAcoes$,this.filtroPeloInput$);


  constructor(private acoesService:AcoesService) {}


}
