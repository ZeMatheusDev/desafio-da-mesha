import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'

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
  @Input() envio!: string;
  @Input() nome!: string;
  
  constructor() { }

  ngOnInit(): void {
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

  fazer(envio: any){
    console.log(this.envio);
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

  mostrar(){
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
    fetch(`https://shazam.p.rapidapi.com/search?term=${genero}&rapidapi-key=3bb5855a40msha7fd2198f9b7924p154c01jsn2a8fe0364f60`)
    .then(response=>response.json())
    .then(musicas=>{this.setMusicasData(musicas)})


}
}
