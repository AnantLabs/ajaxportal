///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.3 Alpha4 (28 Jan 2011)                            //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is to be used for com.sokolov.portal.Portlet creation in AJAX Portal. 
 *
 * @author Sergei Sokolov ssokolov@ajaxportal.org
 * @version 1.0.3
 */


/** 
 * @namespace 
 * @private 
 */
var com = {};

/** 
 * @namespace 
 * @private 
 */
com.sokolov = {}

/** 
 * @namespace 
 * @private 
 */
com.sokolov.portal = {}

/** Holds default portlet title. */
var DEFAULT_PORTLET_TITLE = "New";

/**
 * Portlet constructor.
 * @class Portlet wrapper for AJAX portal.<br/>
 *
 * 
 * Portlet has the following states:<br/>
 *     * Normal (see <span class="link"><span>com.sokolov.portal.Portlet.</span><a href="#.STATE_NORMAL">STATE_NORMAL</a></span>)<br/>
 *     * Minimized (see <span class="link"><span>com.sokolov.portal.Portlet.</span><a href="#.STATE_MINIMIZED">STATE_MINIMIZED</a></span>)<br/>
 *     * Maximized (TODO: will release 1.1)<br/>
 *     * Hidden (see <span class="link"><span>com.sokolov.portal.Portlet.</span><a href="#.STATE_HIDDEN">STATE_HIDDEN</a></span>)<br/>
 * <br/>
 *
 * Portlet class is a wrapper for an element (usually is created by <b>div</b> tag) in HTML document.<br/>
 * <br/>
 *
 * Portlet title sets by:<br/>
 *  - <a href="#constructor">constructor</a>,<br/>
 *  - <b>title</b> attribute of the element,<br/>
 *  - <a href="#setTitle">setTitle(title)</a> method.<br/>
 * Title is set from <b>title</b> attribute if title is not defined by constructor.
 * Title is set by <a href="#.DEFAULT_PORTLET_TITLE">DEFAULT_PORTLET_TITLE</a> const if title is not defined by constructor and <b>title</b> attribute.<br/>
 *
 * <pre class="code">
 *     function onload() {
 *         var portlet1 = new com.sokolov.portal.Portlet("polygon1");
 *         portlet1.init();
 *
 *         var portlet2 = new com.sokolov.portal.Portlet("polygon2", "Title");
 *         portlet2.init();
 *         portlet2.setIcon("images/icon_search.gif");
 *
 *         var portlet3 = new com.sokolov.portal.Portlet("polygon3");
 *         portlet3.init();
 *         portlet3.setIcon("images/icon_tool.gif");
 *
 *         var portlet4 = new com.sokolov.portal.Portlet("polygon4");
 *         portlet4.init();
 *         portlet4.setTitle("Title");
 *         portlet4.setIcon("images/icon_tool.gif");
 *     }
 * </pre>
 *
 * @constructor
 * @param {string} id an identificator of portlet element. If it has null value, id is generated by <span class="link"><span>Portlet.</span><a href="#.generatePortletId">generatePortletId</a>()</span>
 * @param {string (optional)} title a portlet title. If the portlet element is exist on the page, the value will be loaded from <i>title</i> attribute of the portlet element. If the portlet element is not exist and the value is not defines, the portlet title set by <span class="link"><a href="_global_.html#DEFAULT_PORTLET_TITLE">DEFAULT_PORTLET_TITLE</a></span> const.
 * @param {object or string (desirable)} portletRegion an reference to region element or id of region element
 * @returns {object} an instance of the portlet wrapper
 */
com.sokolov.portal.Portlet = function(id, title, portletRegion, state, iconUri) {
   /** Holds an identificator of portlet element */
   this.id = id;

   /** Holds a portlet title */
   this.title = title;

   /** Holds an reference to region element or id of region element */
   this.portletRegion = portletRegion;

   /** Holds a portlet state */
   this.state = state;

   /** Holds an uri of portlet icon */
   this.iconUri = iconUri;
};

