import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'listagem', component: ListagemComponent},
  {path:'', component: HomeComponent},
  {path:'pesquisa', component: MainComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
