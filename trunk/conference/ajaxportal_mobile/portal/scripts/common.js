///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.3 Alpha4 (28 Jan 2011)                            //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is a library with common functions. 
 *
 * @author Sergei Sokolov s-sokolov@tut.by
 * @version 1.0.3
 */

/** Holds flag is it Enternet Eplorer browser. */
var isIE = (navigator.appName=="Microsoft Internet Explorer");

/**
 * Gets element by id.
 *
 * @param {string} id an element identificator
 * @returns {element} the element 
 */
function $(id) {
   return document.getElementById(id);
}

/**
 * Changes element vissibility (hide the element if it's vissible and show the element if it's hidden).
 *
 * @param {string} id an element identificator
 * @returns {void}
 */
function changeContentVisibility(id) {
    var obj = $(id);
    if (obj) {
        if (obj.style.display == "" || obj.style.display == "block") {
            obj.style.display = "none";
        } else {    
            obj.style.display = "block";
        }
    }
}

/**
 * Shows the element.
 *
 * @param {string} id an element identificator
 * @returns {void}
 */
function show(id) {
    var obj = $(id);
    if (obj) {
        obj.style.display = "block";
    }
}

/**
 * Hides the element.
 *
 * @param {string} id an element identificator
 * @returns {void}
 */
function hide(id) {
    var obj = $(id);
    if (obj) {
        obj.style.display = "none";
    }
}

/**
 * Debugs.
 *
 * @param {error} e an error
 * @returns {void}
 */
function debug(e) { 

}

/**
 * Shows the element and hides other from the array of ids.
 *
 * @param {string} id an element identificator
 * @param {array} array of element ids
 * @param {string} suffix of element identificator
 * @returns {void}
 */
function hideOther(id, ids, suffix) {
    for (var i = 0; i < ids.length; i++) {
        if (id == ids[i]) {
            show(ids[i] + suffix);
        } else {
            hide(ids[i] + suffix);
        }
    }
}

/**
 * Shows all element from array.
 *
 * @param {array} array of element ids
 * @param {string} suffix of element identificator
 * @returns {void}
 */
function display(ids, suffix) {
    for (var i = 0; i < ids.length; i++) {
        show(ids[i] + suffix);
    }
}

/**
 * Delete substring from the the string.
 *
 * @param {string} string
 * @param {string} substring
 * @returns {string} result string
 */
function remove(string, subString) {
    if (string) {
        if (string == subString) {
            return "";
        } else if ((string.indexOf(subString + " ") == 0)) {
            return string.substring((subString + " ").length);
        } else if ((string.indexOf(" " + subString + " ") != -1)) {
            return string.substring(0, string.indexOf(" " + subString + " ")) 
                  + string.substring(string.indexOf(" " + subString + " ") + (" " + subString + " ").length - 1);
        } else if ((string.indexOf(" " + subString) != -1) && (string.indexOf(" " + subString) == string.length - subString.length - 1)) {
            return string.substring(0, string.indexOf(" " + subString));
        }
        return string;
    }
    return "";
               
}


/**
 * Checks has the substring in the string.
 *
 * @param {string} string
 * @param {string} substring
 * @returns {boolean} true if the string has the substring
 */
function has(string, substring) {
    return (string) && (
               (string == substring)
               ||  (string.indexOf(" " + substring + " ") != -1)
               || (string.indexOf(substring + " ") == 0)
               || ((string.indexOf(" " + substring) != -1) && (string.indexOf(" " + substring) == string.length - substring.length - 1))
           );
}

/**
 * Execute event function on page onLoad event.
 *
 * @param {element} obj an element
 * @param {eventFunction} an event function
 * @returns {void}
 */
function executeOnLoad(obj, eventFunction){ 
   if (obj.addEventListener){ 
       obj.addEventListener("load", eventFunction, false); 
       return true; 
   } else if (obj.attachEvent){ 
       var r = obj.attachEvent("onload", eventFunction); 
       return r; 
   } else { 
       return false; 
   } 
}


