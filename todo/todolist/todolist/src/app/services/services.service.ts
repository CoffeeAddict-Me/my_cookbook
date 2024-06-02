import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ToDoNote } from "../models/todo-note.model";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:8080/note'; // Adjust if your API is hosted elsewhere

  constructor(private http: HttpClient) { }

  getAllNotes(): Observable<ToDoNote[]> {
    return this.http.get<ToDoNote[]>(`${this.apiUrl}/all`);
  }

  addNote(note: ToDoNote): Observable<ToDoNote> {
    return this.http.post<ToDoNote>(`${this.apiUrl}/add`, note);
  }

  updateNote(id: number, note: ToDoNote): Observable<ToDoNote> {
    return this.http.put<ToDoNote>(`${this.apiUrl}/update${id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
