package com.website.todolist.model;

import jakarta.persistence.*;

@Entity
public class ToDoNote {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private int id;
    @Column(nullable = false)
    private String note;

    public ToDoNote(){}

    public ToDoNote(String note){
        this.note = note;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