/**
 * Stop event propagation.
 *
 * @param {array} parentArguments an array of parent function (function which call the function) arguments
 * @returns {void}
 */
function stopEventPropagation(parentArguments) {
    var e;
    if (parentArguments.length == 0) {
        e = window.event;
    } else {
        e = parentArguments[0];
    }

    e.cancelBubble = true; // for EI
    if (e.stopPropagation) { // for other browsers
      e.stopPropagation();
    }
}

/**
 * Deselect all selected text and blur focus from the element.
 *
 * @param {element} obj an element
 * @returns {void}
 */
function deselectAndBlur(obj) {
    obj.selectionStart = obj.selectionEnd;
    //obj.onkeyup = false; // TODO: check

    if (document.selection) {
        document.selection.empty();
        obj.blur();

    } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}

/**
 * Get mouse coordinates.
 *
 * @param {event} ev event
 * @returns {object} coordinate structure
 */
function mouseCoords(ev){
    if (ev.pageX || ev.pageY) {
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x: (ev.clientX + document.body.scrollLeft - document.body.clientLeft),
        y: (ev.clientY + document.body.scrollTop  - document.body.clientTop)
    };
}

/**
 * Get mouse offset.
 *
 * @param {element} target target element
 * @param {event} ev event
 * @returns {object} coordinate structure
 */
function getMouseOffset(target, ev) {
    ev = ev || window.event;

    var docPos    = getPosition(target);
    var mousePos  = mouseCoords(ev);

    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

/**
 * Get position.
 *
 * @param {element} target target element
 * @returns {object} coordinate structure
 */
function getPosition(target) {
    var left = 0;
    var top = 0;

    while (target.offsetParent) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.offsetParent;
    }

    left += target.offsetLeft;
    top  += target.offsetTop;

    return {x:left, y:top};
}

/**
 * Set opacity for the element.
 *
 * @param {element} obj the element
 * @param {integer} value an opacity value
 * @return {void}
 */
function opacity(obj, value) {
    //-moz-opacity: 0.5; /* Mozilla 1.6 */              // TODO: implement
    //-khtml-opacity: 0.5; /* Konqueror 3.1+, Safari 1.1 */

    if (obj.style) {
        dragObject.style.opacity = value/100;
    }
    if (obj.filters) {
        dragObject.style.filter ="progid:DXImageTransform.Microsoft.Alpha(opacity=" + value + ")";
    }
}

/**
 * Get attribute value.
 *
 * @param {element} obj the element
 * @param {string} attributeName attribute name
 * @return {string}
 */
function getAttributeValue(obj, attributeName) {
    if (obj[attributeName]) {
        return obj[attributeName];
    }
    if (obj.attributes && obj.attributes.length && obj.attributes.length > 0) {
        var attribute = obj.attributes.getNamedItem(attributeName);
        if (attribute) {
            return attribute.value;
        }
    }
    return null;
}

/**
 * Set attribute value.
 *
 * @param {element} obj the element
 * @param {string} attributeName attribute name
 * @param {string} value a new value of the attribute
 * @return {void}
 */
function setAttributeValue(obj, attributeName, value) {
    if (obj) {
        obj[attributeName] = value;
        // for Mozilla
        var attr = document.createAttribute(attributeName);
        attr.nodeValue = value;
        if (obj.attributes) {
            if (getAttributeValue(obj, attributeName)) {
                try {
                    obj.attributes.removeNamedItem(attributeName); // the line is require for IE7
                } catch (e) { 
                    // TODO: fix issue
                }
            }
            if (value != null) {
                obj.attributes.setNamedItem(attr);
                obj[attributeName] = value;
            }
        }
    }
}

/** Holds counter for id attribute */
var generatedId = 1;

/**
 * Generate id.
 *
 * @return {string} generated id
 */
function generateId() {
    var num = new Number(generatedId);

    generatedId = generatedId + 1;
    return "obj" + num.toString();
}
