package com.sokolov.portlet;

import com.sokolov.portlet.jsr286.RenderRequestImpl;
import com.sokolov.portlet.jsr286.RenderResponseImpl;
import com.sokolov.portal.core.type.PortletMode;

import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Portlet implementation for alja JSR 168.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public abstract class AbstractPortletServlet extends HttpServlet {

    /** Hols dispatch parameter name */
    private static final java.lang.String MODE_PARAMETER_NAME = "mode";

    /** Holds flag, is VIEW mode supported */
    private boolean supportViewMode = true;

    /** Holds flag, is EDIT mode supported */
    private boolean supportEditMode = false;

    /** Holds flag, is HELP mode supported */
    private boolean supportHelpMode = false;

    /**
     * Getter of supportViewMode property.
     *
     * @return a value of supportViewMode property
     */
    public boolean getSupportViewMode() {
        return supportViewMode;
    }

    /**
     * Setter of supportEditMode property.
     *
     * @param supportEditMode - a new value of supportEditMode property
     */
    public void setSupportEditMode(boolean supportEditMode) {
        this.supportEditMode = supportEditMode;
    }

    /**
     * Getter of supportEditMode property.
     *
     * @return a value of supportEditMode property
     */
    public boolean getSupportEditMode() {
        return supportEditMode;
    }

    /**
     * Setter of supportHelpMode property.
     *
     * @param supportHelpMode - a new value of supportHelpMode property
     */
    public void setSupportHelpMode(boolean supportHelpMode) {
        this.supportHelpMode = supportHelpMode;
    }

    /**
     * Getter of supportHelpMode property.
     *
     * @return a value of supportHelpMode property
     */
    public boolean getSupportHelpMode() {
        return supportHelpMode;
    }

    /**
     * {@inheritDoc}
     */
    final protected void doGet(HttpServletRequest request,
                               HttpServletResponse response)
            throws ServletException, IOException {
        doDispatch(request, response);
    }

    /**
     * {@inheritDoc}
     */
    final protected void doPost(HttpServletRequest request,
                                HttpServletResponse response)
            throws ServletException, IOException {
        doDispatch(request, response);
    }

    /**
     * Get portlet mode (dispatch parameter).
     *
     * @param request - an HttpServletRequest  object that contains the request the client has made of the servlet
     * @return value of mode parameter
     */
    final private String getMode(HttpServletRequest request) {
        return request.getParameter(MODE_PARAMETER_NAME);
    }

    /**
     * Send message.
     *
     * @param response - an HttpServletResponse  object that contains the response the servlet sends to the client
     * @param body - a body of Http answer
     * @throws IOException - if an input or output error is detected
     */
    protected void send(HttpServletResponse response,
                        String body)
            throws IOException {
        // It's open question how to implement this method
        PrintWriter out = response.getWriter();
        out.println(body);
    }


    /**
     * Dispatch GET or POST request.
     *
     * @param request - an HttpServletRequest  object that contains the request the client has made of the servlet
     * @param response - an HttpServletResponse  object that contains the response the servlet sends to the client
     * @throws javax.servlet.ServletException - if the request for the POST could not be handled
     * @throws java.io.IOException - if an input or output error is detected when the servlet handles the POST request
     */
    final public void doDispatch(HttpServletRequest request,
                                 HttpServletResponse response)
            throws ServletException, IOException {

        RenderRequest renderRequest = new RenderRequestImpl(request);
        RenderResponse renderResponse = new RenderResponseImpl(response);

        String mode = getMode(request);
        if (mode != null) {
            mode = mode.trim().toUpperCase();
        }
        try {
            // TODO: to implement Portlet descriptor retrieving
            if (PortletMode.EDIT.toString().equals(mode)) {
                if (getSupportEditMode()) {
                    doEdit(renderRequest, renderResponse);
                } else {
                    send(response, "EDIT mode is not supported");
                }
            } else if (PortletMode.HELP.toString().equals(mode)) {
                if(getSupportHelpMode()) {
                    doHelp(renderRequest, renderResponse);
                } else {
                    send(response, "HELP mode is not supported");
                }
            } else {
                 doView(renderRequest, renderResponse);
            }
        } catch (PortletException pe) {
            pe.printStackTrace();
        }
    }

    /**
     * Default executed method for VIEW mode.
     *
     * @param renderRequest - an RenderRequest object that contains the request the client has made to the portlet
     * @param renderResponse - an RenderResponse object that contains the response the portlet sends to the client
     * @throws PortletException - if an error occurs
     * @throws IOException - if an input or output error is detected
     */
    protected abstract void doView(RenderRequest renderRequest, RenderResponse renderResponse)
            throws PortletException, IOException;

    /**
     * Executed method for EDIT mode.
     *
     * @param renderRequest - an RenderRequest object that contains the request the client has made to the portlet
     * @param renderResponse - an RenderResponse object that contains the response the portlet sends to the client
     * @throws PortletException - if an error occurs
     * @throws IOException - if an input or output error is detected
     */
    protected void doEdit(RenderRequest renderRequest, RenderResponse renderResponse)
            throws PortletException, IOException {
        // empty implementation if Edit mode is not supported
    }

    /**
     * Default executed method for HELP mode.
     *
     * @param renderRequest - an RenderRequest object that contains the request the client has made to the portlet
     * @param renderResponse - an RenderResponse object that contains the response the portlet sends to the client
     * @throws PortletException - if an error occurs
     * @throws IOException - if an input or output error is detected
     */
    protected void doHelp(RenderRequest renderRequest, RenderResponse renderResponse)
            throws PortletException, IOException {
        // empty implementation if Help mode is not supported
    }
}
