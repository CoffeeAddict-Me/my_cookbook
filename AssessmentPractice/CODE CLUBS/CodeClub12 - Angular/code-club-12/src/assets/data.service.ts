import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  inputData: any;

  constructor() { }

  setData(data: any) {
    this.inputData = data
  }

  getData(): any {
    return this.inputData
  }
}
