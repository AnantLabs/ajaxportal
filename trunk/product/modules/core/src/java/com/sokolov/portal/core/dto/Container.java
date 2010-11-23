package com.sokolov.portal.core.dto;

import com.sokolov.portal.core.type.ContainerState;


public class Container extends AbstractCommonHeader {

    private ContainerState state;

    private Long minWidth;

    public ContainerState getState() {
        return state;
    }

    public void setState(ContainerState state) {
        this.state = state;
    }

    public Long getMinWidth() {
        return minWidth;
    }

    public void setMinWidth(Long minWidth) {
        this.minWidth = minWidth;
    }
}
