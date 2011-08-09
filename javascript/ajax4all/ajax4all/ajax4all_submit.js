///////////////////////////////////////////////////////////////////
// ajax4all library for AJAX Portal                              //
// Version 1.0.3 (12 Apr 2011)                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
///////////////////////////////////////////////////////////////////

    if (typeof HTMLFormElement != "undefined") {
        HTMLFormElement.prototype.submit = function executeSubmit() {
            if ((!this.onsubmit) || this.onsubmit(arguments)) {
                ajaxSubmit(this, getTarget(this));
            }
        }
        HTMLFormElement.prototype.suportedAjaxSubmit = true;
        HTMLFormElement.prototype.processControlsForAjaxSubmit = false;
    }

  
    function scanAllForms() {
        for (var i = 0; i < document.forms.length; i++) {
            processControlsForAjaxSubmit(document.forms[i]);
        }
    }

    function processControlsForAjaxSubmit(form) {
        if (!form.suportedAjaxSubmit) {
            try {
                form.submit = function executeSubmit() {
                    if ((!this.onsubmit) || this.onsubmit()) {
                        ajaxSubmit(this, getTarget(this));
                    }
                }
                form.suportedAjaxSubmit = true;
            } catch (e) {}
        }

        // change behaviour of submit buttons                       
        var elements = form.elements;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type == "submit") {
                //try {
                if (!isIE) {  
                //if (navigator.appName != 'Microsoft Internet Explorer') {
                    elements[i].type = "button";
                    //elements[i].setAttribute("type", "button") 
                    elements[i].onclick = function() {
                        this.form.submit();
                    }
                //} catch(e) {
                } else {
                    var button = document.createElement("input");
                    button.setAttribute("type", "button");
                    if (elements[i].id) {  
                        button.setAttribute("id", elements[i].id);
                    } 
                    if (elements[i].name) { 
                        button.setAttribute("name", elements[i].name);
                    }
                    if (elements[i].style.cssText) { 
                        button.setAttribute("style", elements[i].style.cssText);
                    }
                    if (elements[i].className) {   
                        button.setAttribute("class", elements[i].className);
                    }
                    button.setAttribute("value", elements[i].value);
                    button.setAttribute("onclick", function () { this.form.submit(); } );

                    var parentNode = elements[i].parentNode;
                    var oldSubmitButton = elements[i];    
                    parentNode.insertBefore(button, elements[i]);
                    parentNode.removeChild(oldSubmitButton);
                }
            }
        }
        form.processControlsForAjaxSubmit = true;
    }

    function getTarget(target) {
        var obj = (typeof target == "string")?$(target):target;
        while (!has(obj.className, "portletContent")) {

            obj = obj.parentNode;
        }
        return obj.id;
    }

    function getCharset(form) {
        if ((form) && (form.acceptCharset) && (form.acceptCharset.length > 0)) {
            return form.acceptCharset;
        } 
        return document.charset;
    }
