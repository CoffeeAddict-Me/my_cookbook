package com.website.todolist.services;

import com.website.todolist.exception.NoteNotFoundException;
import com.website.todolist.model.ToDoNote;
import com.website.todolist.repository.NotesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ToDoService {

    private final NotesRepository notesRepository;

    @Autowired
    public ToDoService(NotesRepository notesRepository){
        this.notesRepository = notesRepository;
    }

    public ToDoNote addNote(ToDoNote note){
        return notesRepository.save(note);
    }

    public List<ToDoNote> findAllNotes(){
        return notesRepository.findAll();
    }


    public ToDoNote updateNote (ToDoNote note){
        return notesRepository.save(note);
    }

    public ToDoNote findNoteById(Integer id){
        return notesRepository.findById(id).orElseThrow(
                ()-> new NoteNotFoundException("Note by id " + id + " was not found"));
    }

    public void deleteNote(Integer id){
        notesRepository.deleteById(id);
    }
}
