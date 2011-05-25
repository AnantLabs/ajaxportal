package com.sokolov.portlet.jsr286;

import javax.portlet.PortletSession;
import javax.portlet.PortletContext;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Vector;

/**
 *
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class PortletSessionImpl implements PortletSession {

    private HttpSession httpSession;

    public PortletSessionImpl(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    public HttpSession getHttpSession() {
        return httpSession;
    }

    public void setHttpSession(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    /////////////////////////////////////////////////////////////////

    protected Map<String,Object> getPortletAttributeMap() {
/*
        Map<String,Object> map = (Map<String,Object>) httpSession.getAttribute("sssssss");  // TODO: check
        if (map == null) {
            map = new HashMap<String,Object>();
            httpSession.setAttribute("sssssss", map);
        }
        return map;
*/
        return new HashMap<String,Object>();
    }


    // PortletSession implementation ////////////////////////////////////////////

    public PortletContext getPortletContext() {
        return null; // TODO: implemet
    }


    public Object getAttribute(String name) {
        if (name == null) {
            throw new IllegalArgumentException("name must not be null");
        }
        return getAttribute(name, PORTLET_SCOPE);
    }

    public Object getAttribute(String name, int scope) {
        return null;
    }

    public Enumeration<String> getAttributeNames() {
        return getAttributeNames(PORTLET_SCOPE);
    }

    public Enumeration<String> getAttributeNames(int scope) {
        if (scope == PORTLET_SCOPE) {
            Vector vector = new Vector(getPortletAttributeMap().keySet());
            return vector.elements();
        } else {
            return httpSession.getAttributeNames();
        }
    }

    public long getCreationTime() {
        return httpSession.getCreationTime();
    }

    public String getId() {
        return httpSession.getId();
    }

    public long getLastAccessedTime() {
        return httpSession.getLastAccessedTime();
    }

    public int getMaxInactiveInterval() {
        return httpSession.getMaxInactiveInterval();
    }

    public void invalidate() {
        httpSession.invalidate();
    }

    public boolean isNew() {
        return httpSession.isNew();
    }

    public void removeAttribute(String name) {
        removeAttribute(name, PORTLET_SCOPE);
    }

    public void removeAttribute(String name, int scope) {
        if (name == null) {
            throw new IllegalArgumentException("name must not be null");
        }
        if (scope == PORTLET_SCOPE) {
            getPortletAttributeMap().remove(name);
        } else {
            httpSession.removeAttribute(name);
        }
    }

    public void setAttribute(String name, Object value) {
        setAttribute(name, value, PORTLET_SCOPE);
    }

    public void setAttribute(String name, Object value, int scope) {
        if (name == null) {
            throw new IllegalArgumentException("name must not be null");
        }
        if (scope == PORTLET_SCOPE) {
            getPortletAttributeMap().put(name, value);
        } else {
            httpSession.setAttribute(name, value);
        }
    }

    public void setMaxInactiveInterval(int scope) {
        httpSession.setMaxInactiveInterval(scope);
    }

    public Map<String,Object> getAttributeMap() {
        return getAttributeMap(PORTLET_SCOPE);
    }

    public Map<String, Object> getAttributeMap(int scope) {
        if (scope == PORTLET_SCOPE) {
            return getPortletAttributeMap();
        } else {
            Map<String, Object> map = new HashMap<String, Object>();
            Enumeration<String> attributeNames = httpSession.getAttributeNames();
            while (attributeNames.hasMoreElements()) {
                String attributeName = attributeNames.nextElement();
                map.put(attributeName, httpSession.getAttribute(attributeName));
            }
            return map;
        }
    }
}
