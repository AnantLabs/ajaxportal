///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.3 Alpha4 (28 Jan 2011)                            //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is to be used in AJAX Portal. 
 *
 * @author Sergei Sokolov s-sokolov@tut.by
 * @version 1.0.3
 */


var PORTLET_SHADOW = "portletShadow";

document.onmousemove = _mouseMove;
document.onmouseup   = _mouseUp;

var dragObject  = null;
var portletShadow = null;

var mouseOffset = null;

var zindex = 1;


var dropTargets = []; 

/**
 * Add region in the list of regions which support drag&drop.
 *
 * @param {object} element of region
 * @returns {void}
 */
function addDropTarget(dropTarget) { 
    dropTargets[dropTargets.length] = dropTarget;
}


/**
 * Set the portlet as draggable.
 *
 * @param {object} element of portlet
 * @returns {boolean} flag
 */
function definedAsDraggable(item) {
    if(!item) return;

    var id = item.id;
    var header = id + com.sokolov.portal.Portlet.ID_HEADER;
    var headerObj = $(header);
    headerObj.onmousedown = function(ev) {
        var headerObject = this;
        var headerObjectId = headerObject.id;
        var objId = headerObjectId.replace(/Header/g, "");

        dragObject  = $(objId);

        try {
            if (dragObject.offsetWidth) {
                if (isIE) {
                    $(dragObject.id).style.width = dragObject.offsetWidth;
                } else {
                    $(dragObject.id).style.width = dragObject.offsetWidth - 2;
                } 
            }
        } catch (e) { }

        dragObject.style.zIndex = zindex++;

        mouseOffset = getMouseOffset(this, ev);

        return false;
    }
}

/**
 * Set the portlet as undraggable.
 *
 * @param item {object} element of portlet
 * @returns {boolean} flag
 */
function definedAsUndraggable(item) {
    if(!item) return;

    var id = item.id;
    var header = id + com.sokolov.portal.Portlet.ID_HEADER;
    var headerObj = $(header);
    headerObj.onmousedown = function(ev) {
        return false;
    }
}

/**
 * Mouse up event.
 *
 * @param dropTarget {object} portlet element
 * @param mousePos {object} coordinate structure
 * @returns {object} portlet element
 */
function getPortlet(dropTarget, mousePos) {
    if (window.portal && window.portal.portletRegions && window.portal.portletRegions.length) {
        for (j = 0; j < window.portal.portletRegions.length; j++) {
            if (dropTarget.id == window.portal.portletRegions[j].getId()) {
                var curTarget; 
                var targetPos;
                var targetWidth; 
                var targetHeight; 

                // mouse on portlet shadow
                curTarget  = $(PORTLET_SHADOW); 
                if (curTarget) {
                    targetPos    = getPosition(curTarget);
                    targetWidth  = parseInt(curTarget.offsetWidth); 
                    targetHeight = parseInt(curTarget.offsetHeight); 
 
                    if ( 
                        (mousePos.x > targetPos.x) && 
                        (mousePos.x < (targetPos.x + targetWidth)) && 
                        (mousePos.y > targetPos.y) && 
                        (mousePos.y < (targetPos.y + targetHeight))) 
                    { 
                        if (curTarget.nextSibling) {
                            return curTarget.nextSibling;
                        } else {
                            return null;
                        }
                    }
                }

                // mouse on some portlet
                for (var i = 0; i < window.portal.portletRegions[j].portlets.length; i++) { 
                    if (dragObject.id == window.portal.portletRegions[j].portlets[i].id) {
                        continue;
                    }
                    curTarget  = $(window.portal.portletRegions[j].portlets[i].id); 
                    if (curTarget) {
                        targetPos    = getPosition(curTarget);
                        targetWidth  = parseInt(curTarget.offsetWidth); 
                        targetHeight = parseInt(curTarget.offsetHeight); 
  
                        if ( 
                            (mousePos.x > targetPos.x-5) && 
                            (mousePos.x < (targetPos.x + targetWidth + 5)) && 
                            (mousePos.y > targetPos.y-5) && 
                            (mousePos.y < (targetPos.y + targetHeight + 5))) 
                        { 
                            if (mousePos.y < (targetPos.y + ((targetHeight + 5) / 2))) {
                                return curTarget;
                            } else if (curTarget.nextSibling) {
                                return curTarget.nextSibling;
                            } else {
                                return null;
                            }
                        }
                    }
                }    
            }
        }
   }
   return null;
}

/**
 * Mouse move event.
 *
 * @param ev {event} event
 * @returns {boolean}
 * @private
 */
