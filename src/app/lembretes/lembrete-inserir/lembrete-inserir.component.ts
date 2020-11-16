//import { Component, EventEmitter, Output } from '@angular/core';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';
@Component({
  selector: 'app-lembrete-inserir',
  templateUrl: './lembrete-inserir.component.html',
  styleUrls: ['./lembrete-inserir.component.css'],
})
export class LembreteInserirComponent {

  constructor (public LembreteService: LembreteService){


  }


  //@Output() lembreteAdicionado = new EventEmitter<Lembrete>();
  //titulo: string;
  //dataCadastro: string;
  //dataPrevista: string;
  //atividade: string;

  onAdicionarLembrete(form: NgForm) {
    if (form.invalid) return;
    this.LembreteService.adicionarLembrete(
      form.value.titulo,
      form.value.dataCadastro,
      form.value.dataPrevista,
      form.value.atividade
      
    );
    form.resetForm();
    // const lembrete: Lembrete = {
    //   titulo: form.value.titulo,
    //   dataCadastro: form.value.dataCadastro,
    //   dataPrevista: form.value.dataPrevista,
    //   atividade: form.value.atividade,
    // };
    // this.lembreteAdicionado.emit(lembrete);
  }
}
