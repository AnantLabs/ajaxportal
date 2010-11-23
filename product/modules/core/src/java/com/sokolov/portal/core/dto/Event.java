package com.sokolov.portal.core.dto;

import com.sokolov.portal.core.type.event.EventType;
import com.sokolov.portal.core.type.event.EventWhen;


public class Event {

    private EventType type;

    private EventWhen when;

    private String method;

    public EventType getType() {
        return type;
    }

    public void setType(EventType type) {
        this.type = type;
    }

    public EventWhen getWhen() {
        return when;
    }

    public void setWhen(EventWhen when) {
        this.when = when;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
