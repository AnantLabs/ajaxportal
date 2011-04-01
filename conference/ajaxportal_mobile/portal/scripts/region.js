///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.3 Alpha4 (28 Jan 2011)                            //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is to be used for Portlet Region creation in AJAX Portal. 
 *
 * @author Sergei Sokolov s-sokolov@tut.by
 * @version 1.0.3
 */



/**
 * Region constructor.
 * @class Region wrapper for AJAX portal.<br/>
 *
 * @constructor 
 * @param {string} id an identificator of region element
 * @param {array} ids an array with portlet element identificators which are related to the region
 * @param {string} title a region title in WINDOW state
 * @param {uri-string} iconUri an reference to region element
 * @returns {object} an instance of the portlet wrapper
 */
com.sokolov.portal.Region = function(id, ids, title, iconUri) {
    this.id = id;
    //this.portletIds = ids;
    this.portlets = [];
    this.state = com.sokolov.portal.Region.STATE_STANDARD;
    this.title = (title)?title:"";
    this.iconUri = (iconUri)?iconUri:null;
};

/** Holds NoDecoration state of the region */
com.sokolov.portal.Region.STATE_NODECORATION = 0;

/** Holds Window state of the region */
com.sokolov.portal.Region.STATE_WINDOW = 1;

/** Holds Standard state of the region */
com.sokolov.portal.Region.STATE_STANDARD = 2;

/** Holds Accordion state of the region */
com.sokolov.portal.Region.STATE_ACCORDION = 3;

/** Holds TabPanel state of the region */
com.sokolov.portal.Region.STATE_TABS = 4;



/** Holds CSS class for region with NoDecoration state. */
com.sokolov.portal.Region.CSS_CLASS_NODECORATION = "nodecoration"

/** Holds CSS class for region with Window state. */
com.sokolov.portal.Region.CSS_CLASS_WINDOW = "window";

/** Holds CSS class for region with Standard state. */
com.sokolov.portal.Region.CSS_CLASS_STANDARD = "standard";

/** Holds CSS class for region with Accordion state. */
com.sokolov.portal.Region.CSS_CLASS_ACCORDION = "accordion";

/** Holds CSS class for region with TabPanels state. */
com.sokolov.portal.Region.CSS_CLASS_TABS = "tabs";



/** Holds CSS class for TabPanels navigation panel. */
com.sokolov.portal.Region.CSS_CLASS_TABS_NAVIGATION = "tabNavigation";

/** Holds CSS class for item of TabPanels navigation panel. */
com.sokolov.portal.Region.CSS_CLASS_TABS_ITEM = "tabItem";

/** Holds CSS class for active item of TabPanels navigation panel. */
com.sokolov.portal.Region.CSS_CLASS_TABS_ITEM_ACTIVE = "tabItemActive";



/** Holds identificator for TabPanels navigation panel. */
com.sokolov.portal.Region.ID_TABS = "Tabs";

/** Holds identificator for item of TabPanels navigation panel. */
com.sokolov.portal.Region.ID_TABS_ITEM = "TabItem";

/** Holds identificator for region. */
com.sokolov.portal.Region.ID_REGION = "Region";

/** Holds identificator for region header element. */
com.sokolov.portal.Region.ID_HEADER = "Header"

/** Holds identificator for region title element. */
com.sokolov.portal.Region.ID_TITLE = "Title";

/** Holds identificator for region icon element in the portlet title. */
com.sokolov.portal.Region.ID_ICON = "Icon";


/** Holds Drop target marker. */
com.sokolov.portal.Region.CSS_CLASS_DRAG_DROP_TARGET = "dropTarget";



/**
 * Getter of portlets property.
 *
 * @returns {array} an array with portlets
 */
com.sokolov.portal.Region.prototype.getPortlets = function() {
    return this.portlets;
}

/**
 * Decorates the region.
 *
 * @returns {void}
 * @see #isRegionDecorated()
 */ 
com.sokolov.portal.Region.prototype.decorateRegion = function() {

    if (this.isRegionDecorated()) return;

    var region = $(this.id);
    this.title = region.title;
    region.title = "";

    region.innerHTML = "<div id='" + this.id + com.sokolov.portal.Region.ID_HEADER + "' class='"+ com.sokolov.portal.Region.ID_REGION + com.sokolov.portal.Region.ID_HEADER + "'>"
                          + "<div id='" + this.id + com.sokolov.portal.Region.ID_ICON + "' class='"+ com.sokolov.portal.Region.ID_REGION + com.sokolov.portal.Region.ID_ICON + "' " + ((this.iconUri)?" style='background-image: url(\"" + this.iconUri + "\");'":"") +">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" 

                          + "&nbsp;<span id='" + this.id + com.sokolov.portal.Region.ID_TITLE + "'class='"+ com.sokolov.portal.Region.ID_REGION + com.sokolov.portal.Region.ID_TITLE + "'>" + ((this.title)?this.title.replace(/ /g, "&nbsp;"):"&nbsp;") + "</span>"

                          + "</div>"
                          + "<div id='" + this.getTabsNavigationPanelId() + "' class='" + com.sokolov.portal.Region.CSS_CLASS_TABS_NAVIGATION + "'></div>"
                          + $(this.id).innerHTML;
}

