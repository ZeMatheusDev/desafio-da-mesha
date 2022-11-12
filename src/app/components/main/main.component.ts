import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'
import { Output } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ValoresService } from '../../services/valores.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
  
})

export class MainComponent implements OnInit {

  WeatherData:any; 
  MusicasData:any;
  rock:string = 'rock';
  pop:string = 'pop';
  classica:string = 'classica';
  lofi:string = 'lofi';
  data:any = ''
  musicas:any = ''
  genero:string = ''
  sucesso:string = ''
  maximoSave:string = ''
  @Input() nome!: string;
  arrayMusicas:any= [];
  arrayClima:any=[];
  arrayTotal:any=[];
  juncao:any=[];
  datahora:any=[];
  contador:number = 1;
  arrayCheio:any;
  @Input() recebido:any;
  exibirx:any = localStorage.getItem('ArrayMusicasEClima'+0);
  
  constructor(private dataService: ValoresService) {

    this.recebido = this.MusicasData;
   }

  ngOnInit(): void {
    if(localStorage['Contador'] != undefined){
      let teste = localStorage.getItem('Contador')
      this.contador = (Number(teste));
    }
    this.WeatherData = {
      main: {}
    }
    this.MusicasData = {
      nome: '',
    }
    this.getWeatherData();
    this.getMusicasData();
  }
 

  getWeatherData(nome: string = 'Maceió'){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nome}&appid=e70bc26d604f90f1dddb9749ee87159a`) 
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data)})
      .then(data=>{this.getMusicasData(data)})
  

  }


  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like  = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

  }

  setMusicasData(musicas: any){
    this.MusicasData = musicas;
    this.MusicasData.nome1 = this.MusicasData.tracks.hits[0].track.title;
    this.MusicasData.nome2 = this.MusicasData.tracks.hits[1].track.title;
    this.MusicasData.nome3 = this.MusicasData.tracks.hits[2].track.title;
    this.MusicasData.nome4 = this.MusicasData.tracks.hits[3].track.title;
    this.MusicasData.nome5 = this.MusicasData.tracks.hits[4].track.title;

  }

  exibir(){
    let nome: string = (<HTMLInputElement>document.getElementById('envio')).value;
    this.getWeatherData(nome);
  }

  salvar(){
    let mensagem: string = 'Voce atingiu o limite de saves (10)';
    let mensagemSucesso: string = 'Salvo com sucesso!'
    this.arrayMusicas.push(this.MusicasData.nome1);
    this.arrayMusicas.push(this.MusicasData.nome2);
    this.arrayMusicas.push(this.MusicasData.nome3);
    this.arrayMusicas.push(this.MusicasData.nome4);
    this.arrayMusicas.push(this.MusicasData.nome5);
    this.arrayClima.push(this.WeatherData.name);
    this.arrayClima.push(this.genero);
    this.arrayClima.push(this.WeatherData.temp_celcius);
    this.datahora.push(new Date());
    this.arrayTotal.push(this.datahora);
    this.arrayTotal.push(this.arrayMusicas);
    this.arrayTotal.push(this.arrayClima);
    this.juncao.push(this.arrayTotal);
    localStorage[`Contador`] = JSON.stringify(this.contador);
    if(localStorage[`ClimaEMusicas1`] && localStorage[`ClimaEMusicas2`] && localStorage[`ClimaEMusicas3`] && localStorage[`ClimaEMusicas4`] && localStorage[`ClimaEMusicas5`]
    && localStorage[`ClimaEMusicas6`] && localStorage[`ClimaEMusicas7`] && localStorage[`ClimaEMusicas8`] && localStorage[`ClimaEMusicas9`] && localStorage[`ClimaEMusicas10`]){
      alert(mensagem);
      this.arrayCheio = true;
      this.maximoSave = mensagem;
    }
    else{
      console.log('ta vazio')
      this.arrayCheio = false;
    }
    if(this.arrayCheio == false){
 
    if(localStorage[`ClimaEMusicas${this.contador}`] == undefined){
      localStorage[`ClimaEMusicas${this.contador}`] = JSON.stringify(this.arrayTotal);
      
    }
    else{
      for (let index = 1; index < 10; index++){
        if(localStorage[`ClimaEMusicas${this.contador}`] != undefined){
          this.contador = index;

        }
       
      }
      localStorage[`ClimaEMusicas${this.contador}`] = JSON.stringify(this.arrayTotal)
      alert(mensagemSucesso);
      this.sucesso = mensagemSucesso;
    }
    
  }
    JSON.parse(localStorage[`ClimaEMusicas${this.contador}`]);
    this.arrayMusicas = [];
    this.datahora = [];
    this.arrayClima = [];
    this.arrayTotal = [];
    if(this.contador < 10){
    this.contador += 1;
    }
    else{
    this.contador = 1;
    }
  }
  getMusicasData(genero?: any, data?: any){
    if(this.WeatherData.temp_celcius > 32){
      genero = 'rock';
    }
    if(this.WeatherData.temp_celcius > 24 && this.WeatherData.temp_celcius < 32){
      genero = 'pop';
    }
    if(this.WeatherData.temp_celcius > 16 && this.WeatherData.temp_celcius < 24){
      genero = 'classica';
    }
    if(this.WeatherData.temp_celcius < 16){
      genero = 'lofi';
    }
    this.genero = genero;
    fetch(`https://shazam.p.rapidapi.com/search?term=$${genero}&rapidapi-key=ef0252f349mshd5617fca6de1271p13ad9cjsn7346be03cd42`)
    .then(response=>response.json())
    .then(musicas=>{this.setMusicasData(musicas)})


}

getContador(){
  return this.contador;
}
}
