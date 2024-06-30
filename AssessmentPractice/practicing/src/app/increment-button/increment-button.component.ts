import { Component } from '@angular/core';

@Component({
  selector: 'app-increment-button',
  templateUrl: './increment-button.component.html',
  styleUrl: './increment-button.component.scss'
})
export class IncrementButtonComponent {
counter:number = 0;
increase(){
  this.counter+=1;
}

  decrease(){
  this.counter-=1;
  }

  clear(){
  this.counter = 0
  }

  surprise(){
  this.counter = Math.floor(Math.random()*1000)
  }

}
