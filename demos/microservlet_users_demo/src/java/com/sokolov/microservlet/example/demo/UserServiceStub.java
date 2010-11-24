package com.sokolov.microservlet.example.demo;

import java.util.ArrayList;
import java.util.List;


public class UserServiceStub {

    static {
        users = new ArrayList<DemoUser>();
        counter = 0;
    }

    private static long counter;

    private static List<DemoUser> users;

    public List<DemoUser> getAllUsers() {
        return users;
    }

    public void saveUser(DemoUser user) {
        if (user != null) {
            if (user.getId() == null) {
                user.setId(++counter);
            } else {
                deleteUser(user.getId());
            }
            users.add(user);
        }
    }

    public DemoUser getUser(Long id) {
        if (id != null) {
            for (DemoUser user: users) {
                if (id.equals(user.getId())) {
                    return user;
                }
            }
        }
        return null;
    }

    public void deleteUser(Long id) {
        if (id != null) {
            for (DemoUser user: users) {
                if (id.equals(user.getId())) {
                    users.remove(user);
                    break;
                }
            }
        }
    }
}
