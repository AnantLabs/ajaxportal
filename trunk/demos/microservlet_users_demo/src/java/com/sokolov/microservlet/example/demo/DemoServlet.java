package com.sokolov.microservlet.example.demo;

import com.sokolov.microservlet.AbstractMicroServlet;
import com.sokolov.microservlet.annotation.RenderForm;
import com.sokolov.microservlet.annotation.RenderJsp;
import com.sokolov.microservlet.annotation.DispatchMethod;
import com.sokolov.microservlet.RequestFormUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class DemoServlet extends AbstractMicroServlet {

    protected DemoForm getRequestForm(HttpServletRequest request) {
        return (DemoForm) RequestFormUtil.getRequestForm(request);
    }

    @DispatchMethod
    @RenderForm (name = "DemoForm",
                 clazz = com.sokolov.microservlet.example.demo.DemoForm.class)
    @RenderJsp (page = "/page/add.jsp")
    public void doView(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {
        // no code (shows add form only)
    }

    @DispatchMethod (value = "list")
    @RenderForm (name = "DemoForm",
                 clazz = com.sokolov.microservlet.example.demo.DemoForm.class)
    @RenderJsp (page = "/page/list.jsp")
    public void doList(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {

        DemoForm form = getRequestForm(request);
        UserServiceStub service = new UserServiceStub();

        // get and update list of the users
        form.setUsers(service.getAllUsers());
    }

    @DispatchMethod (value = "save")
    @RenderForm (name = "DemoForm",
                 clazz = com.sokolov.microservlet.example.demo.DemoForm.class)
    @RenderJsp (page = "/page/list.jsp")
    public void doSave(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {

        DemoForm form = getRequestForm(request);
        UserServiceStub service = new UserServiceStub();

        // move data in DTO
        DemoUser user = new DemoUser();
        user.setId(form.getId());
        user.setName(form.getName());
        user.setPosition(form.getPosition());

        // add user
        service.saveUser(user);
        //service.addUser((DemoUser)form);

        // get and update list of the users
        form.setUsers(service.getAllUsers());
    }

    @DispatchMethod (value = "edit")
    @RenderForm (name = "DemoForm",
                 clazz = com.sokolov.microservlet.example.demo.DemoForm.class)
    @RenderJsp (page = "/page/add.jsp")
    public void doEdit(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {

        DemoForm form = getRequestForm(request);
        UserServiceStub service = new UserServiceStub();

        // get user
        DemoUser user = service.getUser(form.getId());
        // set form values
        form.setId(user.getId());
        form.setName(user.getName());
        form.setPosition(user.getPosition());
    }

    @DispatchMethod (value = "delete")
    @RenderForm (name = "DemoForm",
                 clazz = com.sokolov.microservlet.example.demo.DemoForm.class)
    @RenderJsp (page = "/page/list.jsp")
    public void doDelete(HttpServletRequest request,
                       HttpServletResponse response)
            throws ServletException, IOException {

        DemoForm form = getRequestForm(request);
        UserServiceStub service = new UserServiceStub();

        // delete user
        service.deleteUser(form.getId());

        // get and update list of the users
        form.setUsers(service.getAllUsers());
    }
}
