package com.sokolov.common.tag;

import javax.servlet.jsp.tagext.BodyTagSupport;

/**
 * Declares the following properties for the tag:
 * 1) styleClass - class attribute of HTML tag,
 * 2) style - style attribute of HTML tag.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public abstract class AbstractCommonBodyTag extends BodyTagSupport implements CssSupport {

    /** Holds styleClass property */
    private String styleClass = null;

    /** Holds style property */
    private String style = null;

    /**
     * Getter of styleClass property.
     *
     * @return value of styleClass property
     */
    public String getStyleClass() {
        return styleClass;
    }

    /**
     * Setter of styleClass property.
     *
     * @param styleClass a new value of styleClass property
     */
    public void setStyleClass(String styleClass) {
        this.styleClass = styleClass;
    }

    /**
     * Getter of style property.
     *
     * @return value of style property
     */
    public String getStyle() {
        return style;
    }

    /**
     * Setter of style property.
     *
     * @param style a new value of style property
     */
    public void setStyle(String style) {
        this.style = style;
    }
}

