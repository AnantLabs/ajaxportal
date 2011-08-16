///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.3 Alpha4 (28 Jan 2011)                            //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is a library with Ajax support consts and functions. 
 *
 * @author Sergei Sokolov ssokolov@ajaxportal.org
 * @version 1.0.3
 */


/** Provides the XMLHttpRequest class for IE */
if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function () {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e1) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e2) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e3) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e4) {}
        throw new Error("This browser does not support XMLHttpRequest.");
    };
}


/** Holds const of content downloading (Ajax pattern "Ajax Direct Call") */
var AJAX_DIRECT_CALL = 1;

/** Holds const of content downloading (Ajax pattern "Load IFrame Content") */
var LOAD_IFRAME_CONTENT = 2;

/** Holds method which is defined a mechanizm of content downloading */
var contentDownloadingMethod = AJAX_DIRECT_CALL;

/**
 * Inject http content in element of HTML document.
 *
 * @param {uri-string} uri
 * @param {string} id 
 * @return {void}
 */
function injectHttpContent(uri, id) {
    if (!id) return;
    //if (!$(id)) return; 

    if (contentDownloadingMethod == AJAX_DIRECT_CALL) {
        // implementation of Ajax Direct Call pattern
        try { 
            var request = false;
            request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                try {
                    if (request.readyState == 4 && request.status == 200) {
                        $(id).innerHTML = request.responseText;
                    }
                } catch (e) {
                }
            };
            request.open("GET", uri, true);
            request.send(null);
        } catch (e) {
            debug(e);
        }  
    } else {
        // implementation of Load IFrame Content pattern
        var obj = $(id);
        if (obj) {
            obj.style.cursor = "wait"; 
        }

        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", id + "IFrame");
        iframe.setAttribute("src", uri);
        iframe.setAttribute("height", "1");
        iframe.setAttribute("width", "1");
        iframe.setAttribute("frameborder", "0");
        executeOnLoad(iframe , function () { 
            var obj = $(id);
            var frame = $(id + 'IFrame');
            if (obj && frame) {
                try {
                    if (frame.contentWindow && frame.contentWindow.document) {
                        obj.style.cursor = "auto"; 
                        obj.innerHTML = frame.contentWindow.document.body.innerHTML;
                    }
                    obj.parentNode.removeChild(obj);
                } catch (e) {
                }
            }
        });
        document.body.appendChild(iframe);
    }
}













