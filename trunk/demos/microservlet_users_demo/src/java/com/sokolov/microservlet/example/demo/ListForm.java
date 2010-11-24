package com.sokolov.microservlet.example.demo;

import com.sokolov.microservlet.RequestFormImpl;

import java.util.List;
import java.util.ArrayList;

public class ListForm extends RequestFormImpl {

    private List<DemoUser> users = new ArrayList<DemoUser> ();

    public List<DemoUser> getUsers() {
        return users;
    }

    public void setUsers(List<DemoUser> users) {
        this.users = users;
    }
}