/**
 * Is the portlet draggable.
 *
 * @returns {boolean} true or false
 */
com.sokolov.portal.Portlet.prototype.isDraggable = function () {
    var className = $(this.getId()).className;
    if (has(className, com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET)) {
        return true;
    }
    return false;
}

/**
 * Set the portlet draggable or not.
 *
 * @param flag true if the portlet is draggable
 */
com.sokolov.portal.Portlet.prototype.setDraggable = function (flag) {
    var portletObj = $(this.getId());
    if (flag) {
        if (!has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET)) {
            definedAsDraggable(portletObj);
            portletObj.className += " " + com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET;
        }
    } else {
        if (has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET)) {
            definedAsUndraggable(portletObj);
            portletObj.className = remove(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET);
        }
    }
}

/**
 * Delete the portlet padding.
 *
 * @param flag true if the portlet is without padding
 */
com.sokolov.portal.Portlet.prototype.setZeroPadding = function (flag) {
    var portletObj = $(this.getId());
    if (flag) {
        if (!has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_ZERO_PADDING)) {
            definedAsDraggable(portletObj);
            portletObj.className += " " + com.sokolov.portal.Portlet.CSS_CLASS_ZERO_PADDING;
        }
    } else {
        if (has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_ZERO_PADDING)) {
            definedAsUndraggable(portletObj);
            portletObj.className = remove(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_ZERO_PADDING);
        }
    }
}

/**
 * Has EDIT buton.
 *
 * @returns {boolean} true or false
 */
com.sokolov.portal.Portlet.prototype.hasEditButton = function () {
    var className = $(this.getId()).className;
    if (has(className, com.sokolov.portal.Portlet.CSS_CLASS_EDIT_VIEW)) {
        return true;
    }
    return false;
}

/**
 * Set Edit button for the portlet.
 *
 * @param {boolean} flag flag if the flag is true the porlet has the Edit Button
 */
com.sokolov.portal.Portlet.prototype.setEditButton = function (flag) {
    var portletObj = $(this.getId());
    if (flag) {
        if (!has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_EDIT_VIEW)) {
            portletObj.className += " " + com.sokolov.portal.Portlet.CSS_CLASS_EDIT_VIEW;
        }
    } else {
        if (has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_EDIT_VIEW)) {
            portletObj.className = remove(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_EDIT_VIEW);
        }
    }
}


/**
 * Has HELP buton.
 *
 * @returns {boolean} true or false
 */
com.sokolov.portal.Portlet.prototype.hasHelpButton = function () {
    var obj = $(this.getId());
    var helpUrl = getAttributeValue(obj, com.sokolov.portal.Portlet.HELP_ATTRIBUTE);
    if (helpUrl) {
        return true;
    }
    return false;
}

/**
 * Set Help button for the portlet.
 *
 * @param {boolean} flag flag if the flag is true the porlet has the Help Button
 */
com.sokolov.portal.Portlet.prototype.setHelpButton = function (flag) {
    var portletObj = $(this.getId());
    if (flag) {
        if (!has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_HELP_VIEW)) {
            portletObj.className += " " + com.sokolov.portal.Portlet.CSS_CLASS_HELP_VIEW;
        }
    } else {
        if (has(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_HELP_VIEW)) {
            portletObj.className = remove(portletObj.className, com.sokolov.portal.Portlet.CSS_CLASS_HELP_VIEW);
        }
    }
}

/**
 * Get URL of HELP page.
 *
 * @returns {string} URL of HELP page
 */
com.sokolov.portal.Portlet.prototype.getHelpUrl = function () {
    var obj = $(this.getId());
    var value = getAttributeValue(obj, com.sokolov.portal.Portlet.HELP_ATTRIBUTE);
    if (!(value)) {
        return "";
    }
    return value;
}

/**
 * Set URL of HELP page.
 *
 * @param {string} url URL of HELP page
 */
