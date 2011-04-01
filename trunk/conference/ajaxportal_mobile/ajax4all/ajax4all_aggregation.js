///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Version 1.0.1 (15 Nov 2010)                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2010          //
///////////////////////////////////////////////////////////////////

    function getTagBody(text, tag) {
        var sText = text.toLowerCase();
        var startPos = sText.indexOf("<" + tag);
        if (startPos != -1) {
            var endPos = sText.indexOf(">", startPos);
            var finishPos = sText.indexOf("</" + tag + ">");
            return text.substring(endPos+1, finishPos);
        } 
        return text;
    }

    function getTagAndBodies(text, tag) {
        var array = [];
        var sText = text.toLowerCase();
        var closeTag = "</" + tag + ">";
        var startPos = 0;
        do {
            startPos = sText.indexOf("<" + tag, startPos);
            if (startPos != -1) {
                var endPos = sText.indexOf(">", startPos);
                var finishPos = sText.indexOf(closeTag, endPos);
                array[array.length] = text.substring(startPos, finishPos + closeTag.length);
                startPos = finishPos + closeTag.length;
            } 
        } while (startPos != -1);
        return array;
    }


    function getTagsBody(text, tag) {
        var array = [];
        var sText = text.toLowerCase();
        var closeTag = "</" + tag + ">";
        var startPos = 0;
        do {
            startPos = sText.indexOf("<" + tag, startPos);
            if (startPos != -1) {
                var endPos = sText.indexOf(">", startPos);
                var finishPos = sText.indexOf(closeTag, endPos);
                array[array.length] = text.substring(startPos, finishPos + closeTag.length);
                startPos = finishPos + closeTag.length;
            } 
        } while (startPos != -1);
        return array;
    }

    function getTags(text, tag) {
        var array = [];
        var sText = text.toLowerCase();
        var closePart = ">";   // TODO: modify "/>";
        var startPos = 0;
        do {
            startPos = sText.indexOf("<" + tag, startPos);
            if (startPos != -1) {
                var finishPos = sText.indexOf(closePart, startPos);
                array[array.length] = text.substring(startPos, finishPos + closePart.length);
                startPos = finishPos + closePart.length;
            } 
        } while (startPos != -1);
        return array;
    }

    function getAttribute(text, attr) {
        var array = [];
        var sText = text.toLowerCase();
        var posAttrName = sText.indexOf(attr);
        if (posAttrName != -1) {
            var equalPos = sText.indexOf("=", posAttrName);
            if (equalPos != -1) {
                var singleQuot = sText.indexOf('"', equalPos);
                if (singleQuot != -1) {
                    var singleQuotSecond = sText.indexOf('"', singleQuot+1);
                    return text.substring(singleQuot + 1, singleQuotSecond);
                } else {
                    var doubleQuot = sText.indexOf("'", equalPos);
                    if (doubleQuot != -1) {
                        var doubleQuotSecond = sText.indexOf("'", doubleQuot+1);
                        return text.substring(doubleQuot + 1, doubleQuotSecond);
                    }
                }
            }
        } 
        return "";
    }

    function getTitle(text) {
        return getTagBody(text, "title");
    }

    function getHead(text) {
        return getTagBody(text, "head");
    }

    function getBody(text) {
        return getTagBody(text, "body");
    }

    function getScriptBody(text) {
        return getTagBody(text, "script");
    }

    function getScripts(text) {
        //return getTagsBody(text, "script");
        return getTagAndBodies(text, "script");
    }

    function getStyleBody(text) {
        return getTagBody(text, "style");
    }

    function getStyles(text) {
        return getTagsBody(text, "style");
    }

    function getLinks(text) {
        return getTags(text, "link");
    }

    function getMetas(text) {
        return getTags(text, "meta");
    }

    //////////////////////////////////////////////////////////////////

    function isFinishOn(str, suffix) {
        var suffixPos = str.lastIndexOf(suffix);
        if ((suffixPos != -1) && (suffixPos+suffix.length == str.length)) {
            return true;
        }
        return false;
    }


    function removeDots(_str) {
        var str = _str;
        while (str.indexOf("../") != -1) {
            var pos1 = str.indexOf("/../");
            var pos2 = str.substr(0,pos1-1).lastIndexOf("/");
            str = str.substr(0,pos2) + str.substr(pos1+3,str.length-1);
        }
        return str;
    }

    function removeFileNameAndQueryString(_str) {
        var str = _str;
        if (_str.indexOf("?") != -1) {
             str = _str.substr(0, _str.indexOf("?"));
        }
//alert("1str = " + str);
        if (str.indexOf(";jsessionid") != -1) {
             str = str.substr(0, defaultPath.indexOf(";jsessionid"));
        }
//alert("2str = " + str);
        str = removeDots(str);
//alert("3str = " + str);
        // .xhtml .jsp .asp .aspx .pl .php
        var slashPos = str.lastIndexOf("/");
//alert("3slashPos = " + slashPos);
        if (isFinishOn(str, ".html")
            || isFinishOn(str, ".xhtml")
            || isFinishOn(str, ".do")
            || isFinishOn(str, ".jsp")
            || isFinishOn(str, ".jsf")
            || isFinishOn(str, ".asp")
            || isFinishOn(str, ".aspx")
            || isFinishOn(str, ".pl")
            || isFinishOn(str, ".php") ) {
//alert("4str = " + str.substr(0, slashPos+1));
            return str.substr(0, slashPos+1);
        } else {
            if (str.charAt(str.length-1) != "/") {
//alert("5str = " + str + "/");
                return str + "/";
            }
        }
        return str;
    }


    function aggregateContent(request, target, _defaultPath) {

        var defaultPath = removeFileNameAndQueryString(_defaultPath);
        var basePath = removeFileNameAndQueryString(document.URL); // TODO: check
//alert(_defaultPath + "\n" + defaultPath + "\n" + basePath);

        var obj = document.getElementById(target);
        if (obj) {
            var headBody = getHead(request.responseText);

            // <META HTTP-EQUIV="Refresh" CONTENT="0;URL=Welcome.do">
            // meta refresh 
            var metas = getMetas(headBody);
            for (var i = 0; i < metas.length; i++) {
                var httpEquiv = getAttribute(metas[i], "http-equiv");  // TODO: implement timer
                if (httpEquiv.toLowerCase() == "refresh") {
                    var content = getAttribute(metas[i], "content");
                    if ((content) && (content.length)) {
                        var equalPos = content.indexOf("=");
                        if (equalPos != -1) { 
                            var url = content.substr(equalPos+1, content.length-1);
                            url = correctUrl(url, defaultPath);
                            ajaxCall(url, null, null, "", target)
                            return;   
                        }
                    }   
                }
            }

            var bodyBody = getBody(request.responseText);



            var head = document.getElementById("head");

            // CSS Style Links
            var styleLinks = getLinks(headBody);
            for (var i = 0; i < styleLinks.length; i++) {
                var styleType = getAttribute(styleLinks[i], "type");
                if ((styleType) && (styleType.toLowerCase()) == "text/css") {
                    var styleHref = getAttribute(styleLinks[i], "href");
                    if (styleHref) {
                       styleHref = correctUrl(styleHref, defaultPath);

                       var style = document.createElement("link");
                       style.setAttribute("rel", "stylesheet");
                       style.setAttribute("type", "text/css");
                       style.setAttribute("href", styleHref);
                       head.appendChild(style);
                    } 
                }
            }

            // CSS Styles
            var styles = getStyles(headBody);
            for (var i = 0; i < styles.length; i++) {
                var style = document.createElement("style");
                style.setAttribute("type", "text/css");
                var styleText = getStyleBody(styles[i]);

                var as123 = "";
                for(j in style) {
                    //as123 += (j + " = " + style[j] + "\n");
                    try {
                        //style[j] = styleText;
                        //alert(j);
                    } catch (e) {
                    }    
                }
                //alert(as123);

                try {  // for IE
                    //style.innerHTML = styleText;
                    var styleTextObj = document.createTextNode(styleText);
                    style.appendChild(styleTextObj);
                } catch (e) {
                
                } 

                head.appendChild(style);
            }

            // Scripts
            var scripts = getScripts(bodyBody);
            var scripts2 = getScripts(headBody);
            //var scripts = getScriptBody(bodyBody);
            //var scripts2 = getScriptBody(headBody);



/*
            if (scripts2.length > 0) {
                scripts.concat(scripts2)
            }
*/          
            for (var i = 0; i < scripts2.length; i++) {
                scripts[scripts.length] = scripts2[i];
            }

            for (var i = 0; i < scripts.length; i++) {
                var script = document.createElement('script');
                var scriptType = getAttribute(scripts[i], "type");
                if (scriptType) {
                    script.setAttribute("type", scriptType);
                }
                var scriptLanguage = getAttribute(scripts[i], "language");
                if (scriptLanguage) {
                    script.setAttribute("language", scriptLanguage);
                } 

                var src = getAttribute(scripts[i], "src");
                if (src) {
                    src = correctUrl(src, defaultPath);
                    script.setAttribute("src", src);
                } else {
                    var scriptText = getScriptBody(scripts[i]);
                    script.text = scriptText;
                }

                head.appendChild(script);
            }

            //document.title = getTitle(headBody);  

            obj.innerHTML = bodyBody; 

            scanAllForms();

            correctPathes(document.getElementById(target), defaultPath, basePath);
            var aaa = getTags(request.responseText, "body")
            var onload = getAttribute(aaa[0], "onload")
            //alert(onload);
            eval(onload);

        }
    }


    function correctPathes(obj, defaultPath, basePath) {
        var children = obj.childNodes;
        for (var i = 0; i < children.length; i++) {
            var tagName = children[i].tagName;
            if ((tagName) && (tagName.length)) {
                tagName = tagName.toLowerCase();
            } 

            if (tagName == "a") {
                correctLinkHref(children[i], defaultPath, basePath);
            } else if (tagName == "img") {
                correctImageSrc(children[i], defaultPath, basePath);
            } else if (tagName == "form") {
                correctFormAction(children[i], defaultPath, basePath); 
                processControlsForAjaxSubmit(children[i]);
            } else if (tagName == "area") {
                correctLinkHref(children[i], defaultPath, basePath);
                //correctAreaHref(children[i], defaultPath, basePath);
            }
            correctPathes(children[i], defaultPath, basePath);
        }
    }

    function correctUrl (url, defaultPath, basePath) {
        if (url.charAt(0) == "/") { 
            var sPos = url.indexOf("/", 1);
            return removeDots(defaultPath + url.substring(sPos+1, url.length));
        } else if ((url.charAt(0) == ".") && (url.charAt(1) == "/")) { 
            return removeDots(defaultPath + url.substr(2, url.length-1));
        } else if (url.indexOf("http") == -1) {
            return removeDots(defaultPath + url);
        }
        // if the url has "http"
        if (url.indexOf(basePath) != -1) {
            return removeDots(defaultPath + url.substr(basePath.length, url.length-1));
        } 
        return url;
    }

    function correctFormAction(form, defaultPath, basePath) {
        var action = form.getAttribute("action");
        if (action) {
            form.action = correctUrl(action, defaultPath, basePath);
        } 
    }

    function correctImageSrc(image, defaultPath, basePath) {
        var imageSrc = image.getAttribute("src"); //image.src
        if (imageSrc) {
            image.src = correctUrl(imageSrc, defaultPath, basePath);
        } 

    }
