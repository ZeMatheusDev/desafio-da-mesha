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
  recebido1 = localStorage.getItem('ClimaEMusicas1'); // pegando o localstorage de clima e musicas 1
  valoresEmArray1:any;
  recebido2 = localStorage.getItem('ClimaEMusicas2'); // pegando o localstorage de clima e musicas 2
  valoresEmArray2:any;
  recebido3 = localStorage.getItem('ClimaEMusicas3'); // pegando o localstorage de clima e musicas 3
  valoresEmArray3:any;
  recebido4 = localStorage.getItem('ClimaEMusicas4'); // pegando o localstorage de clima e musicas 4
  valoresEmArray4:any;
  recebido5 = localStorage.getItem('ClimaEMusicas5'); // pegando o localstorage de clima e musicas 5
  valoresEmArray5:any;
  recebido6 = localStorage.getItem('ClimaEMusicas6'); // pegando o localstorage de clima e musicas 6
  valoresEmArray6:any;
  recebido7 = localStorage.getItem('ClimaEMusicas7'); // pegando o localstorage de clima e musicas 7
  valoresEmArray7:any;
  recebido8 = localStorage.getItem('ClimaEMusicas8'); // pegando o localstorage de clima e musicas 8
  valoresEmArray8:any;
  recebido9 = localStorage.getItem('ClimaEMusicas9'); // pegando o localstorage de clima e musicas 9
  valoresEmArray9:any;
  recebido10 = localStorage.getItem('ClimaEMusicas10'); // pegando o localstorage de clima e musicas 10
  valoresEmArray10:any;
  contador1:any;
  

  constructor() {
    if(this.recebido1 != null){ 
      this.valoresEmArray1 = JSON.parse(localStorage[`ClimaEMusicas1`])
    } // se o localstorage de cliama e musicas1 existir, receber esses dados em valoraemarray
    if(this.recebido2 != null){
      this.valoresEmArray2 = JSON.parse(localStorage[`ClimaEMusicas2`])
    } // se o localstorage de cliama e musicas2 existir, receber esses dados em valoraemarray
    if(this.recebido3 != null){
      this.valoresEmArray3 = JSON.parse(localStorage[`ClimaEMusicas3`])
    } // se o localstorage de cliama e musicas3 existir, receber esses dados em valoraemarray
    if(this.recebido4 != null){
      this.valoresEmArray4 = JSON.parse(localStorage[`ClimaEMusicas4`])
    } // se o localstorage de cliama e musicas4 existir, receber esses dados em valoraemarray
    if(this.recebido5 != null){
      this.valoresEmArray5 = JSON.parse(localStorage[`ClimaEMusicas5`])
    } // se o localstorage de cliama e musicas5 existir, receber esses dados em valoraemarray
    if(this.recebido6 != null){
      this.valoresEmArray6 = JSON.parse(localStorage[`ClimaEMusicas6`])
    } // se o localstorage de cliama e musicas6 existir, receber esses dados em valoraemarray
    if(this.recebido7 != null){
      this.valoresEmArray7 = JSON.parse(localStorage[`ClimaEMusicas7`])
    } // se o localstorage de cliama e musicas7 existir, receber esses dados em valoraemarray
    if(this.recebido8 != null){
      this.valoresEmArray8 = JSON.parse(localStorage[`ClimaEMusicas8`])
    } // se o localstorage de cliama e musicas8 existir, receber esses dados em valoraemarray
    if(this.recebido9 != null){
      this.valoresEmArray9 = JSON.parse(localStorage[`ClimaEMusicas9`])
    } // se o localstorage de cliama e musicas9 existir, receber esses dados em valoraemarray
    if(this.recebido10 != null){
      this.valoresEmArray10 = JSON.parse(localStorage[`ClimaEMusicas10`])
    } // se o localstorage de cliama e musicas10 existir, receber esses dados em valoraemarray
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
  } // pega o localstorage de clima e musicas, apagando o localstorage selecionado pelo parametro do html de acordo com sua numeracao
  // apaga ele, recebe o valor de contador do localstorage, transforma de string para number, subtrai por 1 para que o proximo save, seja em cima do que ele apagou
  // logo apos, envia novamente para o localstorage contador e da reload na pagina

}