com.sokolov.portal.Portlet.prototype.setHelpUrl = function (url) {
    var obj = $(this.getId());
    //if (url && (url.length > 0)) {
        setAttributeValue(obj, com.sokolov.portal.Portlet.HELP_ATTRIBUTE, url);
    //} else {
        //setAttributeValue(obj, com.sokolov.portal.Portlet.HELP_ATTRIBUTE, null);
    //}
}

/**
 * Get URL of loaded content.
 *
 * @returns {string} URL of loaded content
 */
com.sokolov.portal.Portlet.prototype.getUrl = function () {
    var obj = $(this.getId());
    if (has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_IFRAME)) {
        var iframe = $(obj.id + com.sokolov.portal.Portlet.ID_FRAME);
        return iframe.src;
    } else {
        var value = getAttributeValue(obj, com.sokolov.portal.Portlet.URL_ATTRIBUTE_COPY);
        if (!(value)) {
            return "";
        }
        return value;
    }
    return "";
}

/**
 * Set URL of loaded content and load it.
 *
 * @param {string} URL of loaded content
 */
com.sokolov.portal.Portlet.prototype.setUrl = function (url) {
    if (url && (url.length > 0)) {
        var obj = $(this.getId());
        if (has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_IFRAME)) {
            var iframe = $(obj.id + com.sokolov.portal.Portlet.ID_FRAME);
            iframe.src=url; 
        } else {
            injectHttpContent(url, this.id + com.sokolov.portal.Portlet.ID_CONTENT);
            //setAttributeValue(this, com.sokolov.portal.Portlet.URL_ATTRIBUTE, null);

            setAttributeValue(obj, com.sokolov.portal.Portlet.URL_ATTRIBUTE_COPY, url);
        }
    }
}

/** Holds CSS class for portlet with Normal (Active) state. */
com.sokolov.portal.Portlet.CSS_CLASS_PORTLET = "portlet";

/** Holds CSS class for portlet with Minimized (not Active) state. */
com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE = "portletNotActive";

/** Holds CSS class for portlet with Hide state. */
com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN = "portletHidden";

/** Holds CSS class for Help button. */
com.sokolov.portal.Portlet.CSS_CLASS_HELP_VIEW = "helpView";

/** Holds CSS class for Edit button. */
com.sokolov.portal.Portlet.CSS_CLASS_EDIT_VIEW = "editable";

/** Holds CSS class for zero portlet padding. */
com.sokolov.portal.Portlet.CSS_CLASS_ZERO_PADDING = "zeroPadding";

/** Holds CSS class for noBehaviourButton marker. */
com.sokolov.portal.Portlet.CSS_CLASS_NO_BEHAVIOUR_BUTTONS = "noBehaviourButton";

/** Holds CSS class for IFRAME. */
com.sokolov.portal.Portlet.CSS_CLASS_IFRAME = "iframe";

/** Holds CSS class for dialog. */
com.sokolov.portal.Portlet.CSS_CLASS_DIALOG = "dialog";



/** Holds identificator for portlet element. */
com.sokolov.portal.Portlet.ID_PORTLET = "portlet";

/** Holds identificator for portlet header element. */
com.sokolov.portal.Portlet.ID_HEADER = "Header"

/** Holds identificator for portlet title element. */
com.sokolov.portal.Portlet.ID_TITLE = "Title";

/** Holds identificator for portlet icon element in the portlet title. */
com.sokolov.portal.Portlet.ID_ICON = "Icon";

/** Holds identificator for portlet State button. */
com.sokolov.portal.Portlet.ID_STATE_BUTTON = "Button";

/** Holds identificator for portlet Drag icon. */
com.sokolov.portal.Portlet.ID_DRAG_ICON = "DragIcon";

/** Holds identificator for portlet Tool button. */
com.sokolov.portal.Portlet.ID_TOOL_BUTTON = "ToolButton";

/** Holds identificator for portlet Help button. */
com.sokolov.portal.Portlet.ID_HELP_BUTTON = "HelpButton";
            
/** Holds identificator for portlet content element. */
com.sokolov.portal.Portlet.ID_CONTENT = "Content";

