import {Component, OnInit} from '@angular/core';
import {ToDoNote} from "../../models/todo-note.model";
import {ServicesService} from "../../services/services.service";
import {HttpErrorResponse, } from "@angular/common/http";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  allNotes: ToDoNote[] = [];
  newNote: string = '';

  noteToAdd: ToDoNote = {
    id: 0,
    note: ""
  }

  constructor(private todoService: ServicesService) {
  }

  ngOnInit() {
    this.getAllNotes();
  }

addNotes(){

    this.todoService.addNote(this.noteToAdd).subscribe({
      next: (response: ToDoNote) => {
        console.log(response)
        this.getAllNotes()
      }, error: (error: HttpErrorResponse): void => {
  alert(error.message);},
    })
  this.noteToAdd.note = "";
}



  getAllNotes(){
    this.todoService.getAllNotes().subscribe({
      next:(response: ToDoNote[]): void => {
        this.allNotes = response;
        console.log(response);
      },  error: (error: HttpErrorResponse): void => {
        alert(error.message);},
    })

    }


    updateNote(id: number, note: ToDoNote){
    this.todoService.updateNote(id, note).subscribe({
      next: (response: ToDoNote) => {
        this.getAllNotes();
        console.log(response)
      }
    })

    }

    deleteNote(id: number): void {
    this.todoService.deleteNote(id).subscribe({
      next: (response: void) : void => {
        console.log(response);
        this.getAllNotes()
      }, error: (error: HttpErrorResponse): void => {
        alert(error.message);},

    })
    }


}
