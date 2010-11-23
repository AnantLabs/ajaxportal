package com.sokolov.portal.tag;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import java.io.IOException;
import java.util.HashMap;

/**
 * Portlet object for Ajax portal.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public class Portlet extends AbstractPortalTag {

    /** Holds CSS class for Normal state */
    public final static String NORMAL = "portlet";

    /** Holds CSS class for Minimazed (Not active) state */
    public final static String PORTLET_NOT_ACTIVE = "portletNotActive";

    /** Holds CSS class for Maximazed state */
    public final static String MAXIMAZED = "portletMaximazed";  // TODO: implement

    /** Holds CSS class for Hide state */
    public final static String HIDDEN = "portletHidden";

    /** Holds titleEditable property */
    private String titleEditable = null;

    /** Holds draggable property */
    private String draggable = null;

    /** Holds url property */
    private String url = null;

    /** Holds help url property */
    private String helpUrl = null;

    /** Holds height property */
    private String height = null;
    
    /**
     * Correct state of the container.
     */
    protected void correctState() {
        if ((getState() == null) || ("".equals(getState()))) {
            setState(NORMAL);
        } else if (!(PORTLET_NOT_ACTIVE.equals(getState().trim())
                      || MAXIMAZED.equals(getState().trim())
                      || HIDDEN.equals(getState().trim())
                  )) {
            setState(NORMAL);
        }

        HashMap a;
    }

    /**
     * Process component rendering.
     *
     * @return SKIP_BODY
     * @throws JspException if error occurs
     */
    public int doAfterBody() throws JspException {
        try {
            BodyContent bodycontent = getBodyContent();
            String body = bodycontent.getString();

            JspWriter out = bodycontent.getEnclosingWriter();

            correctState();

            String classAttribute = " class='"
                                    + getState()
                                    + ((convertToBoolean(getDraggable()))?" draggable":"")
                                    + ((convertToBoolean(getTitleEditable()))?" titleEditable":"")
                                    + ((getStyleClass() != null)?" "+getStyleClass():"")
                                    + "'";

            //if (body != null) {
                out.print("<div id='" + getId() + "'"
                          //+ ((getStyle() != null)? " style='" + getStyle() + "'":"")
                          + (((getStyle() != null) || (getIcon() != null) || (getHeight() != null))? " style='"
                                + ((getStyle() != null)?" " + getStyle():"")
                                //+ ((getHeight() != null)?" height:" + getHeight() + "; overflow: auto; ":"") //TODO: fix issue
                             + "'":"")

                          //+ "class='portlet" + ((getStyleClass() != null)?" "+getStyleClass():"") + "'"
                          + classAttribute
                          + ((getTitle() != null)? " title='" + getTitle() + "'":"")
                          + ((getUrl() != null)? " url='" + getUrl() + "'":"")
                          + ((getHelpUrl() != null)? " help='" + getHelpUrl() + "'":"")
                          + ((getIcon() != null)?" icon='" + getIcon() + "'":"")                        
                          + ">");
                out.print(body);
                out.print("</div>");
            //}
        } catch(IOException ioe) {
            throw new JspException("Error:"+ioe.getMessage());
        }
        return SKIP_BODY;
    }

    /**
     * Getter of height property.
     *
     * @return a value of height property
     */
    public String getHeight() {
        return height;
    }

    /**
     * Setter of height property.
     *
     * @param height a new value of height property
     */
    public void setHeight(String height) {
        this.height = height;
    }

    /**
     * Getter of titleEditable property.
     *
     * @return a value of titleEditable property
     */
    public String getTitleEditable() {
        return titleEditable;
    }

    /**
     * Setter of titleEditable property.
     *
     * @param titleEditable a new value of titleEditable property
     */
    public void setTitleEditable(String titleEditable) {
        this.titleEditable = titleEditable;
    }

    /**
     * Getter of draggable property.
     *
     * @return a new value of draggable property
     */
    public String getDraggable() {
        return draggable;
    }

    /**
     * Setter of draggable property.
     *
     * @param draggable a new value of draggable property
     */
    public void setDraggable(String draggable) {
        this.draggable = draggable;
    }

    /**
     * Getter of url property.
     *
     * @return a value of url property
     */
    public String getUrl() {
        return url;
    }

    /**
     * Setter of url property.
     *
     * @param url a new value of url property
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Getter of help url property.
     *
     * @return a value of help url property
     */
    public String getHelpUrl() {
        return helpUrl;
    }

    /**
     * Setter of help url property.
     *
     * @param helpUrl a new value of help url property
     */
    public void setHelpUrl(String helpUrl) {
        this.helpUrl = helpUrl;
    }
}
