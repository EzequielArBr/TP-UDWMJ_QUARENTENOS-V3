import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LembreteListaComponent } from './lembretes/lembrete-lista/lembrete-lista.component'
import { LembreteInserirComponent } from './lembretes/lembrete-inserir/lembrete-inserir.component';

const routes: Routes = [
  { path: '', component: LembreteListaComponent },
  {path: 'criar', component: LembreteInserirComponent},
  {path: 'editar/:idLembrete', component: LembreteInserirComponent}
  ];


@NgModule({
  declarations: [
    AppComponent,
    LembreteInserirComponent,
    CabecalhoComponent,
    LembreteListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ],
  
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
