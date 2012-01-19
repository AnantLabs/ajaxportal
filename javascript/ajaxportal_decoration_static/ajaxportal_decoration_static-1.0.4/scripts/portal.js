///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.4 Beta1 (28 Nov 2011)                             //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is to be used for Portal creation in AJAX Portal. 
 *
 * @author Sergei Sokolov ssokolov@ajaxportal.org
 * @version 1.0.4
 */

/**
 * Portal.
 * @class Portal class is the main object of Ajax Portal which is entry point in Ajax Portal JavaScript API. The Portal class is a part of JavaScript API of Ajax Portal.<br/><br/>
 *
 * <a href="#constructor">Constructor of the Portal class</a>.<br/><br/>
 *
 * <b>Simple activation of Ajax Portal:</b>
 * <pre class="code">
 *     function startPortalEvent() {
 *         com.sokolov.portal.Portal._supportDragAndDrop();
 *         window.portal.refresh();
 *     }
 *     window.portal = new com.sokolov.portal.Portal();
 *     com.sokolov.portal.Portal.startOnLoad(window.portal, startPortalEvent);
 * </pre>
 *
 * <b>Customization support for Ajax Portal:</b>
 * <pre class="code">
 *     function startPortalEvent() {
 *         com.sokolov.portal.Portal._supportDragAndDrop();
 *         window.portal.refresh();
 *
 *         setIFrameSize();
 *         setTitleWidth();
 *
 *         loadCustomization();
 *
 *         window.portal.onWindowResize = function () {
 *             setIFrameSize();
 *             setTitleWidth();
 *         }
 *     }
 *     window.portal = new com.sokolov.portal.Portal();
 *     window.portal.setPortalId(1);
 *     window.portal.setPageId(1);
 *     window.portal.setUserId(1);
 *     window.portal.setCustomizationServiceUrl("servlet.cusomize");
 *     com.sokolov.portal.Portal.startOnLoad(window.portal, startPortalEvent);
 * </pre>
 *
 * @constructor
 * @param {string (optional)} portalId an identificator of the portal.
 * @param {string (optional)} pageId an identificator of the portal page.
 * @param {string (optional)} userId an identificator of the user.
 * @param {string (optional)} customizationServiceUrl an URL of customization servce. 
 * @returns an instance of the portal
 */
com.sokolov.portal.Portal = function(portalId, pageId, userId, customizationServiceUrl) {

    /** Holds portal id */
    this.portalId = portalId;

    /** Holds page id */
    this.pageId = pageId;

    /** Holds user id */
    this.userId = userId;

    /** Holds customization service url */
    this.customizationServiceUrl = customizationServiceUrl;

    /** Holds a array of portlet regions */
    this.portletRegions = [];

    /** Holds a array of portlets outside of portlet regions */
    this.portlets = [];

    /** Holds default portlet region. It is used if the portlet region for the portlet (created by JavaScript) is not defined. */
    this.defaultPortletRegion = null;
};

/**
 * Gets portal id.
 *
 * @returns {number} portal id
 */
com.sokolov.portal.Portal.prototype.getPortalId = function() {
    return this.portalId;
}

/**
 * Sets portal id.
 *
 * @param {number} portalId portal id
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.setPortalId = function(portalId) {
    this.portalId = portalId;
}


/**
 * Gets page id.
 *
 * @returns {number} page id
 */
com.sokolov.portal.Portal.prototype.getPageId = function() {
    return this.pageId;
}

/**
 * Sets page id.
 *
 * @param {number} pageId page id
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.setPageId = function(pageId) {
    this.pageId = pageId;
}

/**
 * Gets user id.
 *
 * @returns {number} user id
 */
com.sokolov.portal.Portal.prototype.getUserId = function() {
    return this.userId;
}

/**
 * Sets user id.
 *
 * @param {number} userId user id
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.setUserId = function(userId) {
    this.userId = userId;
}

/**
 * Gets customization service url.
 *
 * @returns {number} customization service url
 */
com.sokolov.portal.Portal.prototype.getCustomizationServiceUrl = function() {
    return this.customizationServiceUrl;
}

/**
 * Sets customization service url.
 *
 * @param {number} customizationServiceUrl customization service url
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.setCustomizationServiceUrl = function(customizationServiceUrl) {
    this.customizationServiceUrl = customizationServiceUrl;
}


/**
 * Get/Find portlet region by id.
 *
 * @param {string} id an idetificator of the portlet region element
 * @returns {object} an instance of the portlet region
 */
com.sokolov.portal.Portal.prototype.getPortletRegionById = function(id) {
    for (var i = 0; i < this.portletRegions.length; i++) {
        if (this.portletRegions[i].id == id) {
            return this.portletRegions[i];
        }
    }
    return null;
}

/**
 * Get/Find portlet by id.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {object} an instance of the portlet
 */
com.sokolov.portal.Portal.prototype.getPortletById = function(id) {
    for (var i = 0; i < this.portletRegions.length; i++) {
        var portlets = this.portletRegions[i].portlets;
        for (var j = 0; j < portlets.length; j++) {
            if (portlets[j].id == id) {
                return portlets[j];
            }
        }

    }
    return null;
}

/**
 * Getter of portletRegions property.
 *
 * @returns {array} an array with portlet regions
 */
com.sokolov.portal.Portal.prototype.getPortletRegions = function() {
    return this.portletRegions;
}

/**
 * Getter of portlets property.
 *
 * @returns {array} an array with portlets
 */
com.sokolov.portal.Portal.prototype.getPortlets = function() {
    return this.portlets;
}

/**
 * Getter of defaultPortletRegion property.
 *
 * @returns {element or string} default portlet region (a reference to the region element or id of region element)
 */
