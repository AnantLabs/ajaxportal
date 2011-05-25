package com.sokolov.portlet;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.io.PrintWriter;

/**
 * Wrapper for HttpResponse class.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class HttpResponseWrapper {

    HttpServletResponse httpServletResponse;

    public HttpResponseWrapper(HttpServletResponse httpServletResponse) {
        this.httpServletResponse = httpServletResponse;
    }

    public HttpServletResponse getHttpServletResponse() {
        return httpServletResponse;
    }

    public void setHttpServletResponse(HttpServletResponse httpServletResponse) {
        this.httpServletResponse = httpServletResponse;
    }

    // required methods /////////////////////////////////////////////////////////////

    public PrintWriter getWriter()
            throws java.io.IOException {
        return httpServletResponse.getWriter();
    }

    /*-- HttpServletResponse methods ----------------------------------------------------*/

    void addCookie(Cookie cookie) {
        httpServletResponse.addCookie(cookie);
    }

    boolean containsHeader(String header) {
        return httpServletResponse.containsHeader(header);
    }

    String encodeURL(String url) {
        return httpServletResponse.encodeURL(url);
    }

    String encodeRedirectURL(String url) {
        return httpServletResponse.encodeRedirectURL(url);
    }

    @Deprecated
    String encodeUrl(String url) {
        return httpServletResponse.encodeURL(url); // TODO: refactor
    }

    @Deprecated
    String encodeRedirectUrl(String url) {
        return httpServletResponse.encodeRedirectURL(url); // TODO: refactor
    }

    void sendError(int errorCode, String message) throws java.io.IOException {
        httpServletResponse.sendError(errorCode, message);
    }

    void sendError(int errorCode) throws java.io.IOException {
        httpServletResponse.sendError(errorCode);
    }

    void sendRedirect(String header) throws java.io.IOException {
        httpServletResponse.sendRedirect(header);
    }

    void setDateHeader(String header, long value) {
        httpServletResponse.setDateHeader(header, value);
    }

    void addDateHeader(String header, long value) {
        httpServletResponse.addDateHeader(header, value);
    }

    void setHeader(String header, String value) {
        httpServletResponse.setHeader(header, value);
    }

    void addHeader(String header, String value) {
        httpServletResponse.addHeader(header, value);
    }

    void setIntHeader(String header, int value) {
        httpServletResponse.setIntHeader(header, value);
    }

    void addIntHeader(String header, int value) {
        httpServletResponse.addIntHeader(header, value);
    }

    void setStatus(int status) {
        httpServletResponse.setStatus(status);
    }

    @Deprecated
    void setStatus(int i, String s) {                  // TODO: refactor
        httpServletResponse.setStatus(i, s);
    }



}
