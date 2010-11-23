package com.sokolov.portal.core.dto;

public abstract class AbstractCommonHeader extends AbstractCommon {

    private String title;

    private String icoUrl;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcoUrl() {
        return icoUrl;
    }

    public void setIcoUrl(String icoUrl) {
        this.icoUrl = icoUrl;
    }
}
