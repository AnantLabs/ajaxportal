# How to create static page #

This page describes how to develop a static HTML/XHTML page by **Decoration** module of Ajax Portal.

There're two ways how to use portlet:
  * Use classic approach - portlet is a window and the portal page defines the layout and positions of the portlets on the portal page.
  * Use region as container of the portlets. The regions divide the portal page by zone.  The regions provide layout for the portlets.

The main advantage of the region usage is **Drag&Drop** feature: the portlet can be move inside of current region (position of portlet in the current region) or in another region.

## 1. Portlets on the page ##

### 1.1. Portlet States and CSS Markers ###

The idea of usage CSS Markers is implementation of [State GoF pattern](http://en.wikipedia.org/wiki/State_pattern). The state of the portlet is set by **CSS Marker**. The HTML structure of the portlet is the same and is transformed by different CSS class.

The portlet states are defined by the following CSS markers:
  1. **portlet** - defines **NORMAL** state of the portlet,
  1. **portletNotActive** - defines **MINIMIZED** (the state of classic portal implementation) or **NOT ACTIVE** (the state is used for **TABS** and **ACCORDION** region states) state of the portlet,
  1. **portletHidden** - defines **NORMAL** state of the portlet,
  1. **portletMaximized** - not implemented.

### 1.2. Special Portlet CSS Markers ###

CSS markers are used by Ajax Portal kernel for providing additional opportunity(ies) to the portlet (possibility to move portlet, to change title, etc.).

The portlet supports the following special portlet CSS markers:
  1. **noheader** - hides portlet header,
  1. **draggable** - support **Drag&Drop** when the portlet is defined in a region,
  1. **iframe** - deletes padding of portlet content. The marker is used with **IFRAME** content of the portlet,
  1. **titleEditable** - allows to change the portlet title(temporary solution, should be changed),
  1. **noBehaviourButton** - disables the change of portlet state.

### 1.3. Attributes of DIV tag using for portlet parameter definition ###

The portlet states are defined by the following CSS markers:
  1. **id** - defines unique identifier of the portlet,
  1. **class** - contains the CSS markers and additional CSS styles for the portlet,
  1. **title** - portlet header title (the value is empty after portlet decoration),
  1. **url** - defines URL which contains the portlet content (the portlet content will be downloaded by Ajax call after portlet decoration),
  1. **help** - defines the HELP page for the portlet,
  1. **bodyHeight** - defines the fixed height of the portlet content.

### 1.4. Examples ###

The following example demonstrates a simple definition of the portlet, which will be decorated by JavaScript (static method **startOnLoad** of **Portal** object):
```
<div id="polygon1" class="portlet" title="Test">

</div>
```

This DIV tag will decorated during Ajax Portal start: the portlet will have header and content areas, icon, title and behavior buttons on the header. The all content in the DIV tag will be moved in the content area of the portlet.

The example defines:
  1. id of the portlet ("polygon1"),
  1. **NORMAL** state of the portlet ("portlet" is **CSS marker** of the **NORMAL** portlet state),
  1. the portlet title ("Test").

The following JavaScript files are required:
  1. **common.js** - defines common functions,
  1. **portlet.js** - defines **Portlet** JavaScript object,
  1. **ajax.js** - defines common functions which supports Ajax calls.

The **portal.js** (defines **Portal** JavaScript object) and **region.js** (defines **Region** JavaScript object) scripts are optional. **Portal** object has very helpful static method **startOnLoad**, which helps to fined and decorate portlets on the portal page.

The CSS file is required for portlet decoration. The name of file is defined by formula: **portal\_THEME.css**.

The portlet decoration started by call of the static method **startOnLoad** of **Portal** object.

You can see the full page of Portlet Demo below (the example uses **BLUE** theme for portlet decoration):
```
<html>
<head>
    <title>Portlet demo example</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" >

    <link type="text/css" rel="stylesheet" href="portal/styles/portlet_default.css">

    <script type="text/javascript" language="javascript" src="portal/scripts/common.js"></script>
    <script type="text/javascript" language="javascript" src="portal/scripts/portlet.js"></script>
    <script type="text/javascript" language="javascript" src="portal/scripts/region.js"></script>
    <script type="text/javascript" language="javascript" src="portal/scripts/portal.js"></script>
    <script type="text/javascript" language="javascript" src="portal/scripts/ajax.js"></script>

    <script type="text/javascript">
        com.sokolov.portal.Portal.startOnLoad(null);
    </script>
</head>
<body>
    <div id="portlet1" class="portlet" title="Test">
        Portlet content...
    </div>
</body>
<html>
```

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet.jpg'>
<blockquote>Picture 1. Screenshots of the example</blockquote>

<h3>1.5. Static HTML</h3>

The picture 1 demonstrates all HTML-code which generated instead of following portlet definition:<br>
<pre><code>&lt;div id="polygon1" class="portlet titleEditable" title="Content area 1" help="content/help_poligon1.html"&gt;<br>
<br>
&lt;/div&gt;<br>
</code></pre>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_example.jpg' alt='HTML code of portlet example'><br />
<blockquote>Picture 2. HTML code of portlet example.</blockquote>

<h3>1.6. Portlet Themes</h3>

The Ajax Portal supports the following themes for the portlet:<br>
<ul><li><b>default</b> theme<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_default.jpg' alt='Default portlet theme'><br />
<blockquote>Picture 3. Default portlet theme.</blockquote></blockquote></li></ul>

<ul><li><b>blue</b> theme<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_blue.jpg' alt='Blue portlet theme'><br />
<blockquote>Picture 4. Blue portlet theme.</blockquote></blockquote></li></ul>

<ul><li><b>green</b> theme<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_green.jpg' alt='Green portlet theme'><br />
<blockquote>Picture 5. Green portlet theme.</blockquote></blockquote></li></ul>

<ul><li><b>alternative1</b> theme (there're no portlet icon and title)<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_alternative1.jpg' alt='Alternative1 portlet theme'><br />
<blockquote>Picture 6. Alternative1 portlet theme.<br>
</blockquote></blockquote></li><li><b>alternative2</b> theme (<i>Portlet Content</i> follows after the portlet title)<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_alternative2.jpg' alt='Alternative2 portlet theme'><br />
<blockquote>Picture 7. Alternative2 portlet theme.<br>
</blockquote></blockquote></li><li><b>alternative3</b> theme<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_alternative3.jpg' alt='Alternative3 portlet theme'><br />
<blockquote>Picture 8. Alternative3 portlet theme.<br>
</blockquote></blockquote></li><li><b>apple</b> theme<br />
<blockquote><img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_apple.jpg' alt='Apple portlet theme'><br />
<blockquote>Picture 9. Apple theme.</blockquote></blockquote></li></ul>

<h2>2. Regions and Portlets</h2>

<h3>2.1. Region States and CSS Markers</h3>

The idea of usage CSS Markers is implementation of <a href='http://en.wikipedia.org/wiki/State_pattern'>State GoF pattern</a>. The state of the regions is set by <b>CSS Marker</b>. The HTML structure of the regions and its portlets is the same and is transformed by different CSS class.<br>
<br>
<i>Ajax portal</i> supports five states of <i>Region</i>s. Each region state provides a specific decoration for the <i>Region</i> and an additional decoration for the <i>Portlet_s in the</i>Region<i>.</i>

The portlet states are defined by the following CSS markers:<br>
<ol><li><b>nodecoration</b> view cancels all decorations of the portlets in the region.<br />
<blockquote><img src='http://sokolovbook.narod.ru/en/content/images/container_nodecoration.jpg'><br />
<blockquote>Picture 10. Nodecoration region state.<br>
</blockquote></blockquote></li><li><b>window</b> view represents the current region as window.<br>
<blockquote>The window has an icon and a title.<br>
All portlets have no decorations in the region.<br />
<img src='http://sokolovbook.narod.ru/en/content/images/container_window.jpg'><br />
<blockquote>Picture 11. Window region state.<br>
</blockquote></blockquote></li><li><b>standard</b> view is classic view of the portlet.<br>
<blockquote>Any portlet is decorated as small window with icon, title and behavior buttons.<br>
Set of buttons depends on the <b>Portlet View</b> (the buttons change the portlet state).<br />
<img src='http://sokolovbook.narod.ru/en/content/images/container_standard.jpg'><br />
<blockquote>Picture 12. Standard region state.<br>
</blockquote></blockquote></li><li><b>accordion</b> view is decorated portlets in the region as multiple panes (one pane for one portlet).<br>
<blockquote>Each pane has the same header as classic portlet view except for behavior buttons (see Standard state) and content.<br>
All headers are displayed vertically as horizontal bars.<br>
Only one pane can be selected at the same time.<br>
By default the first pane is active.<br>
Content of the pane is shown under the pane header.<br>
User can activate another pane by clicking on the corresponding header.<br />
<img src='http://sokolovbook.narod.ru/en/content/images/container_accordion.jpg'><br />
<blockquote>Picture 13. Accordion region state.<br>
</blockquote></blockquote></li><li><b>tabs</b> view represents portlets in the region as multiple tabs (one tab for one portlet).<br>
<blockquote>Each tab has a header and a content.<br>
Usually the header has an icon and a title.<br>
All headers are displayed horizontally above the content.<br>
Only one tab can be selected at the same time.<br>
By default the first tab is active.<br>
User can activate another tab by clicking on the corresponding header.<br />
<img src='http://sokolovbook.narod.ru/en/content/images/container_tabs.jpg'><br />
<blockquote>Picture 14. Tabs region state.</blockquote></blockquote></li></ol>

<h3>2.2. Required CSS styles</h3>

The following declarations of CSS files are required:<br>
<ol><li>region_nodecoration_common.css - defines region and portlets view if the region state is <b>NODECORATION</b>,<br>
</li><li>region_window_common.css - defines region and portlets view if the region state is <b>WINDOW</b>,<br>
</li><li>region_standard_common.css - defines region and portlets view if the region state is <b>STANDARD</b>,<br>
</li><li>region_accordion_common.css - defines region and portlets view if the region state is <b>ACCORDION</b>,<br>
</li><li>region_tabs_common.css - defines region and portlets view if the region state is <b>TABS</b>.</li></ol>

Example:<br>
<pre><code>&lt;link type="text/css" rel="stylesheet" href="portal/styles/region_nodecoration_common.css"&gt;<br>
&lt;link type="text/css" rel="stylesheet" href="portal/styles/region_window_common.css"&gt;<br>
&lt;link type="text/css" rel="stylesheet" href="portal/styles/region_standard_common.css"&gt;<br>
&lt;link type="text/css" rel="stylesheet" href="portal/styles/region_accordion_common.css"&gt;<br>
&lt;link type="text/css" rel="stylesheet" href="portal/styles/region_tabs_common.css"&gt;<br>
</code></pre>

<h3>2.3. Required scripts</h3>

The following JavaScript files are required:<br>
<ol><li><b>common.js</b> - defines common functions<br>
</li><li><b>portlet.js</b> - defines <b>Portlet</b> JavaScript object<br>
</li><li><b>region.js</b> - defines <b>Region</b> JavaScript object<br>
</li><li><b>portal.js</b> - defines <b>Portal</b> JavaScript object<br>
</li><li><b>ajax.js</b> - defines common functions which supports Ajax calls.</li></ol>

<h3>2.4. Example</h3>

The following example demonstrates two regions with portlets:<br>
<pre><code>&lt;html&gt;<br>
&lt;head&gt;<br>
    &lt;title&gt;Region demo example&lt;/title&gt;<br>
    &lt;meta http-equiv="Content-Type" content="text/html;charset=UTF-8" &gt;<br>
    <br>
    &lt;link type="text/css" rel="stylesheet" href="portal/styles/common.css"&gt;<br>
    &lt;link type="text/css" rel="stylesheet" href="portal/styles/region_nodecoration_common.css"&gt;<br>
    &lt;link type="text/css" rel="stylesheet" href="portal/styles/region_window_common.css"&gt;<br>
    &lt;link type="text/css" rel="stylesheet" href="portal/styles/region_standard_common.css"&gt;<br>
    &lt;link type="text/css" rel="stylesheet" href="portal/styles/region_accordion_common.css"&gt;<br>
    &lt;link type="text/css" rel="stylesheet" href="portal/styles/region_tabs_common.css"&gt;<br>
<br>
    &lt;link id="portletWindow" type="text/css" rel="stylesheet" href="portal/styles/region_window_default.css"&gt;<br>
    &lt;link id="portletStandard" type="text/css" rel="stylesheet" href="portal/styles/region_standard_default.css"&gt;<br>
    &lt;link id="portletAccordion" type="text/css" rel="stylesheet" href="portal/styles/region_accordion_default.css"&gt;<br>
    &lt;link id="portletTabs" type="text/css" rel="stylesheet" href="portal/styles/region_tabs_default.css"&gt;<br>
<br>
    &lt;script type="text/javascript" language="javascript" src="portal/scripts/common.js"&gt;&lt;/script&gt;<br>
    &lt;script type="text/javascript" language="javascript" src="portal/scripts/portlet.js"&gt;&lt;/script&gt;<br>
    &lt;script type="text/javascript" language="javascript" src="portal/scripts/region.js"&gt;&lt;/script&gt;<br>
    &lt;script type="text/javascript" language="javascript" src="portal/scripts/portal.js"&gt;&lt;/script&gt;<br>
    &lt;script type="text/javascript" language="javascript" src="portal/scripts/ajax.js"&gt;&lt;/script&gt;<br>
<br>
    &lt;script type="text/javascript" language="javascript" src="portal/scripts/drag.js"&gt;&lt;/script&gt;<br>
<br>
    &lt;script type="text/javascript"&gt;<br>
        function startPortalEvent() {<br>
            //alert("Hello, Ajax Portal!!!");<br>
            com.sokolov.portal.Portal._supportDragAndDrop();<br>
        }<br>
        com.sokolov.portal.Portal.startOnLoad(startPortalEvent);<br>
    &lt;/script&gt;<br>
&lt;/head&gt;<br>
&lt;body&gt;<br>
    &lt;table style="width: 100%;"&gt;<br>
    &lt;tr&gt;&lt;td id="left" class="standard dropTarget" title="Window1" <br>
            style="width: 50%; vertical-align: top; background-color: #DDD;"&gt;<br>
<br>
        &lt;div id="polygon1" class="portlet noheader" title=""&gt;<br>
            Portlet1, content (no header)<br>
        &lt;/div&gt;<br>
        &lt;div id="polygon2" class="portlet titleEditable" title="Portlet2" <br>
             help="content/help_poligon2.html"&gt;<br>
            Portlet2, content (titleEditable)<br>
        &lt;/div&gt;<br>
        &lt;div id="polygon3" class="portlet draggable" title="Portlet3"&gt;<br>
            Portlet3, content (draggable)<br>
        &lt;/div&gt;<br>
<br>
        &lt;div id="polygon4" class="portlet titleEditable draggable" title="Portlet4" <br>
            url="content/content_poligon4.html"&gt;<br>
            Portlet4, content (set URL of content)<br>
        &lt;/div&gt;<br>
<br>
    &lt;/td&gt;<br>
    &lt;td id="right" class="standard dropTarget" title="Window2" <br>
          style="width: 50%; vertical-align: top; background-color: #DDD;"&gt;<br>
<br>
        &lt;div id="polygon5" class="portlet draggable iframe" title="Portlet5: IFrame" <br>
            url="content/help_poligon5.html" bodyHeight="100px"&gt;<br>
            Portlet5, content (iframe)<br>
        &lt;/div&gt;<br>
<br>
     &lt;/td&gt;&lt;/tr&gt;<br>
     &lt;/table&gt;<br>
&lt;/body&gt;<br>
&lt;/html&gt;<br>
</code></pre>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/region.jpg'>
<blockquote>Picture 15. Screenshots of the example</blockquote>

<h3>2.5. Region Themes</h3>

The Ajax Portal supports the following themes for the region:<br>
<ul><li><b>default</b> theme (see <b>left</b> column of the picture below),<br>
</li><li><b>blue</b> theme (see left <b>middle</b> of the picture below),<br>
</li><li><b>silver</b> theme (see <b>right</b> column of the picture below).</li></ul>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/region_3themes.jpg' alt='Region themes'><br />
<blockquote>Picture 16. <b>default</b>, <b>blue</b> and <b>silver</b> region themes for <b>window</b>, <b>standard</b>, <b>accordion</b> and <b>tabs</b> region states.</blockquote>


<h2>3. ajax4all scripts</h2>

Read about ajax4all library in <a href='http://code.google.com/p/ajaxportal/wiki/How_works_JavaScript_API'>How works JavaScript API</a> page.