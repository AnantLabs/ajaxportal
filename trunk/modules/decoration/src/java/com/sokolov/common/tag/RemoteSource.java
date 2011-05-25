package com.sokolov.common.tag;

/**
 * The interface declares src property (src attribute of HTML tag).
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public interface RemoteSource {

    /**
     * Getter of url property.
     *
     * @return a value of url property
     */
    public String getUrl();

    /**
     * Setter of url property.
     *
     * @param url a new value of url property
     */
    public void setUrl(String url);
}
