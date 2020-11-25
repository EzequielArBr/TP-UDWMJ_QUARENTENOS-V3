import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Lembrete } from './lembrete.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor(private HttpLembrete : HttpClient) {

  }

  private lembretes: Lembrete [] = [];

  getLembretes(): void {
    this.HttpLembrete.get<{mensagem : string, lembretes:any}>('http://localhost:3000/api/lembretes')
      .pipe(map((dados) => {
        return dados.lembretes.map(lem => {
          return {
          id: lem._id,
          titulo: lem.titulo,
          dataCadastro: lem.dataCadastro,
          dataPrevista: lem.dataPrevista,
          atividade: lem.atividade
          }
        })
      }))
      .subscribe((lembretes) => {
      this.lembretes = lembretes;
      this.listaLembretesAtualizada.next([...this.lembretes])
    })
  }

  private listaLembretesAtualizada = new Subject <Lembrete[]>();

  adicionarLembrete (titulo: string, dataCadastro: string, dataPrevista: string, atividade: string ): void{
    const lembrete: Lembrete = {  
      id: null,
      titulo: titulo,
      dataCadastro: dataCadastro,
      dataPrevista: dataPrevista,
      atividade:atividade

    };
    this.HttpLembrete.post<{mensagem: string, id: string}>(
      'http://localhost:3000/api/lembretes',
      lembrete
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      lembrete.id = dados.id;
      this.lembretes.push(lembrete);
      this.listaLembretesAtualizada.next([...this.lembretes]);
    })
  }

  getListaDeLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }

  getLembrete (idLembrete: string){
    //return {...this.lembretes.find((lem) => lem.id === idLembrete)};
    return this.HttpLembrete.get<{_id: string, titulo: string, dataCadastro: string, dataPrevista:
      string,atividade:string}>(`http://localhost:3000/api/lembretes/${idLembrete}`);
    }
  
  atualizarLembrete (id: string, titulo: string, dataCadastro: string, dataPrevista: string,atividade: string){
    const lembrete: Lembrete = { id, titulo, dataCadastro, dataPrevista,atividade};
    this.HttpLembrete.put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
    .subscribe((res => {
      const copia = [...this.lembretes];
      const indice = copia.findIndex (lem => lem.id === lembrete.id);
      copia[indice] = lembrete;
      this.lembretes = copia;
      this.listaLembretesAtualizada.next([...this.lembretes]);
    }));
  }


  removerLembrete (id: string): void{
    this.HttpLembrete.delete(`http://localhost:3000/api/lembretes/${id}`)
    .subscribe(() => {
      console.log (`Lembrete de id: ${id} removido`);
      this.lembretes = this.lembretes.filter((lem) =>{
        return lem.id !== id
      })
      this.listaLembretesAtualizada.next([...this.lembretes]);
    });
  }  
}
