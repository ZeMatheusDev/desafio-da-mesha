import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(MainComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('Deveria ter sido criado', () => {
    expect(component).toBeTruthy();
  });

  it('a cidade deveria ter um input', () => {
    component.nome = 'Maceió'
    expect(component.nome).toEqual('Maceió')
  })

  it('Deve ser enviado algo', () => {
    component.contador = 2;
    expect(component.salvar()).toEqual(undefined)
  })

  it('Deve receber maceió', () => {
    component.data = {
      "coord": {
          "lon": -35.7353,
          "lat": -9.6658
      },
      "weather": [
          {
              "id": 803,
              "main": "Clouds",
              "description": "broken clouds",
              "icon": "04d"
          }
      ],
      "base": "stations",
      "main": {
          "temp": 301.84,
          "feels_like": 305.04,
          "temp_min": 301.84,
          "temp_max": 301.84,
          "pressure": 1011,
          "humidity": 69
      },
      "visibility": 10000,
      "wind": {
          "speed": 7.2,
          "deg": 120
      },
      "clouds": {
          "all": 75
      },
      "dt": 1668274478,
      "sys": {
          "type": 1,
          "id": 8413,
          "country": "BR",
          "sunrise": 1668239469,
          "sunset": 1668284590
      },
      "timezone": -10800,
      "id": 3395981,
      "name": "Maceió",
      "cod": 200,
      "sunset_time": "12/11/2022",
      "isDay": true,
      "temp_celcius": "29",
      "temp_min": "29",
      "temp_max": "29",
      "temp_feels_like": "32"
  }
    expect(component.setWeatherData(component.data)).toEqual(component.data) // chamei a funcao de setar os valores do clima e criei a variavel data em cima ...
    //... chamando os valores que maceió recebe, adicionei um return data na função do ts e retornou certo
  })


});
