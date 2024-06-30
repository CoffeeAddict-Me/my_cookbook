import {Component, OnInit} from '@angular/core';
import {DataService} from "../../assets/data.service";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit{

  inputData: any;
  fullName!: string;
  age: number | undefined;
  suffix: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    if(this.dataService.getData()) {
      this.inputData = this.dataService.getData();
    } else {
      this.inputData = {firstName: 'hello', lastName: 'there', dob: '2023-01-01', favColour: 'green', favHobby: 'gaming'}
    }
    this.fullName = this.inputData.firstName + ' ' + this.inputData.lastName;
    this.age = this.calculateAge(this.inputData.dob);
    this.getDateSuffix(this.inputData.dob);
    this.setColor();

  }

  calculateAge(dob: Date): number {
    const dobDate = new Date(dob)

    let timeDiff = Math.abs(Date.now() - dobDate.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  }

  getDateSuffix(date: any): void {
    const dob: Date = new Date(date);
    const day: number = dob.getDate();

    if (day === 1 || day === 21 || day === 31) {
      this.suffix = 'st'
    } else if (day === 2 || day === 22) {
      this.suffix = 'nd'
    } else if (day === 3 || day === 23) {
      this.suffix = 'rd'
    } else {
      this.suffix = 'th'
    }
  }

  private setColor() {
    const pageWrapper = document.getElementById("content-wrapper");

    pageWrapper!.style.backgroundColor=this.inputData.favColour
  }
}
