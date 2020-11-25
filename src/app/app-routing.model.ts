import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LembreteListaComponent } from './lembretes/lembrete-lista/lembrete-lista.component'
import { LembreteInserirComponent } from './lembretes/lembrete-inserir/lembrete-inserir.component';


const routes: Routes = [
    {path: '', component: LembreteListaComponent },
    {path: 'criar', component: LembreteInserirComponent},
    {path: 'editar/:idLembrete', component: LembreteInserirComponent}
    ];

@NgModule ({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}