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


function getSelectedItem(selectId) {
    var regionCombobox = $(selectId);
    for (var i = 0; i < regionCombobox.options.length; i++) {
        if (regionCombobox.options[i].selected) {
            return i;
        }
    }
    return null;
}


function setSelectedItem(selectId, index) {
    var select = $(selectId);
    for (var i = 0; i < select.options.length; i++) {
        select.options[i].selected = false;
    }
    if ((select.options.length-1) >= index) {
        select.options[index].selected = true;
    }

}

function setSelectedItemByValue(selectId, value) {
    var select = $(selectId);
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == value) {
            select.options[i].selected = true;
        } else {
            select.options[i].selected = false;
        } 
    }
}

/**
 * Get/Find portlet region by id.
 *
 * @returns an instance of the portlet region
 */
function isDropTarget(id) {
    for (var i = 0; i < dropTargets.length; i++) {
        if (dropTargets[i].id == id) {
            return true;
        }
    }
    return false;
}


function showPortlet() {
    var portletCombobox = $("portlets");
    for (var i = 0; i < portletCombobox.options.length; i++) {
        if (portletCombobox.options[i].selected) {
            var id = portletCombobox.options[i].value;

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
    }
    if (portletCombobox.options.length == 0) { cleanPortlet(); }
}

function savePortlet() {
    // validation
    if ($("portletHelp").checked && ($("pHelpUrl").value.length == 0)) {
        alert("The Help page URL cannot be empty!!!");  
    }

    // processing
    var portletCombobox = $("portlets");
    for (var i = 0; i < portletCombobox.options.length; i++) {
        if (portletCombobox.options[i].selected) {
            var id = portletCombobox.options[i].value;

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
    }
    if (portletCombobox.options.length == 0) { cleanPortlet(); }
}



function cleanPortlet() {
    $("pId").value = "";
    $("pTitle").value = "";
    setSelectedItem("portletState", 0);
    $("portletMove").checked = false;
    $("portletEdit").checked = false;
    $("portletHelp").checked = false;
    $("pHelpUrl").value = "";
    $("pUrl").value = "";

    $("portletSave").disabled = true;
    $("portletCancel").disabled = true;
}

function newPortlet() {
    var regionCombobox = $("regions");
    for (var i = 0; i < regionCombobox.options.length; i++) {
        if (regionCombobox.options[i].selected) {
            var id = regionCombobox.options[i].value;
            var portletRegion = portal.getPortletRegionById(id);
            if (portletRegion) {

                var portletId = "portlet" + generateId();
                com.sokolov.portal.Portlet.createContentArea(portletId, portletRegion.getId());
                var portlet = new com.sokolov.portal.Portlet(portletId, "New", portletRegion.getId());
                portlet.init();
                portletRegion.portlets[portletRegion.portlets.length] = portlet;

                portletRegion.refresh();

                $("pId").value = portlet.getId();
                $("pTitle").value = portlet.getTitle();
                setSelectedItem("portletState", com.sokolov.portal.Portlet.STATE_NORMAL);
                $("portletMove").checked = false;
                $("portletEdit").checked = false;
                $("portletHelp").checked = false;
                $("portletSave").disabled = false;
                $("portletCancel").disabled = false;

                var portletCombobox = $("portlets");
                var option = document.createElement("OPTION");
                option.text = portlet.getTitle();
                option.value = portlet.getId();
                option.selected = true;
                portletCombobox.options.add(option); 

            }
        }
    }
}




function showRegion() {
    var regionCombobox = $("regions");
    for (var i = 0; i < regionCombobox.options.length; i++) {
        if (regionCombobox.options[i].selected) {
            var id = regionCombobox.options[i].value;
            var portletRegion = portal.getPortletRegionById(id);
            if (portletRegion) {

                $("cTitle").value = portletRegion.getTitle();
                setSelectedItem("regionState", portletRegion.getState());
                $("regionDropTagret").checked = isDropTarget(id);

                $("regionSave").disabled = false;
                $("regionCancel").disabled = false;

                var portletCombobox = $("portlets");
                portletCombobox.options.length = 0; 

                portletRegion.refresh();
                var portlets = portletRegion.portlets;
                for (var j = 0; j < portlets.length; j++) {
                    var option = document.createElement("OPTION");
                    option.text = portlets[j].getTitle() +" ("+ portlets[j].getId() +")";
                    option.value = portlets[j].getId();
                    if (j==0) { option.selected = true; }
 
                    portletCombobox.options.add(option); 
                }
                //   if (portletCombobox.options.length > 0) { portletCombobox.options[0].selected = true; }
                showPortlet(portletCombobox);

            }
        }
    }
    if (regionCombobox.options.length == 0) { cleanRegion(); }
}

function saveRegion() {
    var regionCombobox = $("regions");
    for (var i = 0; i < regionCombobox.options.length; i++) {
        if (regionCombobox.options[i].selected) {
            var id = regionCombobox.options[i].value;

            var portletRegion = portal.getPortletRegionById(id);
            if (portletRegion) {
                portletRegion.setTitle($("cTitle").value);
                portletRegion.setState(getSelectedItem("regionState"));
                //$("regionDropTagret").checked = isDropTarget(id);

            }
        }
    }
}


function cleanRegion() {
    $("cTitle").value = "";
    setSelectedItem("regionState", 0);
    $("regionDropTagret").checked = false;
    $("regionSave").disabled = true;
    $("regionCancel").disabled = true;
}















function showOptionsDialog() {

    var obj = $("portletWizard");
    if (obj) {
        return;
    }

    var div = document.createElement("DIV");
    div.id = "portletWizard";
    document.body.insertBefore(div, document.body.firstChild)

    var html = 
    //"<table class='main'>"+
    //"<tr><td>"+
    //"<div id='main' class='standard' title='' style='width: 100%;'>"+

    "<form name='frm' style='margin:0;padding:0;'>"+

    /***********************************************************************************************************/

    //"<div id='region' class='portlet noBehaviourButton' title='Configuration'>"+

    "<fieldset><legend>Regions</legend>"+

    "<table class='layout'>"+

    // region list
    "<tr><td rowspan='6'><select id='regions' name='regions' size='8' onchange='showRegion(this)' style='width: 300px;'>";

    for (var i = 0; i < portal.portletRegions.length; i++) {
        html += "<option name='opt"+ i +"' value='" + portal.portletRegions[i].id + "'>"+ portal.portletRegions[i].getTitle() +" ("+ portal.portletRegions[i].id +")</option>";
    }

    html += "</select>&nbsp;&nbsp;&nbsp;</td>"+

    // title
    "<td class='caption' style='width: 120px;'>Title:</td><td><input id='cTitle' class='editbox' name='cTitle' value=''></td></tr>"+

    // state
    "<tr><td>State:</td><td><select id='regionState' name='regionState' style='width: 150px;'>"+
    "<option name='state0' value='"+ com.sokolov.portal.Region.STATE_NODECORATION +"'>NoDecoration</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Region.STATE_WINDOW +"'>Window</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Region.STATE_STANDARD +"'>Standard</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Region.STATE_ACCORDION +"'>Accordion</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Region.STATE_TABS +"'>Tab pages</option>"+
    "</select></td></tr>"+

    // Drag&Drop
    "<tr><td>&nbsp;</td><td><input id='regionDropTagret' name='regionDropTagret' type='checkbox' value='' disabled='disabled'><span style='color: silver;'>Target for Drag&Drop</span></td></tr>"+

    "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>"+
    "<tr><td>&nbsp;</td></tr>"+

    "<tr><td>&nbsp;</td><td><input id='regionSave' name='regionSave' type='button' value='Save' onclick='saveRegion()'>"+
    "<input id='regionCancel' name='regionCancel' type='button' value='Cancel' onclick='showRegion()'></td></tr>"+

    "</table>"+

    "</fieldset>"+

    //"</div>"+

    /***********************************************************************************************************/

    //"<div id='portlet' class='portlet noBehaviourButton' title='Portlets'>"+

    "<fieldset><legend>Portlets</legend>"+

    "<table class='layout'>"+


    // portlet list
    "<tr><td rowspan='9'><select id='portlets' name='portlets' size='12' onchange='showPortlet(this)' style='width: 300px;'>"+
    "</select>&nbsp;&nbsp;&nbsp;<br>"+
    "<input id='portletNew' name='portletNew' type='button' value='New' onclick='newPortlet()'></td>"+


    // portlet id
    "<td class='caption' style='width: 120px;'>Id:</td><td colspan='2'><input id='pId' name='pId' class='editbox' value='' disabled='disabled'></td></tr>"+


    // portlet title
    "<tr><td class='caption' style='width: 120px;'>Title:</td><td><input id='pTitle' name='pTitle' class='editbox' value=''></td></tr>"+

    // portlet state
    "<tr><td>State:</td><td><select id='portletState' name='portletState' style='width: 150px;'>"+
    "<option name='state0' value='"+ com.sokolov.portal.Portlet.STATE_MINIMIZED +"'>Minimazed</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Portlet.STATE_NORMAL +"'>Normal</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Portlet.STATE_HIDDEN +"'>Hidden</option>"+
    "</select></td></tr>"+


    "<tr><td>Content URL:</td><td><input id='pUrl' name='pUrl' class='editbox' value=''></td></tr>"+

    // portlet Drag&Drop
    "<tr><td>&nbsp;</td><td><input id='portletMove' name='portletMove' type='checkbox' value='move'>Support Drag&Drop</td></tr>"+
    // portlet edit
    "<tr><td>&nbsp;</td><td><input id='portletEdit' name='portletEdit' type='checkbox' value='edit'>Has Edit page</td></tr>"+
    // portlet help
    "<tr><td>&nbsp;</td><td><input id='portletHelp' name='portletHelp' type='checkbox' value='help'>Has Help page</td></tr>"+
    "<tr><td>Help page URL:</td><td><input id='pHelpUrl' name='pHelpUrl' class='editbox' value=''></td></tr>"+

    "<tr><td>&nbsp;</td><td><input id='portletSave' name='portletSave' type='button' value='Save' onclick='savePortlet()'>"+
    "<input id='portletCancel' name='portletCancel' type='button' value='Cancel' onclick='showPortlet()'></td></tr>"+

    "</table>"+

    "</fieldset>"+

    


    /***********************************************************************************************************/

    "</td></tr>"+

    "<div align='right'><input type='button' value='Close' onclick='closeOptionsDialog();'></div>"+
    //var obj=$(\"wizard\"); obj.innerHTML=\"\"; obj.style.display=\"none\";

    "</table>"+

    "</form>";

    //"</div>";

    obj = $("portletWizard");
    obj.className='portlet dialog noBehaviourButton';
    obj.title='Configuration';
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
        obj.style.width = "650px";
    } else {
        obj.setAttribute("style", "position: fixed; margin: 0; z-index: 2000000000; display: block; top: 110px; left: 150px; background: white; border: 1px silver solid;");
    }

    var portlet2 = $("portletWizard");
    com.sokolov.portal.Portlet.decorateContentArea(portlet2.id, portlet2.title, portlet2.iconUri);

    definedAsDraggable($("portletWizard"));

    var regions = $("regions"); 
    if (regions.options.length > 0) {
        regions.options[0].selected = true;
    } 
    showRegion(obj);
}

function closeOptionsDialog() {
    var obj = $("portletWizard");
    document.body.removeChild(obj);
}
