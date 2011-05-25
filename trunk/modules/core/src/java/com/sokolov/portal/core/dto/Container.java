package com.sokolov.portal.core.dto;

import com.sokolov.portal.core.type.RegionState;


public class Container extends AbstractCommonHeader {

    private RegionState state;

    private Long minWidth;

    public RegionState getState() {
        return state;
    }

    public void setState(RegionState state) {
        this.state = state;
    }

    public Long getMinWidth() {
        return minWidth;
    }

    public void setMinWidth(Long minWidth) {
        this.minWidth = minWidth;
    }
}
