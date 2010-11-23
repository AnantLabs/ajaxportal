package com.sokolov.common.tag;

/**
 * The interface declares src property (src attribute of HTML tag).
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
public interface RemoteSource {

    /**
     * Getter of src property.
     *
     * @return value of src property
     */
    String getSrc();

    /**
     * Setter of src property.
     *
     * @param src a new value of src property
     */
    void setSrc(String src);
}