/*
    function correctAreaHref(area, defaultPath, basePath) {
        var href = area.getAttribute("href");
        if ((href) && (href.indexOf("http") == -1)) {
            area.href = correctUrl(href, defaultPath, basePath);
        } 
    }
*/


    function correctLinkHref(link, defaultPath, basePath) {
        if ((link.href != "#") && (link.href.indexOf("javascript:ajaxCall")==-1)) {
            var linkHref = link.getAttribute("href");
            var originalLinkHref = linkHref;
            if ((linkHref) && (linkHref.indexOf("javascript:") == -1)) {
                linkHref = correctUrl(linkHref, defaultPath, basePath);
       
                if ((link.target != "_blank") && (link.target != "new")) {
                    if (!link.id) {
                        link.id = generateId();
                    }
                    link.href = "javascript:ajaxCall('" + linkHref + "', 'post', getCharset(), '', getTarget('" + link.id + "'));";
                    link.onmousemove = function () { /*alert(window.status +"\n"+ originalLinkHref);*/ window.status = originalLinkHref; }
                    link.linkHref = linkHref;
                }
            }
        }
    }


    function correctSpring2Path(path) {
        var linkHref = path;
        if ((linkHref) && (linkHref.charAt(0) == "/")) { // exception
            var sPos = linkHref.indexOf("/", 1);
            linkHref = defaultPath + linkHref.substr(sPos, linkHref.length-1);
        } else if ((linkHref) && (linkHref.indexOf("http") == -1)) {
            linkHref = defaultPath + linkHref;
        } 
        return linkHref;
    }