/** Holds identificator for IFRAME. */
com.sokolov.portal.Portlet.ID_FRAME = "IFrame";


/** Holds Minimized portlet state. */
com.sokolov.portal.Portlet.STATE_MINIMIZED = 0;

/** Holds Normal portlet state. */
com.sokolov.portal.Portlet.STATE_NORMAL = 1;

/** Holds Hide portlet state. */
com.sokolov.portal.Portlet.STATE_HIDDEN = 2;



/** Holds Drag marker. */
com.sokolov.portal.Portlet.CSS_CLASS_DRAG_PORTLET = "draggable";



/** Holds name of Help attribute. */
com.sokolov.portal.Portlet.HELP_ATTRIBUTE = "help";

/** Holds name of Url attribute. */
com.sokolov.portal.Portlet.URL_ATTRIBUTE = "url";

/** Holds name of Url Copy attribute. */
com.sokolov.portal.Portlet.URL_ATTRIBUTE_COPY = "urlCopy";

/** Holds name of Body Height attribute. */
com.sokolov.portal.Portlet.BODY_HEIGHT_ATTRIBUTE = "bodyHeight";


/**
 * Checks the call of com.sokolov.portal.Portlet.createContentArea(string, object) is required or not. 
 *
 * @returns {boolean} true if the element exists (was created)
 * @see #init()
 * @see com.sokolov.portal.Portlet.createContentArea(string, object)
 */
com.sokolov.portal.Portlet.prototype.isCreated = function() {
    if (!$(this.getId())) {
        return false;
    }
    return true;
}

/**
 * Checks the call of com.sokolov.portal.Portlet.decorateContentArea(string, string, string) is required or not. 
 *
 * @returns {boolean} true if the element was decorated
 * @see #init()
 * @see com.sokolov.portal.Portlet.decorateContentArea(string, string, string)
 */
com.sokolov.portal.Portlet.prototype.isDecorated = function() {
    if (!($(this.getTitleId()))) {
        return false;
    }

/*
    if (!$(this.getContentId())) {
        return false;
    }
*/
    return true;
}


/**
 * Initalise the portlet. 
 *
 * @returns {void}
 * @see #isCreated()
 * @see com.sokolov.portal.Portlet.createContentArea(string, object)
 * @see #isDecorated()
 * @see com.sokolov.portal.Portlet.decorateContentArea(string, string, string)
 */
