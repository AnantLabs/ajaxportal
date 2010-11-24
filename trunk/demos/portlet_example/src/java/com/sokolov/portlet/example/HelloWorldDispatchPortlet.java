package com.sokolov.portlet.example;


import com.sokolov.microservlet.annotation.RenderForm;
import com.sokolov.microservlet.annotation.RenderJsp;
import com.sokolov.microservlet.Scope;
import com.sokolov.microservlet.RequestFormUtil;
import com.sokolov.portlet.AbstractDispatchPortletServlet;
import com.sokolov.portlet.RenderMode;
import com.sokolov.portlet.jsr286.RenderRequestImpl;
import com.sokolov.portlet.jsr286.RenderResponseImpl;
import com.sokolov.portal.core.type.PortletMode;

import javax.portlet.PortletException;
import javax.portlet.RenderResponse;
import javax.portlet.RenderRequest;
import java.io.IOException;
import java.io.PrintWriter;


public class HelloWorldDispatchPortlet extends AbstractDispatchPortletServlet {

    protected DemoForm getRequestForm(RenderRequest request) {
        return (DemoForm) RequestFormUtil
                .getRequestForm(((RenderRequestImpl)request)
                        .getHttpServletRequest());
    }

    @RenderMode   // by default mode = PortletMode.VIEW
    @RenderForm (name = "DemoFormExample",
                 clazz = com.sokolov.portlet.example.DemoForm.class,
                 scope = Scope.SESSION)
    @RenderJsp (page = "/page/demo.jsp")
    public void doView(RenderRequest renderRequest,
                       RenderResponse renderResponse)
            throws PortletException, IOException {
        DemoForm form = getRequestForm(renderRequest);
        form.setParam1("Test");
    }

    @RenderMode (mode = PortletMode.EDIT)
    public void doEdit(RenderRequestImpl renderRequest,
                       RenderResponseImpl renderResponse)
            throws PortletException, IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("EDIT mode.");
    }

    @RenderMode (mode = PortletMode.HELP)
    public void doHelp(RenderRequestImpl request,
                       RenderResponseImpl response)
            throws PortletException, IOException {
        PrintWriter out = response.getWriter();
        out.println("HELP mode.");
    }

    @RenderMode (mode = PortletMode.CUSTOM,
                 name = "HalfPage")
    @RenderForm (name = "DemoFormExample",
                 clazz = com.sokolov.portlet.example.DemoForm.class)
    public void doHalfPage(RenderRequestImpl renderRequest,
                           RenderResponseImpl renderResponse)
            throws PortletException, IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("HalfPage mode.");

        DemoForm form = getRequestForm(renderRequest);
        out.println("Param1 = " + form.getParam1());
    }
}
