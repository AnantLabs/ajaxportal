package com.sokolov.portal.tag;

import com.sokolov.common.tag.AbstractCommonBodyTag;

/**
 * Abstract class for Ajax Portal tags. It declares common properties ad service function(s).
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public abstract class AbstractPortalTag extends AbstractCommonBodyTag {


    /** Holds YES value */
    public final String YES = "yes";

    /** Holds ONE value */
    public final String ONE = "1";

    /** Holds title property */
    private String title = null;

    /** Holds icon property */
    private String icon = null;

    /** Holds state property */
    private String state = null;

    /**
     * Getter of title property.
     *
     * @return title a new value of title property
     */
    public String getTitle() {
        return title;
    }

    /**
     * Setter of title property.
     *
     * @param title a new value of title property
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Getter of icon property.
     *
     * @return  value of icon property
     */
    public String getIcon() {
        return icon;
    }

    /**
     * Setter of icon property.
     *
     * @param icon a new value of icon property
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

    /**
     * Getter of state property.
     *
     * @return  value of state property
     */
    public String getState() {
        return state;
    }

    /**
     * Setter of state property.
     *
     * @param state a new value of state property
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * Convert to boolean.
     *
     * @param value a converted value
     * @return title a new value of title property
     */
    protected boolean convertToBoolean(String value) {

        if (value == null) {
            return false;
        }
        if (Boolean.TRUE.toString().toLowerCase().equals(value.toLowerCase())
            || YES.toLowerCase().equals(value.toLowerCase())
            || ONE.equals(value.toLowerCase())) {
            return true;
        }
        return false;
    }

}
