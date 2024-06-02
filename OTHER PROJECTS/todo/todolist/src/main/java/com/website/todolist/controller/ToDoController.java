package com.website.todolist.controller;


import com.website.todolist.model.ToDoNote;
import com.website.todolist.services.ToDoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
public class ToDoController {

   private final ToDoService notesService;

   public ToDoController (ToDoService notesService){
       this.notesService = notesService;
   }

    @GetMapping("/all")
    public ResponseEntity<List<ToDoNote>> getAllNotes(){
        List<ToDoNote> allNotes = notesService.findAllNotes();
        return new ResponseEntity<>(allNotes, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ToDoNote> getNoteById (@PathVariable("id") Integer id){
        ToDoNote note = notesService.findNoteById(id);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<ToDoNote> addNote(@RequestBody ToDoNote note){
        ToDoNote newNote = notesService.addNote(note);
        return new ResponseEntity<>(newNote, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ToDoNote> updateNote(@RequestBody ToDoNote note){
        ToDoNote updatedRecipe = notesService.updateNote(note);
        return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable("id") Integer id){
        notesService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
