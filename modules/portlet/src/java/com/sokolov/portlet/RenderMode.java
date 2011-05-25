package com.sokolov.portlet;

import com.sokolov.portal.core.type.PortletMode;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * The anootation mars render method of Ajax Portlet.
 *
 * @author Sergei Sokolov
 * @version 1.0
 */
@Retention (value = RetentionPolicy.RUNTIME)
public @interface RenderMode {
    
    /** Hold render mode of portlet (VIEW by default) */
    PortletMode mode() default PortletMode.VIEW;

    /** Hold custom mode name of portlet */
    String name() default "";
}
