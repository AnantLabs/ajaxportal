package com.sokolov.portlet.example;

import com.sokolov.microservlet.RequestFormImpl;

public class DemoForm extends RequestFormImpl {

    private String param1;

    public String getParam1() {
        return param1;
    }

    public void setParam1(String param1) {
        this.param1 = param1;
    }
}
