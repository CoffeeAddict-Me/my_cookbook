import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent {

  message: string = '';
  score: number = 0

  right(){
    this.score +=1
    return this.score
  }

  nahh(){
    return this.score
  }

  submitButton() {
    switch (this.score){
      case 1:
      case 2:
      case 3:
      case 4:
        this.message = "You scored " + this.score + ", too bad";
        break;
      case 5:
      case 6:
      case 7:
        this.message = "You scored " + this.score + ", good effort!";
        break;
      case 8:
      case 9:
        this.message = "You scored " + this.score + ", you are so smart! ";
        break;
      case 10:
        this.message = "You scored " + this.score + "! You are a Genius! Congratulations!";
        break;
  }
    }
}
