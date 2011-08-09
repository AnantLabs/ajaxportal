///////////////////////////////////////////////////////////////////
// ajax4all library for AJAX Portal                              //
// Version 1.0.3 (12 Apr 2011)                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
///////////////////////////////////////////////////////////////////


    if (typeof XMLHttpRequest == "undefined") {
        XMLHttpRequest = function () {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e1) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e2) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e3) {}
            try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e4) {}
            throw new Error("This browser does not support XMLHttpRequest.");
        };
    }

    function ajaxCall(url, method, charset, queryString, target) {
        try { 
            var request = false;
            request = new XMLHttpRequest();

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    aggregateContent(request, target, url);
                }
            };

            if ((method) && (method.toUpperCase) && (method.toUpperCase() == "GET")) {
                request.open("GET", url + "?" + queryString, true);
                request.send(null);
            } else {
                request.open("POST", url, true);
                request.setRequestHeader("Content-length", queryString.length);

                if ((charset) && (charset.length) && (charset.length > 0)) {
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=" + charset);
                } else { 
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }  

                request.setRequestHeader("Connection", "close");
                request.send(queryString);
            }
        } catch (e) {
            alert("Core: " + e.message + "url = " + url);
        } 
    }

    function ajaxSubmit(form, target) {
        function createParameter(_name, _value) {
            return {name:_name, value:_value};
        }

        function buildQueryString(params) {
            var queryString = "";
            for (var i = 0; i < params.length; i++) {
                queryString += ((queryString.length > 0)?"&":"") + params[i].name + "=" + escape(params[i].value);
            }
            return queryString;
        }


        var params = [];
        var elements = form.elements;
        // for (var element in elements)
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var type = element.type;
            if (type == 'text'
                || type == 'hidden' 
                || type == 'password'
                || (type == 'checkbox' && element.checked)
                || (type == 'radio' && element.checked)
                || type == 'textarea') {
                params[params.length] = createParameter(element.name, element.value);
            } else if (type == 'select-one') {
                if (element.options.length > 0 && element.selectedIndex >=0) {
                    params[params.length] = createParameter(element.name, element.options[element.selectedIndex].value);
                } 
            } else if (type == 'select-multiple') {
                if (element.multiple) {
                    for (var j = 0; j < element.options.length; j++) {
                        if (element.options[j].selected) {
                            params[params.length] = createParameter(element.name, element.options[j].value);     
                        }
                    }
                } else {
                    params[params.length] = createParameter(element.name, element.options[element.selectedIndex].value);
                }  
            }
/* TODO: check
            else if ((type == 'button') && (element.name) && (element.value)) {
                params[params.length] = createParameter(element.name, element.value);
            } 
*/
        }
        if ((!form.target) || (form.target == "") || (form.target == "_self") || (form.target == "_top") || (form.target == "_parent")) {
            // ajax call
            ajaxCall(form.action, form.method, getCharset(form), buildQueryString(params), target);
        } else if ((form.target == "_blank") || (form.target == "new")) {
            // open in a new window
            var url = form.action + "?" + buildQueryString(params);
            var win = window.open(url, url, 'menubar=yes,toolbar=yes,scrollbars=yes,status=yes');
            //win.moveTo(150, 200);
            //win.resizeTo(800, 600);
        } else {
            // load content in a iframe
            var url = form.action + "?" + buildQueryString(params);
            var frames = document.getElementsByName(form.target);
            var frame;
            if (frames.length > 0) {
                frame = frames[0];
            } else {
                frame = document.getElementById(form.target);
            }
            if (frame) {
                if (frame.tagName == "IFRAME") {
                    frame.src = url;
                } 
            }
        }
    }
