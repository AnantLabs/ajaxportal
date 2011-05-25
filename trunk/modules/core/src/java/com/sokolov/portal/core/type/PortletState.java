package com.sokolov.portal.core.type;


public enum PortletState {
    NORMAL (javax.portlet.WindowState.NORMAL),
    MINIMIZED (javax.portlet.WindowState.MINIMIZED),
    MAXIMIZED (javax.portlet.WindowState.MAXIMIZED),
    HIDDEN (new javax.portlet.WindowState("HIDDEN"));

    private javax.portlet.WindowState windowState;

    PortletState(javax.portlet.WindowState windowState) {
        this.windowState = windowState;
    }

    javax.portlet.WindowState getJsr286WindowState() {
        return windowState;
    }
}
