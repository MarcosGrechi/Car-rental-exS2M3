import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  httpClient = inject(HttpClient);
  pathUrl = "https://66ecc0cd2b6cf2b89c5f33f6.mockapi.io/api/v1/cars"

  constructor() { }

  list(){

    return this.httpClient.get(`${this.pathUrl}/carro`);
  }


  detail(id: number){
    return this.httpClient.get(`${this.pathUrl}/carro/${id}`);
  }

}
