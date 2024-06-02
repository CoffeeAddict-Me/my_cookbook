import { Injectable } from '@angular/core';
import {Quote} from "../models/quote.model";

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  lotsOfQuotes: Quote[] = [
    {
      text: "I'm sick of following my dreams, man. I'm just going to ask where they're going and hook up with ’em later.",
      author: "Rose (Betty White), The Golden Girls"
    },

    {
      text: "Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes.",
      author: "Jack Handey"
    },

    {
      text: "Clothes make the man. Naked people have little or no influence in society.",
      author: "Mark Twain"
    },

    {
      text: "Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.",
      author: "Will Ferrell"
    },

    {
      text: "Ned, I would love to stand here and talk with you—but I’m not going to.",
      author: "Phil Connors (Bill Murray), Groundhog Day"
    },

    {
      text: "When your mother asks, ‘Do you want a piece of advice?’ it is a mere formality. It doesn’t matter if you answer yes or no. You’re going to get it anyway.",
      author: "Erma Bombeck"
    },

    {
      text: "I want my children to have all the things I couldn't afford. Then I want to move in with them.",
      author: "Phyllis Diller"
    },

    {
      text: "Never follow anyone else’s path. Unless you’re in the woods and you’re lost and you see a path. Then by all means follow that path.",
      author: "Ellen DeGeneres"
    }



  ]

  constructor() { }
}
