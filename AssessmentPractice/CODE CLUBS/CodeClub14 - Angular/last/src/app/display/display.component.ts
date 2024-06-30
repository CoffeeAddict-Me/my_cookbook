import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: 'display.component.html',
  styleUrl: 'display.component.scss'
})
export class DisplayComponent {
  slideIndex: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.showDivs(this.slideIndex);
  }

  plusDivs(n: number): void {
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n: number): void {
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[this.slideIndex - 1].style.display = 'block';
  }

}
