///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.4 Beta1 (28 Nov 2011)                             //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is to be used in AJAX Portal. 
 *
 * @author Sergei Sokolov ssokolov@ajaxportal.org
 * @version 1.0.4
 */

/**
 * Show edited portlet.
 *
 * @param {string} portlet id
 * @return {void}
 */
function showEditPortlet(id) {
    var portlet = portal.getPortletById(id);
    if (portlet) {

        $("pId").value = portlet.getId();
        $("pTitle").value = portlet.getTitle();
        setSelectedItem("portletState", portlet.getState());
        $("portletMove").checked = portlet.isDraggable();
        $("portletEdit").checked = portlet.hasEditButton();
        $("portletHelp").checked = portlet.hasHelpButton();
        $("pHelpUrl").value = portlet.getHelpUrl();
        $("pUrl").value = portlet.getUrl();

        $("portletSave").disabled = false;
        $("portletCancel").disabled = false;
    }
}

/**
 * Save edited portlet.
 *
 * @param {string} portlet id
 * @return {void}
 */
function saveEditPortlet(id) {
    var portlet = portal.getPortletById(id);
    if (portlet) {
        portlet.setTitle($("pTitle").value);
        portlet.setState(getSelectedItem("portletState"));
        portlet.setDraggable($("portletMove").checked);
        portlet.setEditButton($("portletEdit").checked);
        portlet.setHelpButton($("portletHelp").checked);
        portlet.setHelpUrl($("pHelpUrl").value);

        portlet.setUrl($("pUrl").value);
    }
}

/**
 * Show portlet content.
 *
 * @param {string} portlet id
 * @return {void}
 */
function showPotletContent(id) {
    var portlet = portal.getPortletById(id);
    if (portlet) {
        $("portletContent").value = portlet.getHtmlContent();
    }
}

/**
 * Set portlet content.
 *
 * @param {string} portlet id
 * @return {void}
 */
function setPotletContent(id) {
    var portlet = portal.getPortletById(id);
    if (portlet) {
        var content = $("portletContent").value;
        portlet.setHtmlContent(content);
    }
}

/**
 * Show content editor for the portlet.
 *
 * @return {void}
 */
function openContentEditor() {
   show("tr1");
}

/**
 * Hide content editor for the portlet.
 *
 * @return {void}
 */
function closeContentEditor() {
   hide("tr1");
}

/**
 * Show Edit dialog.
 *
 * @param {string} portlet id
 * @return {void}
 */
function showEditDialog(id) {

    var obj = $("portletEditDialog");
    if (obj) {
        return;
    }

    var div = document.createElement("DIV");
    div.id = "portletEditDialog";
    document.body.insertBefore(div, document.body.firstChild)

    var html = 

    "<form name='frm' style='margin:0;padding:0;'>"+
    "<table class='layout' style='width: 400px;'>"+
    "<tr><td>"+
    "<table class='layout' style='width: 100%;'>"+ 

    // portlet id
    "<tr><td class='caption' style='width: 120px;'>Id:</td><td colspan='2'><input id='pId' name='pId' class='editbox' value='' disabled='disabled'></td></tr>"+

    // portlet title
    "<tr><td class='caption' style='width: 120px;'>Title:</td><td colspan='2'><input id='pTitle' name='pTitle' class='editbox' value=''></td></tr>"+

    // portlet state
    "<tr><td>State:</td><td colspan='2'><select id='portletState' name='portletState' style='width: 150px;'>"+
    "<option name='state0' value='"+ com.sokolov.portal.Portlet.STATE_MINIMIZED +"'>Minimazed</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Portlet.STATE_NORMAL +"'>Normal</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Portlet.STATE_HIDDEN +"'>Hidden</option>"+
    "</select></td></tr>"+


    "<tr><td>Content URL:</td><td colspan='2'><input id='pUrl' name='pUrl' class='editbox' value=''></td></tr>"+

    // portlet Drag&Drop
    "<tr><td>&nbsp;</td><td colspan='2'><input id='portletMove' name='portletMove' type='checkbox' value='move'>Support Drag&Drop</td></tr>"+
    // portlet edit
    "<tr><td>&nbsp;</td><td colspan='2'><input id='portletEdit' name='portletEdit' type='checkbox' value='edit'>Has Edit page</td></tr>"+
    // portlet help
    "<tr><td>&nbsp;</td><td colspan='2'><input id='portletHelp' name='portletHelp' type='checkbox' value='help'>Has Help page</td></tr>"+
    "<tr><td>Help page URL:</td><td colspan='2'><input id='pHelpUrl' name='pHelpUrl' class='editbox' value=''></td></tr>"+
    "<tr><td colspan='3'><hr></td></tr>"+
    "<tr><td>&nbsp;</td><td><input id='portletSave' name='portletSave' type='button' value='Save' onclick='saveEditPortlet(\""+id+"\");closeEditDialog();'>"+
    "<input id='portletCancel' name='portletCancel' type='button' value='Cancel' onclick='closeEditDialog();'>"+
    "<input id='portletApply' name='portletApply' type='button' value='Apply' onclick='saveEditPortlet(\""+id+"\");'></td>"+
    "<td align='right'><input id='portletDetails' name='portletDetails' type='button' value='Details' onclick='openContentEditor();'></td></tr>"+
    "</table>"+

    "</td></tr>"+

    "<tr id='tr1' style='display: none;'><td><hr>Portlet Content:<br>"+
    "<textarea id='portletContent' cols='50' rows='7' style='width: 100%;'></textarea>"+
    "<div align='right'><input id='saveContent' name='saveContent' type='button' value='Set Content' onclick='setPotletContent(\""+id+"\");'>"
                                             + "<input id='saveContent' name='saveContent' type='button' value='Close Details' onclick='closeContentEditor();'></div></td></tr>"+


    "</table>"+

    "</form>";


    /***********************************************************************************************************/


    obj = $("portletEditDialog");

    obj.className='portlet dialog noBehaviourButton';
    //obj.setAttribute("class", "portlet dialog noBehaviourButton");
    obj.title='Portlet configuration';
    //obj.cssText='margin: 0;';

    obj.innerHTML = html;

    if (isIE) {
        //obj.setAttribute("style", "position: absolute; margin: 0; z-index: 2000000000; display: block; top: 110px; left: 150px; background: white; border: 1px silver solid;");
        obj.style.display = "block";
        obj.style.zIndex = 2000000000;
        obj.style.position = "absolute";
        obj.style.top = "110px";
        obj.style.left = "150px";
        obj.style.background = "#DDDDDD";
        obj.style.border = "1px silver solid";
    } else {
        obj.setAttribute("style", "position: fixed; margin: 0; z-index: 2000000000; display: block; top: 110px; left: 150px; background: white; border: 1px silver solid;");
    }

    var portlet2 = $("portletEditDialog");
    com.sokolov.portal.Portlet.decorateContentArea(portlet2.id, portlet2.title, portlet2.iconUri);

    showEditPortlet(id);
    showPotletContent(id);

    definedAsDraggable($("portletEditDialog"));
}

/**
 * Close Edit dialog.
 *
 * @return {void}
 */
function closeEditDialog() {
    var obj = $("portletEditDialog");
    document.body.removeChild(obj);
}