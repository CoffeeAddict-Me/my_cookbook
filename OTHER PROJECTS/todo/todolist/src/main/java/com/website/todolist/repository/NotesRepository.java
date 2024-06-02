package com.website.todolist.repository;

import com.website.todolist.model.ToDoNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository extends JpaRepository <ToDoNote, Integer> {
}
