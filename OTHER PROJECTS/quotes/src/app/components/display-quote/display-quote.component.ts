import { Component } from '@angular/core';
import {QuotesService} from "../../services/services/quotes.service";
import {Quote} from "../../services/models/quote.model";

@Component({
  selector: 'app-display-quote',
  templateUrl: './display-quote.component.html',
  styleUrl: './display-quote.component.scss'
})
export class DisplayQuoteComponent {
  allQuotes: Quote[] = [];
  quoteText: String = '';
  quoteAuthor: String = '';
  randomNum: number = (Math.floor(Math.random()*8));
  constructor(private myRandomQuoteService: QuotesService) {
    this.allQuotes = this.myRandomQuoteService.lotsOfQuotes;

    this.quoteText = this.allQuotes[this.randomNum].text;
    this.quoteAuthor = this.allQuotes[this.randomNum].author;
  }
another(){
  window.location.reload()
}
}
