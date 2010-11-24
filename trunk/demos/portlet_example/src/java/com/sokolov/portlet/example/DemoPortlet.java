package com.sokolov.portlet.example;

import com.sokolov.portlet.AbstractPortletServlet;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.PrintWriter;


public class DemoPortlet extends AbstractPortletServlet {

    public DemoPortlet() {
        setSupportEditMode(true);
        setSupportHelpMode(true);
    }

    public final void doView(RenderRequest renderRequest,
                             RenderResponse renderResponse)
            throws PortletException, java.io.IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("VIEW mode.");
    }

    public final void doEdit(RenderRequest renderRequest,
                             RenderResponse renderResponse)
            throws PortletException, java.io.IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("EDIT mode.");
    }

    public final void doHelp(RenderRequest renderRequest,
                             RenderResponse renderResponse)
            throws PortletException, java.io.IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("HELP mode.");
    }

}
