package com.sokolov.portal.tag;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

/**
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class SupportTag extends TagSupport {

    private String theme = null;

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public int doStartTag() throws JspException {
        try {
            pageContext.getOut().print(createLink("container_nodecoration_common.css"));
            pageContext.getOut().print(createLink("container_window_common.css"));
            pageContext.getOut().print(createLink("container_standard_common.css"));
            pageContext.getOut().print(createLink("container_accordion_common.css"));
            pageContext.getOut().print(createLink("container_tabs_common.css"));

            pageContext.getOut().print(createLink("container_window_" + getTheme() + ".css", "portletWindow"));
            pageContext.getOut().print(createLink("container_standard_" + getTheme() + ".css", "portletStandard"));
            pageContext.getOut().print(createLink("container_accordion_" + getTheme() + ".css", "portletAccordion"));
            pageContext.getOut().print(createLink("container_tabs_" + getTheme() + ".css", "portletMenu"));

            pageContext.getOut().print(createScript("ajax.js"));
            pageContext.getOut().print(createScript("common.js"));
            pageContext.getOut().print(createScript("portlet.js"));
            pageContext.getOut().print(createScript("container.js"));
            pageContext.getOut().print(createScript("portal.js"));

            pageContext.getOut().print(createScript("drag.js"));

        } catch (Exception e) {
            throw new JspTagException("SupportTag.doStartTag(): " + e.getMessage());
        }
        return SKIP_BODY;
    }
    
    public int doEndTag() {
        return EVAL_PAGE;
    }

    private String createLink(String file) {
        return "<link type='text/css' rel='stylesheet' href='" + getStylePath() + file + "'>\n";
    }

    private String createLink(String file, String id) {
        return "<link id='" + id + "' type='text/css' rel='stylesheet' href='" + getStylePath() + file + "'>\n";
    }

    private String createScript(String file) {
        return "<script type='text/javascript' language='javascript' src='" + getScriptPath() + file + "'></script>\n";
    }

    private String getScriptPath() {
        return "portal/scripts/";
    }

    private String getStylePath() {
        return "portal/styles/";
    }

}
