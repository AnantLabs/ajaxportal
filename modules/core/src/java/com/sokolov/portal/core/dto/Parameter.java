package com.sokolov.portal.core.dto;

import com.sokolov.portal.core.type.ParameterType;

public class Parameter {

    private String name;

    private String value;

    private ParameterType type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public ParameterType getType() {
        return type;
    }

    public void setType(ParameterType type) {
        this.type = type;
    }
}
