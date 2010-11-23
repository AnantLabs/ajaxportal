package com.sokolov.portlet.jsr286;

import com.sokolov.portlet.HttpRequestWrapper;

import javax.servlet.http.HttpServletRequest;
import javax.portlet.RenderRequest;

/**
 * Render Request for Ajax Portlet implementation.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class RenderRequestImpl extends HttpRequestWrapper implements RenderRequest {

    /**
     * Contructor of the wrapper.
     *
     * @param httpServletRequest - wrapped object
     */
    public RenderRequestImpl(HttpServletRequest httpServletRequest) {
        super(httpServletRequest);
    }

    // RenderRequest implementation

    private javax.portlet.PortletSession portletSession = null;

    public javax.portlet.PortletSession getPortletSession() {
        if (portletSession == null) {
            portletSession = new PortletSessionImpl(getHttpServletRequest().getSession());
        }
        return portletSession;
    }



    public java.lang.String getETag() {
        return null;
    }


    @Deprecated
    public boolean isWindowStateAllowed(javax.portlet.WindowState windowState) {
        return false;
    }

    @Deprecated
    public boolean isPortletModeAllowed(javax.portlet.PortletMode portletMode) {
        return false;
    }

    @Deprecated
    public javax.portlet.PortletMode getPortletMode() {
        return null;
    }

    @Deprecated
    public javax.portlet.WindowState getWindowState() {
        return null;
    }

    public javax.portlet.PortletPreferences getPreferences() {
        return null;  // TODO: implement
    }

    public javax.portlet.PortletSession getPortletSession(boolean b) {  //??????????
        return null;
    }

    public java.lang.String getProperty(java.lang.String s) {
        return null;
    }

    public java.util.Enumeration<java.lang.String> getProperties(java.lang.String s) {
        return null;
    }

    public java.util.Enumeration<java.lang.String> getPropertyNames() {
        return null;
    }

    public javax.portlet.PortalContext getPortalContext() {
        return null;
    }

    public java.lang.String getContextPath() {
        return null;
    }

    public java.lang.String getRemoteUser() {
        return null;
    }

    public java.security.Principal getUserPrincipal() {
        return null;
    }

    public boolean isUserInRole(java.lang.String s) {
        return false;
    }

    public java.lang.Object getAttribute(java.lang.String s) {
        return null;
    }

    public java.util.Enumeration<java.lang.String> getAttributeNames() {
        return null;
    }

    public java.lang.String getParameter(java.lang.String s) {
        return null;
    }

    public java.util.Enumeration<java.lang.String> getParameterNames() {
        return null;
    }

    public java.lang.String[] getParameterValues(java.lang.String s) {
        return null;
    }

    public java.util.Map<java.lang.String,java.lang.String[]> getParameterMap() {
        return null;
    }

    public boolean isSecure() {
        return false;
    }

    public void setAttribute(java.lang.String s, java.lang.Object o) {

    }

    public void removeAttribute(java.lang.String s) {

    }

    public java.lang.String getRequestedSessionId() {
        return null;
    }

    public boolean isRequestedSessionIdValid() {
        return false;
    }

    public java.lang.String getResponseContentType() {
        return null;
    }

    public java.util.Enumeration<java.lang.String> getResponseContentTypes() {
        return null;
    }

    public java.util.Locale getLocale() {
        return null;
    }

    public java.util.Enumeration<java.util.Locale> getLocales() {
        return null;
    }

    public java.lang.String getScheme() {
        return null;
    }

    public java.lang.String getServerName() {
        return null;
    }

    public int getServerPort() {
        return 0;
    }

    public java.lang.String getWindowID() {
        return null;
    }

    public java.util.Map<java.lang.String,java.lang.String[]> getPrivateParameterMap() {
        return null;
    }

    public java.util.Map<java.lang.String,java.lang.String[]> getPublicParameterMap() {
        return null;
    }

}