com.sokolov.portal.Portlet.prototype.init = function() {

    if (this.isDecorated()) {
        return; 
    }

    // check portlet region and define
    if (!this.id) {
        this.setId(com.sokolov.portal.Portlet.generatePortletId());
        if (!this.title) {
            this.title = DEFAULT_PORTLET_TITLE;
        }
    }

    // check portlet region and define Document Body as default 
    if (!this.portletRegion) {
        if (window.portal && window.portal.getDefaultPortletRegion()) {
            this.portletRegion = window.portal.getDefaultPortletRegion();
        } else {
            this.portletRegion = document.body;
        }
    }

    // create element
    if (!this.isCreated()) {
        com.sokolov.portal.Portlet.createContentArea(this.id, this.portletRegion);
    }

    // decorate element
    if (!this.isDecorated()) {
        com.sokolov.portal.Portlet.decorateContentArea(this.id, this.title, this.iconUri);
    }

    // set state
    if ((!(this.getState())) && (!(this.state))) {
        this.setState(com.sokolov.portal.Portlet.STATE_NORMAL);
    } else if (this.state) {
        this.setState(this.state);
    }

    var obj = $(this.id);

    // initialized Help mode
    if (obj.className) {
        obj.className = obj.className.replace(/helpView/g, "");
        //obj.className.replace(/  /g, " ");
    }
    var helpUrl = getAttributeValue(obj, com.sokolov.portal.Portlet.HELP_ATTRIBUTE);
    if (helpUrl) {
        obj.className += " " + com.sokolov.portal.Portlet.CSS_CLASS_HELP_VIEW;
    }

    // set iframe size
    var bodyHeight = getAttributeValue(obj, com.sokolov.portal.Portlet.BODY_HEIGHT_ATTRIBUTE);
    if (!bodyHeight) {
        bodyHeight = "250px"; 
    }
    var content = $(obj.id + com.sokolov.portal.Portlet.ID_CONTENT);
    if (content && bodyHeight) {
        /*content.style.height = bodyHeight; */      // TODO: check
        content.height = bodyHeight; 
    }

    // inject content
    var url = getAttributeValue(obj, com.sokolov.portal.Portlet.URL_ATTRIBUTE);
    if (url && injectHttpContent) {
        if (has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_IFRAME)) {
            var iframe = $(obj.id + com.sokolov.portal.Portlet.ID_FRAME);
            iframe.src=url; 

            if (iframe && bodyHeight) {
                /*iframe.style.height = bodyHeight; */       // TODO: check
                iframe.height = bodyHeight; 
            }
            if (iframe && isIE) {
                iframe.style.width = content.offsetWidth;
            }
/*
            //iframe.onclick = function () { alert('sss'); }
            iframe.addEventListener('resize', function() { alert('ssss'); }, false); 

      if (document.addEventListener != null) { // e.g. Firefox, Opera, Safari
          iframe.addEventListener("mousemove", function() { alert('ssss'); }, true);
      } else { // e.g. Internet Explorer (also would work on Opera)
          iframe.attachEvent("onmousemove", function() { alert('ssss'); });
      }
*/


        } else {
            injectHttpContent(url, this.id + com.sokolov.portal.Portlet.ID_CONTENT);
            setAttributeValue(obj, com.sokolov.portal.Portlet.URL_ATTRIBUTE, null);
            setAttributeValue(obj, com.sokolov.portal.Portlet.URL_ATTRIBUTE_COPY, url);
        }
    }
}

/**
 * Create a content area. 
 *
 * @param {string} id an idetificator of the portlet element
 * @param {element or string} portletRegion a reference to the region element or id of region element
 * @returns {void}
 * @see #init()
 * @see #isCreated()
 */
com.sokolov.portal.Portlet.createContentArea = function(id, portletRegion) { 
    var obj = (typeof portletRegion == "string")?$(portletRegion):portletRegion;
    if (obj) {
        try {
            var div = document.createElement("div");
            div.setAttribute("id", id);
            obj.appendChild(div);
            div.innerHTML = "&nbsp;"

            com.sokolov.portal.Portlet._setStateCssClass(id, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET);
        } catch (e) {
            debug(e);
        }
    }
}

com.sokolov.portal.Portlet.isIFrame = function() { 
    var obj = $(id);
    if (obj) {
        return has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_IFRAME);
    }
    return false;
}

/**
 * Decorate a content area. 
 *
 * @param {string} id an idetificator of the portlet element
 * @param {string} title a title of the portlet
 * @param {uri-string} iconUri a new icon URI
 * @returns {void}
 * @see #init()
 * @see #isDecorated()
 */
