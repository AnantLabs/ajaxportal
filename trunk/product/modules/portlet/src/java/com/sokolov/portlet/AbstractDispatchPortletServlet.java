package com.sokolov.portlet;

import com.sokolov.microservlet.AbstractMicroServlet;
import com.sokolov.portal.core.type.PortletMode;
import com.sokolov.portlet.jsr286.RenderRequestImpl;
import com.sokolov.portlet.jsr286.RenderResponseImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.portlet.PortletException;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Method;

/**
 * Portlet implementation for alja JSR 286.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public abstract class AbstractDispatchPortletServlet extends AbstractMicroServlet {

    /** Hols dispatch parameter name */
    private static final java.lang.String MODE_PARAMETER_NAME = "mode";

    /**
     * Get dispach parameter value.
     *
     * @param request - an HttpServletRequest  object that contains the request the client has made of the servlet
     * @return
     */
    @Override
    protected String getDispachParameterValue(HttpServletRequest request) {
        return request.getParameter(MODE_PARAMETER_NAME);
    }

    /**
     * Build set of method parameters.
     *
     * @param request - an HttpServletRequest  object that contains the request the client has made of the servlet
     * @param response - an HttpServletResponse  object that contains the response the servlet sends to the client
     * @return array of parameters
     */
    @Override
    protected Object[] getMethodParameters(HttpServletRequest request,
                                           HttpServletResponse response) {
        Object methodArguments[] = new Object[2];
        methodArguments[0] = new RenderRequestImpl(request);
        methodArguments[1] = new RenderResponseImpl(response);
        return methodArguments;
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
     * @param parameterValue - dispatch parameter value
     * @throws javax.servlet.ServletException - if the request for the POST could not be handled
     * @throws java.io.IOException - if an input or output error is detected when the servlet handles the POST request
     */
    @Override
    public void doDispatch(HttpServletRequest request,
                           HttpServletResponse response,
                           String parameterValue)
            throws ServletException, IOException {
        if ((parameterValue == null) || ("".equals(parameterValue))) {
            // execute default view
            try {
                Method method = this.getClass().getMethod("doView", RenderRequestImpl.class, RenderResponseImpl.class);
                RenderMode renderMode = method.getAnnotation(RenderMode.class);
                if (renderMode != null) {
                    executeMethod(method, request, response);
                } else {
                    send(response, "Default method 'doView' is not implemented.");
                }
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        } else {
            parameterValue.trim();
        }

        // execute dispatch view
        Method[] methods = this.getClass().getMethods();
        for (Method method: methods) {
            RenderMode renderMode = method.getAnnotation(RenderMode.class);
            if (renderMode != null) {
                if (PortletMode.CUSTOM.equals(renderMode.mode())) {
                    if (renderMode.name().equalsIgnoreCase(parameterValue)) {
                        executeMethod(method, request, response);
                    }
                } else {
                    if (renderMode.mode().toString().equalsIgnoreCase(parameterValue)) {
                        executeMethod(method, request, response);
                    }
                }
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    protected void doView(HttpServletRequest request,
                          HttpServletResponse response)
        throws ServletException, IOException {
        // empty implementation
    }

    /**
     * Default executed method for VIEW mode.
     *
     * @param renderRequest - an RenderRequest object that contains the request the client has made to the portlet
     * @param renderResponse - an RenderResponse object that contains the response the portlet sends to the client
     * @throws PortletException - if an error occurs
     * @throws IOException - if an input or output error is detected
     */
    protected abstract void doView(RenderRequest renderRequest,
                                   RenderResponse renderResponse)
        throws PortletException, IOException;

}
