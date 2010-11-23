package com.sokolov.portal.core.dto;

import java.util.List;
import java.util.ArrayList;


public class Portal extends AbstractCommon {

    private String version;

    private List<Service> services = new ArrayList<Service> ();

    private List<Page> pages = new ArrayList<Page> ();

    private List<Parameter> parameters = new ArrayList<Parameter> ();

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public List<Page> getPages() {
        return pages;
    }

    public void setPages(List<Page> pages) {
        this.pages = pages;
    }

    public List<Parameter> getParameters() {
        return parameters;
    }

    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }
}
