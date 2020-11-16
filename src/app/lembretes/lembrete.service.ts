import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Lembrete } from './lembrete.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor(private httpLembrete : HttpClient) {

  }

  private lembretes: Lembrete [] = [];

  getLembretes(): void {
    this.httpLembrete.get<{mensagem : string, lembretes: Lembrete[]}>(
      'http://localhost:3000/api/lembretes'
    ).subscribe((dados) => {
      this.lembretes = dados.lembretes
      this.listaLembretesAtualizada.next([...this.lembretes])
    })
    //return [...this.lembretes];
  }

  private listaLembretesAtualizada = new Subject <Lembrete[]>();

  adicionarLembrete (titulo: string, dataCadastro: string, dataPrevista: string, atividade: string ): void{
    const lembrete: Lembrete = {
      titulo: titulo,
      dataCadastro: dataCadastro,
      dataPrevista: dataPrevista,
      atividade:atividade

    };
    this.httpLembrete.post<{mensagem: string}>(
      'http://localhost:3000/api/lembretes',
      lembrete
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      this.lembretes.push(lembrete);
      this.listaLembretesAtualizada.next([...this.lembretes]);
    })
  }

  getListaDeLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }



}
