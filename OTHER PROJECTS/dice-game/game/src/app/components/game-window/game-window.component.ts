import { Component } from '@angular/core';

@Component({
  selector: 'app-geme-window',
  templateUrl: './game-window.component.html',
  styleUrl: './game-window.component.scss'
})
export class GameWindowComponent {
  currentSpace = 0;
  lastSpace = 20;
  yourRoll = 0;
  rollResult?: number;
  remainingRolls= 5;
  message: string = "Good luck!"

  refresh(){
    window.location.reload()
  }

  dieRolled(){
    this.rollResult = (Math.floor(Math.random()*6)+1)
    this.currentSpace += this.rollResult;
    this.remainingRolls -= 1
    this.yourRoll += 1;

    if(this.currentSpace<this.lastSpace && this.yourRoll===5){
      let placesToGo = this.lastSpace - this.currentSpace;
      this.message = "You are " + placesToGo + " spaces short and you run out of moves. You lost!";
    }
    else if(this.currentSpace<this.lastSpace){
      let placesToGo = this.lastSpace - this.currentSpace;
      this.message = "You are " + placesToGo + " spaces short";
      }

    else if(this.currentSpace===this.lastSpace){
      this.message = "You won!!!";
      }
    else if(this.currentSpace>this.lastSpace){
      let placesOver = this.currentSpace - this.lastSpace;
      this.message = "You are " + placesOver + " spaces over. You lost!";

    }

  }
}

