import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {  
  //API_HOST   = "http://200.196.251.212"; 
  //API_HOST   = "http://localhost"; 
  API_HOST   = "http://200.196.251.212"; 
  API_NAME = "/AdmRural/";

  //API_HOST = "http://192.168.0.121";
  //API_HOST = "http://192.168.15.50";  
  API_URL = "/Rural/api/Geral";
  APP_NAME = "AdmRural";
    constructor() { }
}
