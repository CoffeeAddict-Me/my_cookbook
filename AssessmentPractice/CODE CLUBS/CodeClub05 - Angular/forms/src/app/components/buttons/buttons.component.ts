import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {SmallButtonComponent} from "../small-button/small-button.component";

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [
    NgIf,
    SmallButtonComponent
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  clickCounter: number = 0
  seriously: boolean = false
  youDidIt:boolean = true
  button1Text :string = "Press to increment"
  button2Text:string = "Press to reduce"
  button3Text:string = "Clear"
  button4Text:string = "Random number of clicks"
  button5Text:string = "Do not press"
  constructor() {
}
  button1Clicked (){
    this.clickCounter += 1;
    if(this.clickCounter > 20){
      this.seriously = true}
  }
button2Clicked(){
    this.clickCounter -= 1;
}

  button3Clicked(){
    this.clickCounter = 0;
    this.seriously = false;
}

  button4Clicked(){
    this.clickCounter = Math.floor(Math.random()*1200000)+1;
    if(this.clickCounter > 20){
    this.seriously = true
    }
}
doNot(){
    let message = "You did it! You pressed the button!";
    alert(message)
    this.youDidIt=false;
}

}
