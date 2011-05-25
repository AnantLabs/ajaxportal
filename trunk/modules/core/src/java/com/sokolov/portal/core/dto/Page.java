package com.sokolov.portal.core.dto;

import java.util.List;
import java.util.ArrayList;


public class Page extends AbstractCommonHeader {

    private List<Container> containers = new ArrayList<Container>();

    public List<Container> getContainers() {
        return containers;
    }

    public void setContainers(List<Container> containers) {
        this.containers = containers;
    }
}