/**
 * Checks the call of #decorateRegion() is required or not. 
 *
 * @returns {boolean} true if the region was decorated
 * @see #decorateRegion()
 */
com.sokolov.portal.Region.prototype.isRegionDecorated = function() {
    if (!$(this.getTitleId())) {
        return false;
    }
/*
    if (!$(this.getIconId())) {
        return false;
    }
    if (!$(this.getTabsNavigationPanelId())) {
        return false;
    }
*/
    return true;
}

/**
 * Initialises portlets of the region.
 *
 * @returns {void}
 */ 
com.sokolov.portal.Region.prototype.initPortlets = function() {

    var region = $(this.id);

    this.portlets = [];

    var portletIds = [];
    com.sokolov.portal.Region.findPortlets(region, portletIds);
    for (var i = 0; i < portletIds.length; i++) {
        var portlet = new com.sokolov.portal.Portlet(portletIds[i], null, this.id);
        portlet.init();


        //portlet.setTitle(portlet.getId());
        //portlet.setIcon("images/icon_search.gif");
        //portlet.setHtmlContent(portlet.getId());

        this.portlets[this.portlets.length] = portlet;
    }
}

/* 
com.sokolov.portal.Region.prototype.refindPortlets = function() {

    var region = $(this.id);

    this.portlets = [];

    var portletIds = [];
    com.sokolov.portal.Region.findPortlets(region, portletIds);
    for (var i = 0; i < portletIds.length; i++) {
        var portlet = new com.sokolov.portal.Portlet(portletIds[i], null, this.id);
        this.portlets[this.portlets.length] = portlet;
    }
}
*/

/**
 * Initialises the region.
 *
 * @returns {void}
 * @see #decorateRegion()
 * @see #initPortlets()
 */ 
com.sokolov.portal.Region.prototype.init = function() {
    this.decorateRegion();
    this.initPortlets();
}

/**
 * Getter for id property.
 *
 * @returns {string} a value of id property
 */
com.sokolov.portal.Region.prototype.getId = function() {
    return this.id;
}

/**
 * Gets identificator of header element.
 *
 * @returns {string} an title identificator
 */
com.sokolov.portal.Region.prototype.getHeaderId = function() {
    return this.id + com.sokolov.portal.Region.ID_HEADER;
}

/**
 * Gets identificator of title element.
 *
 * @returns {string} an title identificator
 */
com.sokolov.portal.Region.prototype.getTitleId = function() {
    return this.id + com.sokolov.portal.Region.ID_TITLE;
}

/**
 * Gets identificator of TabPanels avigation panel element.
 *
 * @returns {string} an title identificator
 */
com.sokolov.portal.Region.prototype.getTabsNavigationPanelId = function() {
    return this.id + com.sokolov.portal.Region.ID_TABS;
}

/**
 * Sets for the portlet title.
 *
 * @param {string} title a new value of the portlet title
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.setTitle = function (title) {
    $(this.getTitleId()).innerHTML = title.replace(/ /g, "&nbsp;");;
}

/**
 * Gets for the region title.
 *
 * @returns {string} the region title
 */
com.sokolov.portal.Region.prototype.getTitle = function () {
    return $(this.getTitleId()).innerHTML.replace(/&nbsp;/g, " ");
}

/**
 * Sets icon of the region.
 *
 * @param {uri-string} iconUri a new icon uri
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.setIcon = function (iconUri) {
    if (iconUri) {
        $(this.getTitleId()).style.backgroundImage = (icon.indexOf("url") == -1)?("url(" + iconUri + ")"):iconUri;
    }
}

/**
 * Gets icon of the portlet.
 *
 * @returns {uri-string} icon uri // TODO: change
 */
com.sokolov.portal.Region.prototype.getIcon = function () {
    return $(this.getTitleId()).style.backgroundImage; // TODO: extract url()
}

