import { Injectable, EventEmitter } from '@angular/core';
import { MainComponent } from '../components/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  constructor() { }

  private contadorDois:any;

  getContador(){
    return this.contadorDois;
  }

  setContador(newContador:any){
    this.contadorDois = newContador;
  }

}
