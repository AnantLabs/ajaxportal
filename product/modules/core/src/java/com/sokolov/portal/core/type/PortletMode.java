package com.sokolov.portal.core.type;

public enum PortletMode {
    VIEW (javax.portlet.PortletMode.VIEW),
    EDIT (javax.portlet.PortletMode.EDIT),
    HELP (javax.portlet.PortletMode.HELP),
    CUSTOM (null);

    private javax.portlet.PortletMode portletMode;

    PortletMode(javax.portlet.PortletMode portletMode) {
        this.portletMode = portletMode;
    }

    javax.portlet.PortletMode getJsr286PortletMode() {
        return portletMode;
    }
}