com.sokolov.portal.Portal.prototype.getDefaultPortletRegion = function() {
    return this.defaultPortletRegion;
}

/**
 * Setter of defaultPortletRegion property.
 *
 * @param {element or string} defaultPortletRegion a new value of defaultPortletRegion property (a reference to the region element or id of region element)
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.setDefaultPortletRegion = function(defaultPortletRegion) {
    this.defaultPortletRegion = defaultPortletRegion;
}
      
/**
 * Find regions in specified element.
 *
 * @param {element} startElement a start element for the search
 * @param {array} result an array with regions
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.findRegions = function(startElement, result) {
    for (var i = 0; i < startElement.childNodes.length; i++){
        if (has(startElement.childNodes[i].className, com.sokolov.portal.Region.CSS_CLASS_NODECORATION)
            || has(startElement.childNodes[i].className, com.sokolov.portal.Region.CSS_CLASS_WINDOW)
            || has(startElement.childNodes[i].className, com.sokolov.portal.Region.CSS_CLASS_STANDARD)
            || has(startElement.childNodes[i].className, com.sokolov.portal.Region.CSS_CLASS_ACCORDION)
            || has(startElement.childNodes[i].className, com.sokolov.portal.Region.CSS_CLASS_TABS)
           ) {
               result[result.length] = startElement.childNodes[i].id;
        }
        this.findRegions(startElement.childNodes[i],result);
    }
}

/**
 * Refresh of the protal.
 *
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.refresh = function() {
    for (var i = 0; i < this.portletRegions.length; i++) {
        var region = this.portletRegions[i];
        region.refresh();
/*
        this.portlets = [];                                                                   // TODO: check it
        com.sokolov.portal.Region.findPortlets($(region.getId()), region.portletIds);
        for (var i = 0; i < region.portletIds.length; i++) {
            var portlet = new com.sokolov.portal.Portlet(region.portletIds[i]);
            this.portlets[this.portlets.length] = portlet;
        }
*/
    }
}

/**
 * Auto scan of the protal for portlets and portlet region initialisation.
 *
 * @returns {void}
 */
com.sokolov.portal.Portal.prototype.autoScan = function() {

/*---------------------------------------------*/
    this.portletRegions = [];
    this.portlets = [];
/*---------------------------------------------*/

    var pc_ids = [];
    this.findRegions(document.body, pc_ids);
    if (pc_ids.length > 0) {
        for (var i = 0; i < pc_ids.length; i++) {

            var region = new com.sokolov.portal.Region(pc_ids[i]);
            region.portletIds = [];

            var co = $(pc_ids[i]);
            com.sokolov.portal.Region.findPortlets(co, region.portletIds);
            region.init();

            var cssClass = co.className;
            if (has(cssClass, com.sokolov.portal.Region.CSS_CLASS_NODECORATION)){
                region.setState(com.sokolov.portal.Region.STATE_NODECORATION);
            } else if(has(cssClass, com.sokolov.portal.Region.CSS_CLASS_WINDOW)){
                region.setState(com.sokolov.portal.Region.STATE_WINDOW);
            } else if(has(cssClass, com.sokolov.portal.Region.CSS_CLASS_STANDARD)){
                region.setState(com.sokolov.portal.Region.STATE_STANDARD);
            } else if(has(cssClass, com.sokolov.portal.Region.CSS_CLASS_ACCORDION)){
                region.setState(com.sokolov.portal.Region.STATE_ACCORDION);
            } else if(has(cssClass, com.sokolov.portal.Region.CSS_CLASS_TABS)){
                region.setState(com.sokolov.portal.Region.STATE_TABS);
            } else {
                //unknown region class
            }

            this.portletRegions[this.portletRegions.length] = region;
        }
    } 

    // inintialized portlets outside of regions
    var portlet_ids = [];
    com.sokolov.portal.Region.findPortlets(document.body, portlet_ids);
    for (var i = 0; i < portlet_ids.length; i++) {
        var portlet = new com.sokolov.portal.Portlet(portlet_ids[i]);
        if (!portlet.isDecorated()) {
            portlet.init();
            this.portlets[this.portlets.length] = portlet;
        }
    }
}

/**
 * Start the portal initialization on the page start.
 *
 * @param {function} eventFunction an event (JavaScript function) which starts after portal initialization.
 * @returns {void}
 */
com.sokolov.portal.Portal.startOnLoad = function(portal, eventFunction) {
    executeOnLoad(window, function() {
        window.portal.autoScan();

        if (eventFunction) {
            try {
                eval("eventFunction()")   // TODO: check
            } catch (e) {
                debug("Portal.startOnLoad: Ivalid even function.");
            }
        }
    });
}


/**
 * Support Drag and Drop machanizm.
 *
 * @returns {void}
 * @private
 */
com.sokolov.portal.Portal._supportDragAndDrop = function() {
    if(window.portal) {
        var portletRegions = window.portal.getPortletRegions();
        for (var i = 0; i < portletRegions.length; i++) {

            // add region as drop target
            var portletCotainerObj = $(portletRegions[i].getId())   
            if (has(portletCotainerObj.className, com.sokolov.portal.Region.CSS_CLASS_DRAG_DROP_TARGET)) {
                addDropTarget(portletCotainerObj);  
            } 

            // make graggable portlets of the region
            var portlets = portletRegions[i].getPortlets();
            for (var j = 0; j < portlets.length; j++) {
               var portletObj = $(portlets[j].getId());
               if (has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET)) {
                   definedAsDraggable(portletObj);
               }  
            }
        }

        // make graggable portlets which are not in any region
        var portlets = window.portal.getPortlets();
        for (var j = 0; j < portlets.length; j++) {
            var portletObj = $(portlets[j].getId());
            if (has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET)) {
                definedAsDraggable(portletObj);
            }
        }
    }
}