function _mouseMove(ev) {
    ev = ev || window.event;
    var mousePos = mouseCoords(ev);

    if (dragObject) {

        /////////////////////////////////////////////////
        // portlet

        opacity(dragObject, 40);
        $(dragObject.id + com.sokolov.portal.Portlet.ID_HEADER).style.cursor = "move";


        dragObject.style.position = 'absolute';
        if (mouseOffset) {
            dragObject.style.top      = mousePos.y - mouseOffset.y;
        } else {
            dragObject.style.top      = mousePos.y - ev.pageY;
        }

        if (mouseOffset) {
            dragObject.style.left     = mousePos.x - mouseOffset.x;
        } else {
            dragObject.style.left     = mousePos.x - ev.pageX;
        }  

        var className = dragObject.className;
        if (has(className, com.sokolov.portal.Portlet.CSS_CLASS_DIALOG)) {
           return false;
        }

        /////////////////////////////////////////////////
        // portlet shadow

        if (portletShadow == null) {
            portletShadow = document.createElement("div");
            //portletShadow.setAttribute("class", "drag");
            //portletShadow.setAttribute("style", "border: 3px dashed silver;");
            //portletShadow.appendChild(document.createTextNode("text "));
            portletShadow.appendChild(document.createTextNode(" "));
            portletShadow.style.display = "none";
            portletShadow.id = PORTLET_SHADOW;

            //if (dragObject.nextSibling) {
            //    dragObject.parentNode.insertBefore(portletShadow, dragObject.nextSibling);
            //} else {
            //    dragObject.parentNode.appendChild(portletShadow);
            //}   
            dragObject.parentNode.insertBefore(portletShadow, dragObject);

            //$(PORTLET_SHADOW).style.className = "drag";
            portletShadow.style.cssText = "border: 3px dashed silver;"; // for IE and Opera

            try {
                if (dragObject.offsetWidth) {
                    portletShadow.style.height = dragObject.offsetHeight - 2;
                }
            } catch (e) { }

            portletShadow.style.display = "block";
        }

        for (var i = 0; i < dropTargets.length; i++) { 
            var curTarget  = dropTargets[i]; 
            var targetPos    = getPosition(curTarget);
            var targetWidth  = parseInt(curTarget.offsetWidth); 
            var targetHeight = parseInt(curTarget.offsetHeight); 
  
            if ( 
                (mousePos.x > targetPos.x)                && 
                (mousePos.x < (targetPos.x + targetWidth))  && 
                (mousePos.y > targetPos.y)                && 
                (mousePos.y < (targetPos.y + targetHeight))) 
            { 
                 
                var portlet = getPortlet(dropTargets[i], mousePos);
                if (portlet == null) {
                        dropTargets[i].appendChild(portletShadow);
                } else {
                    if (portletShadow.id == portlet.id) {
                        if (portlet.nextSibling) {                                           // TODO: check this case
                            dropTargets[i].insertBefore(portletShadow, portlet.nextSibling);
                        } else {
                            dropTargets[i].appendChild(portletShadow);
                        }
                    } else {
                        dropTargets[i].insertBefore(portletShadow, portlet);
                    }
                }
                portletShadow.style.position = 'relative';  // TODO: fix (this line must be in this postion)
            } 
        } 

        return false;
    }
}

/**
 * Mouse up event.
 *
 * @param ev {event} event
 * @returns {boolean}
 * @private
 */
function _mouseUp(ev) { 
    if (dragObject) {

        var iframe = null;

        $(dragObject.id + com.sokolov.portal.Portlet.ID_HEADER).style.cursor = "move";

        var className = dragObject.className;
        if ((!has(className, com.sokolov.portal.Portlet.CSS_CLASS_DIALOG)) && portletShadow) {

            try {
                $(dragObject.id).style.width = "auto";
                $(dragObject.id + com.sokolov.portal.Portlet.ID_HEADER).style.width = "auto";
            } catch (e) { }

            iframe = $(dragObject.id + com.sokolov.portal.Portlet.ID_FRAME);
            if (iframe && isIE) {
                iframe.style.width = 0;
            }

            dragObject.parentNode.removeChild(dragObject);
            portletShadow.parentNode.insertBefore(dragObject, portletShadow);

            var idSO = dragObject.parentNode.id; 
            refreshRegion(idSO);

            if (!isIE) {
                dragObject.style.position = 'relative';  // TODO: fix (this line must be in this postion)
            }

            // remove all events
            $(dragObject.id + com.sokolov.portal.Portlet.ID_HEADER).onclick = new Function();

            if (window.portal) {
                //window.portal.refresh();
            }

            if (idSO != portletShadow.parentNode.id) {
                refreshRegion(portletShadow.parentNode.id);
            }  

            portletShadow.parentNode.removeChild(portletShadow);
            portletShadow = null;
        }

        //////////////////////////////////////////////////////////
 
        if (!has(className, com.sokolov.portal.Portlet.CSS_CLASS_DIALOG)) {
            dragObject.style.position = ''; // 'relative'; // Hot fix
            dragObject.style.top      = 0;
            dragObject.style.left     = 0;
            dragObject.style.width = "auto";
            dragObject.style.cursor = "auto";
        }

        opacity(dragObject, 100);
        $(dragObject.id + com.sokolov.portal.Portlet.ID_HEADER).style.cursor = "default";

        if (iframe && isIE) {
            var header = $(dragObject.id + com.sokolov.portal.Portlet.ID_HEADER);
            //var content = $(dragObject.id + com.sokolov.portal.Portlet.ID_CONTENT);
            //iframe.style.width = content.offsetWidth;
            iframe.style.width = header.offsetWidth;
        }

	 
        dragObject   = null; 

    }
}

/**
 * Refresh the region.
 *
 * @param id {integer} identificator
 * @return {void}
 */
function refreshRegion(id) {
    var portletRegion = portal.getPortletRegionById(id);
    if (portletRegion) {
        portletRegion.refresh();
    }
}

