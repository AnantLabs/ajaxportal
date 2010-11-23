package com.sokolov.portal.tag.layout;

import com.sokolov.portal.tag.Container;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import java.io.IOException;

/**
 * Container tag for Ajax portal. It's based on &lt;TD&gt; HTML tag.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class ContainerTableCell extends Container {

    /** Holds colSpan attribute of the table */
    private String colSpan;

    /** Holds rowSpan attribute of the table */
    private String rowSpan;

    /** Holds width attribute of the table */
    private String width;

    /**
     * Getter of colSpan property.
     *
     * @return value of colSpan property
     */
    public String getColSpan() {
        return colSpan;
    }

    /**
     * Setter of colSpan property.
     *
     * @param colSpan a new value of src property
     */
    public void setColSpan(String colSpan) {
        this.colSpan = colSpan;
    }

    /**
     * Getter of rowSpan property.
     *
     * @return value of rowSpan property
     */
    public String getRowSpan() {
        return rowSpan;
    }

    /**
     * Setter of rowSpan property.
     *
     * @param rowSpan a new value of src property
     */
    public void setRowSpan(String rowSpan) {
        this.rowSpan = rowSpan;
    }

    /**
     * Getter of width property.
     *
     * @return value of width property
     */
    public String getWidth() {
        return width;
    }

    /**
     * Setter of width property.
     *
     * @param width a new value of src property
     */
    public void setWidth(String width) {
        this.width = width;
    }

    /**
     * Process component rendering.
     *
     * @return SKIP_BODY
     * @throws javax.servlet.jsp.JspException if error occurs
     */
    public int doAfterBody() throws JspException {
        try {
            BodyContent bodycontent = getBodyContent();
            String body = bodycontent.getString();

            JspWriter out = bodycontent.getEnclosingWriter();

            correctState();

            String classValue = " class='"
                                + getState()
                                + ((convertToBoolean(getDropTarget()))?" dropTarget":"")
                                + ((getStyleClass() != null)?" " + getStyleClass():"")
                                + "'";
            if (body != null) {
                out.print("<td id='" + getId() + "'"
                          + (((getStyle() != null) || (getIcon() != null))? " style='"
                                  + ((getStyle() != null)?getStyle() + " ":"")
                                  //+ ((getIcon() != null)?"background-image:  url(" + getIcon() + ") ":"")
                            + "'":"")
                          //+ (((getStyleClass() != null) || (getMode() != null))? " class='" + ((getMode() != null)?getMode() + " ":"") + ((getStyleClass() != null)?getStyleClass():"") + "'":"")
                          + classValue
                          + ((getTitle() != null)? " title='" + getTitle() + "'":"")

                          // table attributes
                          + ((getColSpan() != null)? " colspan='" + getColSpan() + "'":"")
                          + ((getRowSpan() != null)? " rowspan='" + getRowSpan() + "'":"")
                          + ((getWidth() != null)? " width='" + getWidth() + "'":"")
                          + ">");
                if (getMinWidth() != null) {
                    out.print(getDivWithFixedWidth(getMinWidth()));
                }
                out.print(body);
                out.print("</td>");
            }
        } catch(IOException ioe) {
            throw new JspException("Error:"+ioe.getMessage());
        }
        return SKIP_BODY;
    }
}
