import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, pluck, tap} from 'rxjs/operators';
import { Acao, Acoes, AcoesAPI } from './modelo/acoes';
@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http:HttpClient) {}


  getAcoes(valor?: string)
  {
    const  params = valor? new HttpParams().append('valor',valor):undefined;
    return this.http.get<AcoesAPI>('http://localhost:3000/acoes',{params}).pipe(
     
      //TAP
      tap((valor)=>console.log(valor)),
      //MAP PRA ALTERAR O OBJETO DO FLUXO
      //PLUCK NOS EXTRAIMOS
      pluck('payload'),
      map((acoes)=>
      acoes.sort((acaoA,acaoB)=>this.ordenaPorCodigo(acaoA,acaoB))
    
    ));
  
  }

  private ordenaPorCodigo(acaoA:Acao,acaoB:Acao){
    if(acaoA.codigo>acaoB.codigo)
    {
     return 1; 
    }
    
    if(acaoA.codigo<acaoB.codigo)
    {
      return -1;
    }

    //IGUAIS
    return 0;
  }










}
