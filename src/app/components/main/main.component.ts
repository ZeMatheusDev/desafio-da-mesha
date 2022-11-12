import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { ValoresService } from '../../services/valores.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  WeatherData:any; //receber dados do clima 
  MusicasData:any;  //receber dados das musicas
  rock:string = 'rock';  // genero pre escolhido
  pop:string = 'pop'; // genero pre escolhido
  classica:string = 'classica'; // genero pre escolhido
  lofi:string = 'lofi'; // genero pre escolhido
  genero:string = '' // genero selecionado
  arrayMusicas:any= []; 
  arrayClima:any=[];
  arrayTotal:any=[];
  juncao:any=[]; //
  datahora:any=[];
  contador:number = 1; // contador do localstorage
  arrayCheio:any; // saber se bateu o limite de 10 saves de cidades
  @Input() recebido:any;
  
  constructor(private dataService: ValoresService) {

    this.recebido = this.MusicasData;
   }

  ngOnInit(): void {
    if(localStorage['Contador'] != undefined){ // se o contador existir no localstorage
      let teste = Number(localStorage.getItem('Contador')) // pega o valor de contador e transforma em numero
    
      if(teste == 10){
        this.contador = 1; 
      } // apos dar reload, se o numero do contador for 10, qnd ele dar save, se transformar em 1 para nao passar dos 10 maximo

    }
    this.WeatherData = {
      main: {} // declarando o main do array de clima como vazio 
    }
    this.MusicasData = {
      nome: '', //de clarando o nome de musicas vazio inicial
    }
    this.getWeatherData(); // chamando os dados de clima
    this.getMusicasData(); // chamando os dados de musica
  }
 

  getWeatherData(nome: string = 'Maceió'){  // cidade escolhida automaticamente
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nome}&appid=e70bc26d604f90f1dddb9749ee87159a`) // API de clima
      .then(response=>response.json())   //transformando em JSON
      .then(data=>{this.setWeatherData(data)})  // recebendo
      .then(data=>{this.getMusicasData(data)})  // recebendo
  

  }


  setWeatherData(data: any){
    this.WeatherData = data; // passando os valores de clima para weatherData
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000); // sabendo horario atual
    this.WeatherData.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date(); // pegando data
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime()); 
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0); // transformando de temperatura kelvin para celcius
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0); // transformando de temperatura kelvin para celcius
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0); // transformando de temperatura kelvin para celcius
    this.WeatherData.temp_feels_like  = (this.WeatherData.main.feels_like - 273.15).toFixed(0); // transformando de temperatura kelvin para celcius

  }

  setMusicasData(musicas: any){
    this.MusicasData = musicas; // passando os valores de musicas da API para musicasData
    this.MusicasData.nome1 = this.MusicasData.tracks.hits[0].track.title;  // pegando as 5 primeiras musicas
    this.MusicasData.nome2 = this.MusicasData.tracks.hits[1].track.title; // pegando as 5 primeiras musicas
    this.MusicasData.nome3 = this.MusicasData.tracks.hits[2].track.title;  // pegando as 5 primeiras musicas
    this.MusicasData.nome4 = this.MusicasData.tracks.hits[3].track.title;   // pegando as 5 primeiras musicas
    this.MusicasData.nome5 = this.MusicasData.tracks.hits[4].track.title;   // pegando as 5 primeiras musicas
  }

  exibir(){
    let nome: string = (<HTMLInputElement>document.getElementById('envio')).value; // recebendo o valor enviado no html de nomne da cidade
    this.getWeatherData(nome);  // pegando os climas da cidade com o nome do valor enviado no html
  }

  salvar(){
    this.arrayMusicas.push(this.MusicasData.nome1); // enviando as musicas para o array vazio
    this.arrayMusicas.push(this.MusicasData.nome2); // enviando as musicas para o array vazio
    this.arrayMusicas.push(this.MusicasData.nome3); // enviando as musicas para o array vazio
    this.arrayMusicas.push(this.MusicasData.nome4); // enviando as musicas para o array vazio
    this.arrayMusicas.push(this.MusicasData.nome5); // enviando as musicas para o array vazio
    this.arrayClima.push(this.WeatherData.name); // enviando o nome da cidade para o array vazio
    this.arrayClima.push(this.genero); // enviando o genero musical de acordo com o grau para o array vazio
    this.arrayClima.push(this.WeatherData.temp_celcius);  // enviando a temperatura de graus celcius para o array vazio
    this.datahora.push(new Date()); // enviando a data de envio para o array vazio apos clicar no botao salvar
    this.arrayTotal.push(this.datahora); // recebendo o array de data
    this.arrayTotal.push(this.arrayMusicas); // recebendo o array que recebe as musicas
    this.arrayTotal.push(this.arrayClima); // recebendo o array que recebe as informacoes da cidade
    localStorage[`Contador`] = JSON.stringify(this.contador); // enviando o numero do contador para o localstorage
    if(localStorage[`ClimaEMusicas1`] && localStorage[`ClimaEMusicas2`] && localStorage[`ClimaEMusicas3`] && localStorage[`ClimaEMusicas4`] && localStorage[`ClimaEMusicas5`]
    && localStorage[`ClimaEMusicas6`] && localStorage[`ClimaEMusicas7`] && localStorage[`ClimaEMusicas8`] && localStorage[`ClimaEMusicas9`] && localStorage[`ClimaEMusicas10`]){
      this.arrayCheio = true;
    } // caso o localstorage tenha 10 arraytotal retornar um valor true
    if(this.arrayCheio == false){ 
    if(localStorage[`ClimaEMusicas${this.contador}`] == undefined){
      localStorage[`ClimaEMusicas${this.contador}`] = JSON.stringify(this.arrayTotal);
    } // se nao for true, e se contador for indefinido, ou seja, nao exista onde o numero do contador estiver, fazer o envio de arraytotal

    else{ 
      let index = 1;
      while(localStorage[`ClimaEMusicas${index}`] == undefined) {
        index++;
      }
      this.contador = index;
    } // caso ja exista, ele faz um for que procura de climaemusicas1 ate o 10, ate achar qual nao existe e apos encontrar, o numero que nao existe, sera recebido no contador
  }
    localStorage[`ClimaEMusicas${this.contador}`] = JSON.stringify(this.arrayTotal); // apos receber o contador que nao existe, faz um envio de informacoes para o localstorage
    this.arrayMusicas = []; // esvazia o array de musicas
    this.datahora = []; // esvazia o array de data
    this.arrayClima = []; // esvazia o array de clima
    this.arrayTotal = []; // esvazia o array de arrays
    if(this.contador < 10){ 
    this.contador += 1;
    }
    else{
    this.contador = 1;
    } // faz o save de cidades nao passar de 10, caso passe, retorna para o valor 1, assim sobrescrevendo se salvar novamente
  }
  getMusicasData(genero?: any, data?: any){
    if(this.WeatherData.temp_celcius > 32){
      genero = 'rock';
    } // se a cidade for maior que 32 graus celcius, retornar o genero rock
    if(this.WeatherData.temp_celcius > 24 && this.WeatherData.temp_celcius < 32){
      genero = 'pop';
    } // se a cidade for menor que 32 graus celcius e maior que 24, retornar o genero pop
    if(this.WeatherData.temp_celcius > 16 && this.WeatherData.temp_celcius < 24){
      genero = 'classica';
    } // se a cidade for menor que 24 graus celcius e maior que 16, retornar o genero classica
    if(this.WeatherData.temp_celcius < 16){
      genero = 'lofi';
    } // se a cidade for menor que 16 graus celcius, retornar o genero lofi
    this.genero = genero; // passando o valor do if para a variavel da classe
    fetch(`https://shazam.p.rapidapi.com/search?term=$${genero}&rapidapi-key=5baa513b6fmshaf74a21279ee011p126735jsn2be7a268c7c8`) // API de musicas
    .then(response=>response.json()) // transformando em JSON
    .then(musicas=>{this.setMusicasData(musicas)}) //enviando os dados para setMusicasData como parametro

}


}