com.sokolov.portal.Portlet.decorateContentArea = function(id, title, iconUri) { 
    var obj = $(id);
    if (obj) {
        try {
            obj.innerHTML = "<div id='" + id + com.sokolov.portal.Portlet.ID_HEADER + "' class='"+ com.sokolov.portal.Portlet.ID_PORTLET + com.sokolov.portal.Portlet.ID_HEADER + "' ondblclick='com.sokolov.portal.Portlet._changePortletState(\"" + id + "\"); '>" //  onmousedown='deselectAndBlur(this);' onmouseup='deselectAndBlur(this);'
                                + "<div id='" + id + com.sokolov.portal.Portlet.ID_ICON + "' class='"+ com.sokolov.portal.Portlet.ID_PORTLET + com.sokolov.portal.Portlet.ID_ICON + "' " + ((iconUri)?" style='background-image: url(\"" + iconUri + "\");'":"") +">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" 
                                + com.sokolov.portal.Portlet._minimizeNormalButton(id)
                                + com.sokolov.portal.Portlet._helpButton(id)
                                + com.sokolov.portal.Portlet._toolButton(id)
                                + com.sokolov.portal.Portlet._dragIcon(id)
                                + "&nbsp;<span id='" + id + com.sokolov.portal.Portlet.ID_TITLE + "'class='"+ com.sokolov.portal.Portlet.ID_PORTLET + com.sokolov.portal.Portlet.ID_TITLE + "'>" + ((title)?title:((obj.title)?obj.title.replace(/ /g, "&nbsp;"):"&nbsp;")) + "</span>"
                                + "</div>"
                                
                          + "<div id='" + id + com.sokolov.portal.Portlet.ID_CONTENT + "' class='"+ com.sokolov.portal.Portlet.ID_PORTLET + com.sokolov.portal.Portlet.ID_CONTENT + "'>" 
                          + ((!has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_IFRAME))?obj.innerHTML:"<iframe id='" + id + com.sokolov.portal.Portlet.ID_FRAME + "' class='iframe'></iframe>")
                          + "</div>";
            obj.title = "";
        } catch (e) {
            debug(e);
        }
    }
}

/**
 * Generate portlet id.
 *
 * @returns {string} generated portlet id
 * @see #init()
 */
com.sokolov.portal.Portlet.generatePortletId = function() {
    return "portlet" + (new Date()).getTime();
}

/**
 * Gets identificator of header element.
 *
 * @returns {string} an title identificator
 * @see com.sokolov.portal.Portlet.decorateContentArea(string, string, string)
 */
com.sokolov.portal.Portlet.prototype.getHeaderId = function() {
    return this.id + com.sokolov.portal.Portlet.ID_HEADER;
}

/**
 * Gets identificator of icon element.
 *
 * @returns {string} an icon identificator
 * @see com.sokolov.portal.Portlet.decorateContentArea(string, string, string)
 */
com.sokolov.portal.Portlet.prototype.getIconId = function() {
    return this.id + com.sokolov.portal.Portlet.ID_ICON;
}

/**
 * Gets identificator of title element.
 *
 * @returns {string} an title identificator
 * @see com.sokolov.portal.Portlet.decorateContentArea(string, string, string)
 */
com.sokolov.portal.Portlet.prototype.getTitleId = function() {
    return this.id + com.sokolov.portal.Portlet.ID_TITLE;
}

/**
 * Gets identificator of content element.
 *
 * @returns {string} an content identificator
 * @see com.sokolov.portal.Portlet.decorateContentArea(string, string, string)
 */
com.sokolov.portal.Portlet.prototype.getContentId = function() {
    return this.id + com.sokolov.portal.Portlet.ID_CONTENT;
}

/**
 * Setter for id property.
 *
 * @param {string} id a new value of id property
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.setId = function (id) {
    this.id = id;
}

/**
 * Getter for id property.
 *
 * @returns {string} a value of id property
 */
com.sokolov.portal.Portlet.prototype.getId = function () {
    return this.id;
}

/**
 * Setter for portletRegion property.
 *
 * @param {object or string} portletRegion a new value of portletRegion property
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.setPortletRegion = function (portletRegion) {
    this.portletRegion = portletRegion;
}

/**
 * Getter for portletRegion property.
 *
 * @returns {object} a value of portletRegion property
 */
com.sokolov.portal.Portlet.prototype.getPortletRegion  = function () {
    return this.portletRegion;
}

/**
 * Sets for the portlet title.
 *
 * @param {string} title a new value of the portlet title
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.setTitle = function (title) {
    $(this.getTitleId()).innerHTML = title.replace(/ /g, "&nbsp;");;
}

/**
 * Gets for the portlet title.
 *
 * @returns {string} the portlet title
 */
com.sokolov.portal.Portlet.prototype.getTitle = function () {
    return $(this.getTitleId()).innerHTML.replace(/&nbsp;/g, " ");
}

/**
 * Sets HTML content of the portlet.
 *
 * @param {string} content a new HTML content
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.setHtmlContent = function (content) {
    $(this.getContentId()).innerHTML = content;
}

/**
 * Gets HTML content of the portlet.
 *
 * @returns {string} HTML content
 */