/**
 * Refresh of the region.
 *
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.refresh = function() {

    this.initPortlets();
    //this.refindPortlets();

    if (this.state == com.sokolov.portal.Region.STATE_NODECORATION) {
        this.nodecoration();
    } else if (this.state == com.sokolov.portal.Region.STATE_STANDARD) {
        this.standard();
    } else if (this.state == com.sokolov.portal.Region.STATE_ACCORDION) {
        this.accordion();
    } else if (this.state == com.sokolov.portal.Region.STATE_TABS) {
        this.tabs();
    } else if (this.state == com.sokolov.portal.Region.STATE_WINDOW) {
        this.window();
    } else {
        // impossible situation
    }
}

/**
 * Sets a state of the region.
 *
 * @param {com.sokolov.portal.Region.STATE_NODECORATION | com.sokolov.portal.Region.STATE_STANDARD | com.sokolov.portal.Region.STATE_ACCORDION | com.sokolov.portal.Region.STATE_TABS | com.sokolov.portal.Region.STATE_WINDOW} state a new state
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.setState = function(state) {
    this.state = state;
    this.refresh();
}

/**
 * Gets state of the region.
 *
 * @returns {com.sokolov.portal.Region.STATE_NODECORATION | com.sokolov.portal.Region.STATE_STANDARD | com.sokolov.portal.Region.STATE_ACCORDION | com.sokolov.portal.Region.STATE_TABS | com.sokolov.portal.Region.STATE_WINDOW} portlet state
 */
com.sokolov.portal.Region.prototype.getState = function() {
    return this.state;
}

/**
 * Change region CSS class.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {void}
 * @private
 */
com.sokolov.portal.Region._setStateCssClass = function(id, cssClass) {

    var obj = $(id);
    if (obj && obj.className) {
        var str1 = remove(obj.className, com.sokolov.portal.Region.CSS_CLASS_NODECORATION);
        var str2 = remove(str1, com.sokolov.portal.Region.CSS_CLASS_WINDOW);
        var str3 = remove(str2, com.sokolov.portal.Region.CSS_CLASS_STANDARD);
        var str4 = remove(str3, com.sokolov.portal.Region.CSS_CLASS_ACCORDION);
        var str5 = remove(str4, com.sokolov.portal.Region.CSS_CLASS_TABS);
        return obj.className = cssClass + ((str5 !="")?" ":"") + str5;
    }
    return cssClass;
}

/**
 * Sets visibility for portlet content.
 *
 * @param {boolean} visible vissible if it's true and invissible if it's false
 * @param {string} suffix usually suffix for portlet content
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.setVisibility = function(visible, suffix) {
    for (var i = 0; i < this.portlets.length; i++) {
        if (visible) {
            show(this.portlets[i].getId() + suffix); 
        } else {
            hide(this.portlets[i].getId() + suffix); 
        }
    }
}

/**
 * Sets NoDecoration state for the contaier.
 *
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.nodecoration = function() {
    com.sokolov.portal.Region._setStateCssClass(this.id, com.sokolov.portal.Region.CSS_CLASS_NODECORATION);

    for (var i = 0; i < this.portlets.length; i++) {
        if (!has($(this.portlets[i].getId()).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN)) {
            com.sokolov.portal.Portlet._setStateCssClass(this.portlets[i].getId(), com.sokolov.portal.Portlet.CSS_CLASS_PORTLET); // TODO: open question
        }
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).onclick = new Function();
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).ondblclick = new Function();
    }
}

/**
 * Sets Window state for the contaier.
 *
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.window = function() {
    com.sokolov.portal.Region._setStateCssClass(this.id, com.sokolov.portal.Region.CSS_CLASS_WINDOW);

    for (var i = 0; i < this.portlets.length; i++) {
        if (!has($(this.portlets[i].getId()).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN)) {
            com.sokolov.portal.Portlet._setStateCssClass(this.portlets[i].getId(), com.sokolov.portal.Portlet.CSS_CLASS_PORTLET); // TODO: open question
        }
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).onclick = new Function();
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).ondblclick = new Function();
    }
}

/**
 * Sets Standard state for the contaier.
 *
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.standard = function() {
    com.sokolov.portal.Region._setStateCssClass(this.id, com.sokolov.portal.Region.CSS_CLASS_STANDARD);

    for (var i = 0; i < this.portlets.length; i++) {
        //if (!has($(this.portlets[i].getId()).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN)) {                   // TODO: it's wrong behaviour
        //    com.sokolov.portal.Portlet._setStateCssClass(this.portlets[i].getId(), com.sokolov.portal.Portlet.CSS_CLASS_PORTLET); 
        //}
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).onclick = new Function();
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).ondblclick = new Function("com.sokolov.portal.Region._setPortletState('" + this.portlets[i].getId() + "');"); 
    }
}

/**
 * Sets Accordion state for the contaier.
 *
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.accordion = function() {
    com.sokolov.portal.Region._setStateCssClass(this.id, com.sokolov.portal.Region.CSS_CLASS_ACCORDION);

    var activePortletId = null;

    var array = this._arrayToString(this.portlets);
    for (var i = 0; i < this.portlets.length; i++) {
        if ((activePortletId == null) && (!has($(this.portlets[i].getId()).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN))) {
            activePortletId = this.portlets[i].getId();
        }
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).onclick = new Function("com.sokolov.portal.Region._setPortletState('" + this.portlets[i].getId() + "', [" + array + "]);");
        $(this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_HEADER).ondblclick = new Function();
    }

    if (this.portlets.length > 0) {
        com.sokolov.portal.Region._setPortletState(activePortletId, eval("[" + array + "]"));
    }
}

/**
 * Sets TabPanels state for the contaier.
 *
 * @returns {void}
 */
