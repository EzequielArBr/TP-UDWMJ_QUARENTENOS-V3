import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-lembrete-inserir',
  templateUrl: './lembrete-inserir.component.html',
  styleUrls: ['./lembrete-inserir.component.css'],
})


export class LembreteInserirComponent implements OnInit {
  private modo: string = "criar";
  private idLembrete: string;
  public lembrete: Lembrete;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLembrete")){
        this.modo = "editar";
        this.idLembrete = paramMap.get("idLembrete");
        this.LembreteService.getLembrete(this.idLembrete).subscribe( dadosLem => {
          this.lembrete = {
            id: dadosLem._id,
            titulo: dadosLem.titulo,
            dataCadastro: dadosLem.dataCadastro,
            dataPrevista: dadosLem.dataPrevista,
            atividade: dadosLem.atividade,
            };
        });
      }
      else{
        this.modo = "criar";
        this.idLembrete = null;
      }
      });
  }

  constructor (public LembreteService: LembreteService, public route: ActivatedRoute){


  }

  onSalvarLembrete(form: NgForm) {
    if (form.invalid) {
      return;
    }  
    if (this.modo === "criar"){
      this.LembreteService.adicionarLembrete(
      form.value.titulo,
      form.value.dataCadastro,
      form.value.dataPrevista,
      form.value.atividade
    );
    }
    else{
      this.LembreteService.atualizarLembrete(
      this.idLembrete,
      form.value.titulo,
      form.value.dataCadastro,
      form.value.dataPrevista,
      form.value.atividade
      )
    }
    form.resetForm();

  }
}