com.sokolov.portal.Portlet.prototype.getHtmlContent = function () {
    return $(this.getContentId()).innerHTML;
}

/**
 * Sets icon of the portlet.
 *
 * @param {uri-string} icon a new icon uri
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.setIcon = function (icon) {
    if (icon) {
        $(this.getIconId()).style.backgroundImage = (icon.indexOf("url") == -1)?("url(" + icon + ")"):icon;
    }
}

/**
 * Gets icon of the portlet.
 *
 * @returns {uri-string} icon uri // TODO: change
 */
com.sokolov.portal.Portlet.prototype.getIcon = function () {
    return $(this.getIconId()).style.backgroundImage;  // TODO: extract path
}

/**
 * Gets state of the portlet.
 *
 * @returns {com.sokolov.portal.Portlet.STATE_NORMAL | com.sokolov.portal.Portlet.STATE_MINIMIZED | com.sokolov.portal.Portlet.STATE_HIDDEN} portlet state
 */
com.sokolov.portal.Portlet.prototype.getState = function () {
    var className = $(this.getId()).className;
    if (has(className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET))
        return com.sokolov.portal.Portlet.STATE_NORMAL;
    if (has(className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE))
        return com.sokolov.portal.Portlet.STATE_MINIMIZED;
    if (has(className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN))
        return com.sokolov.portal.Portlet.STATE_HIDDEN;
    return null; // impossible state
}

/**
 * Sets a state of the portlet.
 *
 * @param {com.sokolov.portal.Portlet.STATE_NORMAL | com.sokolov.portal.Portlet.STATE_MINIMIZED | com.sokolov.portal.Portlet.STATE_HIDDEN} state a new state
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.setState = function (state) {
    if (state == com.sokolov.portal.Portlet.STATE_NORMAL) {
        this.normal(); 
    } else if (state == com.sokolov.portal.Portlet.STATE_MINIMIZED) {
        this.minimaze(); 
    } else if (state == com.sokolov.portal.Portlet.STATE_HIDDEN) {
        this.hide(); 
    } else {
        // impossible state
    } 
}

/**
 * Sets Normal state for the portlet.
 *
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.normal = function () {
    com.sokolov.portal.Portlet._setStateCssClass(this.getId(), com.sokolov.portal.Portlet.CSS_CLASS_PORTLET);
/*
try {
    var bodyHeight = getAttributeValue(obj, com.sokolov.portal.Portlet.BODY_HEIGHT_ATTRIBUTE);
    var content = $(obj.id + com.sokolov.portal.Portlet.ID_CONTENT);
    if (content && bodyHeight) {
        content.style.height = bodyHeight; 
    }
} catch (e) {}
*/
}

/**
 * Sets Minimized state for the portlet.
 *
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.minimaze = function () {
    com.sokolov.portal.Portlet._setStateCssClass(this.getId(), com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE);
/*
try {
    var obj = $(this.id);
    var bodyHeight = getAttributeValue(obj, com.sokolov.portal.Portlet.BODY_HEIGHT_ATTRIBUTE);
    var content = $(obj.id + com.sokolov.portal.Portlet.ID_CONTENT);
    if (content && bodyHeight) {
        content.style.height = "0px"; 
    }
} catch (e) {}
*/
}

/**
 * Sets Hide state for the portlet.
 *
 * @returns {void}
 */
com.sokolov.portal.Portlet.prototype.hide = function () {
    com.sokolov.portal.Portlet._setStateCssClass(this.getId(), com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN);
}

/**
 * Change portlet state.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {void}
 * @private
 */
com.sokolov.portal.Portlet._changePortletState = function(id) {
    var obj = $(id);
    if (obj && (!has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_NO_BEHAVIOUR_BUTTONS))) {
        if (has(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE)) {
            com.sokolov.portal.Portlet._setStateCssClass(id, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET);
        } else {
            com.sokolov.portal.Portlet._setStateCssClass(id, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE);
        } 
    }
}

