package com.sokolov.portlet.example;

import com.sokolov.portlet.AbstractPortletServlet;

import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.PortletException;
import java.io.PrintWriter;


public class HelloWorldPortlet extends AbstractPortletServlet {

    public final void doView(RenderRequest renderRequest,
                             RenderResponse renderResponse)
            throws PortletException, java.io.IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("Hello, World");
    }
}
