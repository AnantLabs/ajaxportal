package com.sokolov.portlet.jsr286;

import com.sokolov.portlet.HttpResponseWrapper;

import javax.servlet.http.HttpServletResponse;
import javax.portlet.RenderResponse;

/**
 * Render Response for Ajax Portlet implementation.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class RenderResponseImpl extends HttpResponseWrapper implements RenderResponse {

    /**
     * Contructor of the wrapper.
     *
     * @param httpServletResponse - wrapped object
     */
    public RenderResponseImpl(HttpServletResponse httpServletResponse) {
        super(httpServletResponse);
    }

    // required methods /////////////////////////////////////////////////////////////

    public java.lang.String getContentType() {
        return getHttpServletResponse().getContentType();
    }

    public void setContentType(String contentType) {
        getHttpServletResponse().setContentType(contentType);
    }

    // RenderRequest implementation //////////////////////////////////////////////// 

    public void setTitle(String s) {
        // TODO: implement
    }

    public void setNextPossiblePortletModes(java.util.Collection<javax.portlet.PortletMode> portletModes) {
        // TODO: implement
    }

    public String getCharacterEncoding() {
        return getHttpServletResponse().getCharacterEncoding();
    }

    public java.util.Locale getLocale() {
        return getHttpServletResponse().getLocale();
    }

    public void setBufferSize(int size) {
        getHttpServletResponse().setBufferSize(size);
    }

    public int getBufferSize() {
        return getHttpServletResponse().getBufferSize();
    }

    public void flushBuffer() throws java.io.IOException {
        getHttpServletResponse().flushBuffer();
    }

    public void resetBuffer() {
        getHttpServletResponse().resetBuffer();
    }

    public boolean isCommitted() {
        return getHttpServletResponse().isCommitted();
    }

    public void reset() {
        getHttpServletResponse().reset();
    }

    public java.io.OutputStream getPortletOutputStream() throws java.io.IOException {
        return getHttpServletResponse().getOutputStream(); // TODO: check
    }

    public javax.portlet.PortletURL createRenderURL() {
        return null; // TODO: check
    }

    public javax.portlet.PortletURL createActionURL() {
        return null; // TODO: check
    }

    public javax.portlet.ResourceURL createResourceURL() {
        return null; // TODO: check
    }

    public javax.portlet.CacheControl getCacheControl() {
        return null; // TODO: implement
    }

    ///////////////////////////////////////////////

    public void addProperty(String s, String s1) {
        // TODO: implement
    }

    public void setProperty(String s, String s1) {
        // TODO: implement
    }

    public String encodeURL(String url) {
        return getHttpServletResponse().encodeURL(url);
    }

    public String getNamespace() {
        return null; // TODO: implement
    }

    public void addProperty(javax.servlet.http.Cookie cookie) {
        // TODO: implement
    }

    public void addProperty(String s, org.w3c.dom.Element element) {
        // TODO: implement
    }

    public org.w3c.dom.Element createElement(String s) throws org.w3c.dom.DOMException {
        return null;  // TODO: implement
    }
}
