package com.sokolov.microservlet.example;

import com.sokolov.microservlet.AbstractMicroServlet;
import com.sokolov.microservlet.RequestFormUtil;
import com.sokolov.microservlet.Scope;
import com.sokolov.microservlet.annotation.RenderJsp;
import com.sokolov.microservlet.annotation.DispatchMethod;
import com.sokolov.microservlet.annotation.RenderForm;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MicroServletExample extends AbstractMicroServlet {

    protected DemoFormExample getRequestForm(HttpServletRequest request) {
        return (DemoFormExample) RequestFormUtil.getRequestForm(request);
    }

    @DispatchMethod
    @RenderForm (name = "DemoFormExample",
                 clazz = com.sokolov.microservlet.example.DemoFormExample.class,
                 scope = Scope.SESSION) // Scope.REQUEST by default
    @RenderJsp (page = "/page/demo.jsp")
    public void doView(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {
        DemoFormExample formExample = getRequestForm(request);
        formExample.setParam1("Test");
    }

    @DispatchMethod
    public void doEdit(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.println("EDIT: Hello, World");
    }

    @DispatchMethod (value = "help")
    public void myHelp(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();        
        out.println("HELP: Hello, World");
    }

    @DispatchMethod (value = "super")
    @RenderForm (name = "DemoFormExample",
                 //scope = Scope.SESSION, // Scope.REQUEST by default
                 clazz = com.sokolov.microservlet.example.DemoFormExample.class)
    public void mySuperPage(HttpServletRequest request,
                            HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.println("HELP: Hello, World");

        DemoFormExample formExample = getRequestForm(request);
        out.println("param1 = " + formExample.getParam1());
    }
}