com.sokolov.portal.Region.prototype.tabs = function() {
    com.sokolov.portal.Region._setStateCssClass(this.id, com.sokolov.portal.Region.CSS_CLASS_TABS);

    // init tabs bar
    var iconUri;
    var tabs = "";
    var array = this._arrayToString(this.portlets);
    var activePortletId = null;
    for (var i = 0; i < this.portlets.length; i++) {
        if (!has($(this.portlets[i].getId()).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN)) {
            if (activePortletId == null) {
                activePortletId = this.portlets[i].getId();
            }
            iconUri = $(this.portlets[i].getIconId()).style.backgroundImage;

            tabs += "<span id='" + this.portlets[i].getId() + com.sokolov.portal.Region.ID_TABS_ITEM + "'" 
                    + " class='tabItem' onclick=\"com.sokolov.portal.Region._setPortletState('" + this.portlets[i].getId() + "', [" + array + "], true); return false;\">" 
                    + "<span id='" + this.portlets[i].getId() + com.sokolov.portal.Portlet.ID_ICON + "' class='"+ com.sokolov.portal.Region.ID_TABS_ITEM + com.sokolov.portal.Portlet.ID_ICON + "' " + ((iconUri)?" style='background-image: " + iconUri + "'":"") +">&nbsp;&nbsp;&nbsp;&nbsp;</span>" 
                    + this.portlets[i].getTitle() 
                    + "</span> ";
        }
    }
    $(this.getTabsNavigationPanelId()).innerHTML = tabs;

    if (this.portlets.length > 0) {
        com.sokolov.portal.Region._setPortletState(activePortletId, eval("[" + array + "]"), true);
    }                      
}

/**
 * Converts array of ids to comma separated string.
 *
 * @param {array} portlets an array of portlet ids
 * @returns {void}
 * @private
 */
com.sokolov.portal.Region.prototype._arrayToString = function(portlets) {
    var array = "";
    for (var i = 0; i < portlets.length; i++) {
        if (i > 0) {
            array += ",";
        }
        array += "'" + portlets[i].getId() + "'";
    }
    return array; 
}

/**
 * Support Accordion and TabPanels functionality.
 *
 * @param {string} activeId id of active portlet
 * @param {array} ids an array of portlet ids
 * @param {boolean} isTabPanels flag, it's true if the region state is TabPanels
 * @returns {void}
 * @private
 */
com.sokolov.portal.Region._setPortletState = function(activeId, ids, isTabPanels) {

    if (ids) {
        for (var i = 0; i < ids.length; i++) {
            if (!has($(ids[i]).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN)) {
                if (activeId == ids[i]) {
                    if (isTabPanels) {
                        $(ids[i] + com.sokolov.portal.Region.ID_TABS_ITEM).className = com.sokolov.portal.Region.CSS_CLASS_TABS_ITEM_ACTIVE;
                    } 
                    com.sokolov.portal.Portlet._setStateCssClass(ids[i], com.sokolov.portal.Portlet.CSS_CLASS_PORTLET);
                } else {
                    if (isTabPanels) {
                        $(ids[i] + com.sokolov.portal.Region.ID_TABS_ITEM).className = com.sokolov.portal.Region.CSS_CLASS_TABS_ITEM;
                    }
                    com.sokolov.portal.Portlet._setStateCssClass(ids[i], com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE);
                }
            }
        }
    } else {
        // for STANDARD mode
        if (has($(activeId).className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET)) {
           com.sokolov.portal.Portlet._setStateCssClass(activeId, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE);
        } else {
           com.sokolov.portal.Portlet._setStateCssClass(activeId, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET);
        }
    }
}


/**
 * Finds portlets in the region.
 *
 * @param {element} startObject an region element
 * @param {array} result an array with ids of found portlets
 * @returns {void}
 * @private
 */
com.sokolov.portal.Region.findPortlets = function(startElement, result) {
    for (var i = 0; i < startElement.childNodes.length; i++) {
        if (has(startElement.childNodes[i].className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET) 
           || has(startElement.childNodes[i].className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE)
           || has(startElement.childNodes[i].className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN)) {
            result[result.length] = startElement.childNodes[i].id;
        }
        this.findPortlets(startElement.childNodes[i], result)
    }
}
