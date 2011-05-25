package com.sokolov.common.tag;

/**
 * The interface declares the following properties:
 * 1) styleClass - class attribute of HTML tag,
 * 2) style - style attribute of HTML tag.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public interface CssSupport {

    /**
     * Getter of styleClass property.
     *
     * @return value of styleClass property
     */
    public String getStyleClass();

    /**
     * Setter of styleClass property.
     *
     * @param styleClass a new value of styleClass property
     */
    public void setStyleClass(String styleClass);

    /**
     * Getter of style property.
     *
     * @return value of style property
     */
    public String getStyle();

    /**
     * Setter of style property.
     *
     * @param style a new value of style property
     */
    public void setStyle(String style);

}
