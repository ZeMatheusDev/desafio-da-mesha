import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { count } from 'rxjs';
import { ValoresService } from '../../services/valores.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],

})
export class ListagemComponent implements OnInit {
  evento = new ValoresService;
  teste:any;
  contador:any;
  @Input() clientes!:any
  recebido1 = localStorage.getItem('ClimaEMusicas1');
  valoresEmArray1:any;
  recebido2 = localStorage.getItem('ClimaEMusicas2');
  valoresEmArray2:any;
  recebido3 = localStorage.getItem('ClimaEMusicas3');
  valoresEmArray3:any;
  recebido4 = localStorage.getItem('ClimaEMusicas4');
  valoresEmArray4:any;
  recebido5 = localStorage.getItem('ClimaEMusicas5');
  valoresEmArray5:any;
  recebido6 = localStorage.getItem('ClimaEMusicas6');
  valoresEmArray6:any;
  recebido7 = localStorage.getItem('ClimaEMusicas7');
  valoresEmArray7:any;
  recebido8 = localStorage.getItem('ClimaEMusicas8');
  valoresEmArray8:any;
  recebido9 = localStorage.getItem('ClimaEMusicas9');
  valoresEmArray9:any;
  recebido10 = localStorage.getItem('ClimaEMusicas10');
  valoresEmArray10:any;
  contador1:any;
  salve:any ='oi'
  

  constructor() {
    if(this.recebido1 != null){
      this.valoresEmArray1 = JSON.parse(localStorage[`ClimaEMusicas1`])
    }
    if(this.recebido2 != null){
      this.valoresEmArray2 = JSON.parse(localStorage[`ClimaEMusicas2`])
    }
    if(this.recebido3 != null){
      this.valoresEmArray3 = JSON.parse(localStorage[`ClimaEMusicas3`])
    }
    if(this.recebido4 != null){
      this.valoresEmArray4 = JSON.parse(localStorage[`ClimaEMusicas4`])
    }
    if(this.recebido5 != null){
      this.valoresEmArray5 = JSON.parse(localStorage[`ClimaEMusicas5`])
    }
    if(this.recebido6 != null){
      this.valoresEmArray6 = JSON.parse(localStorage[`ClimaEMusicas6`])
    }
    if(this.recebido7 != null){
      this.valoresEmArray7 = JSON.parse(localStorage[`ClimaEMusicas7`])
    }
    if(this.recebido8 != null){
      this.valoresEmArray8 = JSON.parse(localStorage[`ClimaEMusicas8`])
    }
    if(this.recebido9 != null){
      this.valoresEmArray9 = JSON.parse(localStorage[`ClimaEMusicas9`])
    }
    if(this.recebido10 != null){
      this.valoresEmArray10 = JSON.parse(localStorage[`ClimaEMusicas10`])
    }
  }

  ngOnInit(): void {
  }
  
  recebendoValores(): void{

  }

  removerLocalStorage(numero:number){
    localStorage.removeItem(`ClimaEMusicas${numero}`);
    let contador = Number(localStorage.getItem('Contador'))
    contador = numero-1;
    localStorage[`Contador`] = JSON.stringify(contador);
    location.reload()
  }

}