/**
 * Change portlet state.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {void}
 * @private
 */
com.sokolov.portal.Portlet._setStateCssClass = function(id, cssClass) {

    var obj = $(id);
    if (obj) {
        if (obj.className) {
            var str1 = remove(obj.className, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_HIDDEN);
            var str2 = remove(str1, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET_NOT_ACTIVE);
            var str3 = remove(str2, com.sokolov.portal.Portlet.CSS_CLASS_PORTLET);
            obj.className = cssClass + ((str3 !="")?" ":"") + str3;
        } else {
            obj.className = cssClass;
        }
        return obj.className;
    }
    return cssClass;
}

/**
 * Generate HTML code of button for Lite portlet mode.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {string} HTML code
 * @private
 */
com.sokolov.portal.Portlet._minimizeNormalButton = function(id) {
    return "<span id='" + id + com.sokolov.portal.Portlet.ID_STATE_BUTTON + "' class='changeStateButton' onclick='com.sokolov.portal.Portlet._changePortletState(\"" + id + "\");' ondblclick='stopEventPropagation(arguments);' onmousedown='stopEventPropagation(arguments);' onmouseup='stopEventPropagation(arguments);' onmousemove='stopEventPropagation(arguments);'>&nbsp;</span>";
}

/**
 * Generate HTML code of Drag icon.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {string} HTML code
 * @private
 */
com.sokolov.portal.Portlet._dragIcon = function(id) {
    return "<a><span id='" + id + com.sokolov.portal.Portlet.ID_DRAG_ICON + "' class='dragIcon'>&nbsp;</span></a>";
}

/**
 * Generate HTML code of Tool button.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {string} HTML code
 * @private
 */
com.sokolov.portal.Portlet._toolButton = function(id) {
    return "<a><span id='" + id + com.sokolov.portal.Portlet.ID_TOOL_BUTTON + "' class='toolButton' onclick='com.sokolov.portal.Portlet._changeTitle(\"" + id + "\");stopEventPropagation(arguments);' onmousedown='stopEventPropagation(arguments);' onmouseup='stopEventPropagation(arguments);' onmousemove='stopEventPropagation(arguments);'>&nbsp;</span></a>";
}

/**
 * Generate HTML code of Help button.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {string} HTML code
 * @private
 */
com.sokolov.portal.Portlet._helpButton = function(id) {
    return "<a><span id='" + id + com.sokolov.portal.Portlet.ID_HELP_BUTTON + "' class='helpButton'" 
           + " onclick='com.sokolov.portal.Portlet._helpEvent(\"" + id + "\");stopEventPropagation(arguments);' onmousedown='stopEventPropagation(arguments);' onmouseup='stopEventPropagation(arguments);' onmousemove='stopEventPropagation(arguments);'>&nbsp;</span></a>";
} 

/**
 * Change portlet state.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {void}
 * @private
 */
com.sokolov.portal.Portlet._helpEvent = function(id) {
    var obj = $(id);
    var helpUrl = getAttributeValue(obj, com.sokolov.portal.Portlet.HELP_ATTRIBUTE);
    if (helpUrl) {
        var win = window.open(helpUrl, 'Help', 'menubar=no,toolbar=no,scrollbars=yes,status=no'); // TODO: ,statusbar=no check
        win.moveTo(150, 200);
        win.resizeTo(800, 600);
    }

}


/**
 * Change portlet title.
 *
 * @param {string} id an idetificator of the portlet element
 * @returns {void}
 * @private
 */
com.sokolov.portal.Portlet._changeTitle = function(id) {

    showEditDialog(id);
/*
    var text = $(id + com.sokolov.portal.Portlet.ID_TITLE).innerHTML;
    var result = prompt("Input a new portlet title:", text.replace(/&nbsp;/g, " "));
    if (result) {
        $(id + com.sokolov.portal.Portlet.ID_TITLE).innerHTML = result.replace(/ /g, "&nbsp;");
    }
*/
}