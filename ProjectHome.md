# Ajax Portal #

**Ajax Portal supports Web Operating System (WebOS) development from Ajax Portal 2.0.0**

![http://ajaxportal.googlecode.com/svn/trunk/images/english.gif](http://ajaxportal.googlecode.com/svn/trunk/images/english.gif) Home site: http://ajaxportal.org

![http://ajaxportal.googlecode.com/svn/trunk/images/english.gif](http://ajaxportal.googlecode.com/svn/trunk/images/english.gif) Live Demo WebOS mode: http://webos.ajaxportal.org

**Ajax Portal** is a fast, small and feature-rich web-based development framework (library) to build cross-browser **User Interfaces** (UI) of **web sites** and **web applications** using standard web technologies such as **HTML5**, **CSS3**, and **JavaScript**. **Ajax Portal** also provides server side components for **Java** and **.NET** platforms to support personalization, base security and simple CMS (articles/posts, comments and likes) functionality. **Ajax Portal** is ideal way to create and support a software platform like **Web Operation System**/**Web desktop** (e.g. TBD) or **Enterprise Portal**/**Mashup** (e.g. iGoogle or NetVibes).

[http://ajaxportal.googlecode.com/svn/trunk/images/download\_release.jpg ](http://code.google.com/p/ajaxportal/downloads/detail?name=AjaxPortal-2.0.2-alpha3-25-Oct-2013.zip)

[AjaxPortal 2.0.2 Alpha3 (Oct 25, 2013)](http://code.google.com/p/ajaxportal/downloads/detail?name=AjaxPortal-2.0.2-alpha3-25-Oct-2013.zip)

**Generally:**<br>
- Supports architecture of Web Operation System\Web desktop and Enterprise Portal\Mashup<br>
- Uses mobile Web application as portlets<br>
- Supports Drag&Drop personalization<br>
- Can be used as simple CMS\WCM (articles/posts, comments and likes)<br>
- Supports themes<br>
- is based on Web 2.0/Web 3.0 features<br>
<br>
- UI JavaScript framework to create the rich applications<br>
- Cross-browser (supports all main browsers)<br>
- Support aggregation on server and client sides<br>
- Java and .NET server application for support of the personalization<br>
- Cross-platform (based on JavaScript, easy porting to any platform)<br>
<br>
<b>Special technical features:</b><br>
- dynamic content injection (see <a href='http://code.google.com/p/ajaxportal/wiki/How_works_JavaScript_API'>ajax4all library</a>)<br>
- possibility to transform JSR168/JSR286 portlets (see <a href='http://code.google.com/p/ajaxportal/wiki/Portlet_API'>Portlet API based on MicroServlet framework</a>)<br>
- theme viewer helps your disigner to define a new theme (see <a href='http://demo.ajaxportal.org/theme_viewer/styles/theme_viewer_default.html'>http://demo.ajaxportal.org/theme_viewer/styles/theme_viewer_default.html</a>)<br>
<br>

<b>Ajax Portal</b> builds a software platform, which aggregates contents of several web sites and web applications (including <b>mobile applications</b>) on the same <i>Portal Page</i>. <b>Ajax Portal</b> also provides additional behaviour, architectural and decoration features for ordinary web solutions:<br>
<br>
<img src='http://ajaxportal.org/en/content/images/structure.jpg' />

<b>Picture 1.</b> Portal Page in browser aggregates contents from different Internet/Intranet sites<br>
<br>
<br>
Now <b>End Customer</b> should not visit several sites to check: last news, new letters in your e-Mail box, number of your flight miles in your account and even the alerts about sales in your favorite shop. <b>It's very important for analysis of business and financial information, because it saves a time of decision-making.</b> Your may use a prepared selection (which is prepared before by you or another person(s)). As result you save the time because you should not do boring navigation and surfing and is able to see the most interested information for you. Enterprise Ajax Portal is compromise between conveniences, human laziness and modern software features.<br>
<br>
Of course, you have possibility to customize the portal page for your needs without software developer (it is the key feature). Ajax Portal makes the software user-friendly.<br>
<br>
If you use Enterprise Ajax Portal you save the TIME, MONEY and TRAFFIC on SERVER SIDE. Plus, you get modern features of Enterprise Portals and Web 2.0 solutions. Ooo, who tell you that it's Web 2.0 Portal? We think this is <b>Web 3.0 Portal</b>!<br>
<br>
<i><b>P.S. Enterprise Ajax Portal is your choice for Business and Life. This is solution for all people who has computer and uses it every day.</b></i>

Ajax Portal Team.<br>
<br>
<hr />

<h2>Getting Started</h2>

<h3>Static decoration (JavaScript framework)</h3>
A minimal code to decorate 3 portlets using Ajax Portal (Region View). Content of second portlet is injected using Ajax. All portlets can be moved using Drag&Drop inside of region:<br>
<pre><code>&lt;!DOCTYPE html&gt;<br>
&lt;html&gt;<br>
&lt;head&gt;<br>
    &lt;title&gt;Ajax Portal Demo - Region Mode&lt;/title&gt;<br>
    &lt;link type="text/css" rel="stylesheet" href="styles/portal-default.2.0.4.min.css"&gt;<br>
    &lt;script type="text/javascript" src="scripts/portal.2.0.4.min.js"&gt;&lt;/script&gt;<br>
    &lt;script type="text/javascript"&gt;<br>
        window.portal = new com.sokolov.portal.Portal();<br>
        window.portal.startOnLoad();<br>
    &lt;/script&gt;<br>
&lt;/head&gt;<br>
&lt;body&gt;<br>
    &lt;!-- Try to use "nodecoration" or "window" or "accordion" or "tabs" instead of "standard" --&gt;<br>
    &lt;div id="region1" title="Region 1" class="standard"&gt;<br>
        &lt;div id="portlet1" title="Portlet 1" class="portlet draggable editable deletable"&gt;Lorem ipsum.&lt;/div&gt;<br>
        &lt;div id="portlet2" title="Portlet 2" class="portlet draggable editable deletable" url="../content1.html"&gt;Dolor sit amet...&lt;/div&gt;<br>
        &lt;div id="portlet3" title="Portlet 3" class="portlet draggable editable deletable" help="../help1.html"&gt;Consectetur elit...&lt;/div&gt;<br>
    &lt;/div&gt;<br>
&lt;/body&gt;<br>
&lt;/html&gt;<br>
</code></pre>

<h3>Java server side (Portlet API based on MicroServlet)</h3>
Portlet API is MVC framework (request/responce model) and based on Web Oriented Approach (WOA). Portlet API is similar JSR168/286. Our implementation supports modes, forms and render JSPs using annotations:<br>
<pre><code>public class HelloWorldPortlet extends AbstractDispatchPortletServlet {<br>
<br>
    @RenderMode   // by default mode = PortletMode.VIEW<br>
    // @RenderMode (mode = PortletMode.EDIT)<br>
    @RenderForm (name = "frm1", clazz = DemoFormExample.class, scope = Scope.SESSION)<br>
    @RenderJsp (page = "/page/demo.jsp")<br>
    public void doView(RenderRequest renderRequest, RenderResponse renderResponse) throws PortletException, IOException {<br>
        DemoFormExample formExample = (DemoFormExample) RequestFormUtil.getRequestForm(renderRequest); // since 2.0.4<br>
        formExample.setParam1("Test");<br>
    }<br>
}<br>
</code></pre>

We also provides JSP tag library to support portlet decoration on the server side.<br>
<hr />

<h2>Where it can be used?</h2>

Too many people don't understand difference between <b>Enterprise Portal</b> (<a href='http://en.wikipedia.org/wiki/Enterprise_portal#Enterprise_Portal_Vendors'>see the term on wikipedia</a>) and <b>Web Portal</b> (<a href='http://en.wikipedia.org/wiki/Web_portal'>see the term on wikipedia</a>). It's not a problem. Only software developer is able to understand it. You as end customer have to know only that this approach saves <b>time of site development</b> and <b>as result money</b> for site/portal owners, IT companies and software developers.<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/product_segments.jpg' />

<b>Picture 2.</b> Product segments<br>
<br>
<b>Enterprise Ajax Portal</b> provides rich interactive interface, modern features like Drag&Drop, Ajax content update and absolutely new portal features like region states, browser page approach, universal layout and portlet orchestration.<br>
<br>
Who told you that you need any software development in Enterprise Portal? You can, but you should not. <b>Enterprise Ajax Portal</b> can be use by:<br>
<ul><li><b>the end customers</b> for integration of existing applications (without any changes of the applications and any software development),<br>
</li><li><b>the software developers</b> for implementation of new Web products and services.<br>
<b>Please, show this site to your IT manager or software developer in your company.</b></li></ul>

<i>You may to add yourself in our Google group <a href='http://groups.google.com/group/ajaxportal'>http://groups.google.com/group/ajaxportal</a>. As result you will receive month reports about our achievements, new releases and new available documentation.</i>

<h2>1.1. Ajax Portal For Software Developers</h2>

We extend existing enterprise solutions which are based on standard <b>JSR-168</b> and <b>JSR-286</b>. We don't use any bridges like <b>JSR-301</b> and <b>JSR-329</b> based. We use AJAX technology totally. It gives us a possibility to build easy and high performance portal solution which called <b>Enterprise Ajax Portal</b>. We evolve classic Enterprise Portal approach to <b>Web 2.0 solution</b> (Intranet 2.0).<br>
<br>
The <b>first main advantage</b> of our approach is <b>usage of standard Web applications</b> without changes as Portlets (Widgets). It saves your money for software development or even excludes this necessity. The <b>second advantage</b> is AJAX usage. Any portlet changes are doing <b>without reloading of portal page</b> (loading content, any actions in the portlet, etc.). It saves Internet traffic from/to portal server in several times.<br>
<br>
We support enterprise development by JSP and JSF tag libraries.<br>
<br>
Client side part of our product is written on JavaScript. It gives possibility to use it with Java, .NET, PHP, Perl, etc. solutions.<br>
<br>
We are going to propose a new JSR for Java community about Portal and Portlets of the new generation.<br>
<br>
<b>Just read about our product below and try to use it in your life.</b>

<i>You may to add yourself in our Google group <a href='http://groups.google.com/group/ajaxportal'>http://groups.google.com/group/ajaxportal</a>. As result you will receive month reports about our achievements, new releases and new available documentation.</i>

See <a href='http://code.google.com/p/ajaxportal/wiki/How_works_JavaScript_API'>How works JavaScript API</a>, <a href='http://code.google.com/p/ajaxportal/wiki/How_to_create_static_page'>How to create static page</a>, <a href='http://code.google.com/p/ajaxportal/wiki/Portlet_API'>Portlet API</a>

<h2>1.2. News</h2>
<ul><li><b>Oct 25, 2013</b> - New Release <a href='http://code.google.com/p/ajaxportal/downloads/detail?name=AjaxPortal-2.0.2-alpha3-25-Oct-2013.zip'>AjaxPortal-2.0.2-alpha3-25-Oct-2013.zip</a>
</li><li><b>Oct 12, 2013</b> - We participated in the Web Ready 2013 (#634): <a href='http://web-ready.ru/uchastniki/projects/seed/ajax_portal/'>http://web-ready.ru/uchastniki/projects/seed/ajax_portal/</a>
</li><li><b>Oct 2, 2013</b> - We changed our logo<br>
</li><li><b>Aug 26, 2013</b> - New Release <a href='http://code.google.com/p/ajaxportal/downloads/detail?name=AjaxPortal-2.0.1-alpha2-18-Aug-2013.zip'>AjaxPortal-2.0.1-Alpha2-18-Aug-2013.zip</a>
</li><li><b>Aug 10, 2013</b> - Live Demo WebOS mode of <b>Ajax Portal 2.0.1 Alpha2</b> is available <a href='http://webos.ajaxportal.org/'>http://webos.ajaxportal.org/</a>
</li><li><b>June 25, 2013</b> - We support WebOS development using Ajax Portal.<br>
</li><li><b>June 25, 2013</b> - New kernel is released. See <a href='http://code.google.com/p/ajaxportal/downloads/detail?name=AjaxPortal-2.0.0-alpha-25-June-2013.zip'>http://code.google.com/p/ajaxportal/downloads/detail?name=AjaxPortal-2.0.0-alpha-25-June-2013.zip</a>.<br>
</li><li><b>February 2, 2012</b> - Customization module is released. See <a href='http://ajaxportal.googlecode.com/files/ajaxportal-customization-1.0.4-working_concept-sources.zip'>http://ajaxportal.googlecode.com/files/ajaxportal-customization-1.0.4-working_concept-sources.zip</a>.<br>
</li><li><b>January 19, 2012</b> - The <b>MicroServlet</b> sub-project is added on Code.GOOGLE:<a href='http://code.google.com/p/microservlet/'>http://code.google.com/p/microservlet/</a>
</li><li><b>December 27, 2011</b> - <a href='http://itfan.ru'>http://itfan.ru</a> based on Ajax Portal engine is launched.<br>
</li><li><b>December 9, 2011</b> - We define the database structure of all main Ajax Portal services (see <a href='http://code.google.com/p/ajaxportal/wiki/Database_Structure'>http://code.google.com/p/ajaxportal/wiki/Database_Structure</a>). Two rules have been realized: 1) the complex idea does work; 2) the easiest is not the most flexible.<br>
</li><li><b>November 29, 2011</b> - <b>Static Version of Ajax Portal 1.0.4</b> is released and comes in Beta version. See <a href='http://ajaxportal.googlecode.com/files/ajaxportal_decoration_static-1.0.4.zip'>http://ajaxportal.googlecode.com/files/ajaxportal_decoration_static-1.0.4.zip</a>. Now we are going to publish customization module for Ajax Portal and Repository of Portlets. These components are based on the current static version.<br>
</li><li><b>October 10, 2011</b> - We take part in IT Jump 2011.<br>
</li><li><b>September 29, 2011</b> - We take part in Web-Ready 2011. See our project - application #436 at <a href='http://www.web-ready.ru/konkurs/podannye_zayavki_2011/the_best_project1/ajax_portal/'>http://www.web-ready.ru/konkurs/podannye_zayavki_2011/the_best_project1/ajax_portal/</a>.<br>
</li><li><b>June 16, 2011</b> - <b>Ajax Portal ASP.NET</b> ver 1.0.3 controls project is added. Now Ajax Portal is a cross-platform solution.<br>
</li><li><b>May 20, 2011</b> - We activate our first domain. See <a href='http://ajaxportal.org'>http://ajaxportal.org</a>.<br>
</li><li><b>April 25, 2011</b> - <b>Decoration module (JSP tag library) ver. 1.0.3 (Alpha4)</b> for Ajax Portal is released. See the download list at <a href='http://code.google.com/p/ajaxportal/downloads/list'>http://code.google.com/p/ajaxportal/downloads/list</a>.<br>
</li><li><b>April 18, 2011</b> - We activate bug tracking for version 1.0.4 of Ajax Portal.  <a href='http://code.google.com/p/ajaxportal/issues/list'>See more details attached</a>.<br>
</li><li><b>April 12, 2011</b> - We release ajax4all library ver. 1.0.3 is released. See <a href='http://ajaxportal.googlecode.com/files/ajax4all-1.0.3_beta.zip'>download</a>. The library has beta status. There're no critical issues. We know about 2 specific issues with Opera 10/11.<br>
</li><li><b>March 17, 2011</b> - We conclude an arrange for investment consulting with Business Accelerator (Minsk, Belarus).<br>
</li><li><b>March 16, 2011</b> - Proof of concept for public internet sites <a href='http://sokolovbook.narod.ru/en/demotb/'>http://sokolovbook.narod.ru/en/demotb/</a>. The newspaper is available in Russian only.<br>
</li><li><b>March 2, 2011</b> - New version of Enterprise Ajax Portal Decoration module released (see <a href='http://ajaxportal.googlecode.com/files/ajaxportal_decoration_static-1.0.3.zip'>http://ajaxportal.googlecode.com/files/ajaxportal_decoration_static-1.0.3.zip</a>).<br>
</li><li><b>February 28, 2011</b> - We buy two domains: <a href='http://ajaxportal.org'>http://ajaxportal.org</a> and <a href='http://ajaxportal.ru'>http://ajaxportal.ru</a>.<br>
</li><li><b>January 22, 2011</b> - A new page How to create a static page on Ajax Portal 1.0.3 (Alpha4) is created. See <a href='http://code.google.com/p/ajaxportal/wiki/How_to_create_static_page?ts=1297675755&updated=How_to_create_static_page'>How to create static page</a>.<br>
</li><li><b>January 5, 2011</b> - <b>Ajax Portal 1.0.2 (Alpha3)</b> is released. See  <a href='http://ajaxportal.googlecode.com/files/AjaxPortal_demo_tomcat_webapps_alpha3_1.0.2.zip'>AjaxPortal_demo_tomcat_webapps_alpha3_1.0.2.zip</a>.</li></ul>

<h2>1.3. Requirements</h2>

Enterprise Ajax Portal works with the following browsers:<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/ie.jpg' /> <b>MS Internet Explorer 7</b>,<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/firefox.jpg' /> <b>Mozilla Firefox 3.6</b>,<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/opera.jpg' /> <b>Opera 9</b>,<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/empty.gif' />

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/safari.jpg' /> <b>Safari 4.0</b>,<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/empty.gif' />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/chrome.jpg' /> <b>Google Chrome 15</b>

To report a bug in any of these browsers, please <a href='http://code.google.com/p/ajaxportal/issues/list'>add an issue</a> with a test case or a test example.<br>
<br>
<h2>1.4. What is Ajax Portal?</h2>
I propose a new enterprise portal architecture (Ajax Portal) which is based on Ajax calls exclusively. It simplifies portlet creation and even allows to forget about portlets as portal server side components. Instead, I propose using any static or dynamic HTML/XHTML resource as a portlet. It gives the possibility to use standard Web applications based on JSF, Tapestry, Struts 1/2, Webwork frameworks, and even non Java-based technologies, such as ASP, ASP.NET, Perl, PHP, etc. as portlets (content sources for portlets on the portal page).<br>
<br>
Unlike a portlet bridge (JSR 301 and JSR 329 standards), Ajax Portal client side requests the HTML/XHTML resource (portlet) for both context and data.<br>
<br>
Ajax portal uses <b>ajax4all</b> subtechnology (implementation of <b>Ajax Submit</b> pattern) for supporting the applications based on Lite Ajax pattern (the application uses standard controls of HTML form).<br>
<br>
For resolving security issues (e.g. browser security and firewall rules) and/or opening a secure channel, all Ajax requests can be sent through <b>HTTP Proxy</b> which retranslates requests and responses to and from the portlet server.<br>
<br>
To use existing Web applications as portlets and to exclude the need to modify these applications, Ajax Portal has a special Content Aggregator component. This component allows getting the body of HTML/XHTML resource (content of the BODY tag) or content of any element of HTML/XHTML resource by value of id attribute for Content Injection into the portal page. Content Aggregator also extracts JavaScript links and sources and CSS styles and injects them into the portal page by a special method (specified by portal implementation).<br>
<br>
Portlets may be set in portlet regions on the portal page. Such portlets have the <b>RegionByDefault</b> parameter specifying the region where the portlet will be added during portlet installation in the portal page. Ajax Portal allows to <b>Drag&Drop</b> portlets within a region and from one region into another. Region usage gives an additional possibility for portlet decoration (view of the portlet depends on the state of both the region and the portlet).<br>
<br>
<b>The greatest event in history of our project:</b> Standard approach for Enterprise Portal was dead <b>26 April 2010</b> when Ajax Portal example with <b>ajax4all</b> library was started. Ajax Submit pattern was implemented completely.<br>
<br>
<h2>1.5. Why Ajax Portal?</h2>
Update of portlet content is executed by Ajax Call without reloading the Portal Page. This approach saves Internet traffic between portal server and portlets.<br>
<br>
Portal Page defines the layout (position of each portlet on portal page), but the layout can be changed by the Client Side API.<br>
<br>
Ajax Portal is platform-independent and programming languages-independent (client side is implemented as JavaScript library (API), but the server side can be based on Java, .NET, Perl, PHP, etc.).<br>
<br>
Only Personalization Service and HttpProxy components are required for Ajax Portal functionality. Both server side components have to implement interfaces described by Ajax Portal specification. Other server side services and components are optional.<br>
<br>
CMS is out of scope of Ajax Portal specification. A software developer can use any CMS, databases and any other sources for content management.<br>
<br>
Ajax Portal JavaScript library (API) provides a possibility to create, modify and delete any portlets and regions on the client side (in the browser).<br>
<br>
<h2>1.6. Overview of Ajax Portal Technology</h2>
Ajax Portal is a technology for web portal development which supports content aggregation from different instances (content of any HTML/XHTML resources in Internet). It's possible to use standard web applications as portlets. The server technology doesn't matter (Java, .NET, ASP, PHP, Perl, etc.).<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/ap2.jpg' />

<b>Picture 3.</b> Screenshot of Enterprise Ajax Portal demo version 1.0.1<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/screenshot1_small.jpg' />

<b>Picture 4.</b> Mashup demo page for Minsk Startup Weekend No. 6 (Apr 30 – May 1, 2011 screenshot), Enterprise Ajax Portal version 1.0.3<br>
<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/screenshot_tutby_newspaper_small.jpg' />

<b>Picture 5.</b> Demo - Internet newspaper <a href='http://sokolovbook.narod.ru/en/demotb/'>http://sokolovbook.narod.ru/en/demotb/</a>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/screenshot_mobile_small.jpg' />

<b>Picture 6.</b> Demo - HTML prototype of Social Network application <a href='http://sokolovbook.narod.ru/socnet/index.html'>http://sokolovbook.narod.ru/socnet/index.html</a>. The application has three pages. There're menu buttons for navigation between pages.<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/screenshot_mobile_portal_small.jpg' />

<b>Picture 7.</b> Demo - Social Network application in Ajax Portal (all three pages are open in different portlets; navigation buttons are hidden; personalization of each page are available)<br>
<br>
<h2>1.7. Basic Terms</h2>
Ajax Portal proposes a different terminology than JSR 286:<br>
<ul><li><b>Portal</b> is a Web application providing the content aggregation from different sources, personalization (implemented by PersonalizationService), security (e.g. Single Sign On for related Portlets) and the presentation layer of Information System.<br>
</li><li><b>Ajax Portal</b> provides content aggregation of Portlets and any static (any HTML/XHTML page) or dynamic (any Java based, .NET, ASP, Perl, PHP, etc. application) resources from Internet.<br>
</li><li><b>Portal Page</b> represents a complete HTML/XHTML document and aggregates several portlet regions and Portlets.<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portal_page.gif' /></li></ul>

<b>Picture 8.</b> Basic Portal Page components (Content Areas, Portlets and Portlet Regions)<br>
<ul><li><b>Content</b> is a set of components in HTML/XHTML document (e.g. text, images, links, etc.).<br>
</li><li><b>Content Area</b> <i>(instead of Portlet Content in JSR 286)</i> is any rectangular bar with Content in HTML/XHTML document.<br>
</li><li><b>Portlet</b> <i>(instead of Portlet Window in JSR 286)</i> provides decoration for the Content Area and additional operations (minimize, maximize, open in a new window, etc.). As a rule, any portlet has some content and a header with an icon, a title, some markers (e.g. draggable icon marker) and behavior buttons.<br>
</li><li><b>Portlet Region</b> is a rectangular bar with <i>Portlets</i>. <i>Portlet Region</i> provides decoration for the region and an additional decoration for the portlets in the region. <i>Portlet Region</i> also provides some special operation for the portlets (e.g. portlet minimizing and maximizing, <i>Portlet</i> <a href='http://en.wikipedia.org/wiki/Drag-and-drop'>Drag & Drop</a> between regions and inside of the region).<br><i>Portlets</i> can be situated outside of <i>Regions</i>.<br>
</li><li><b>Portlet Application</b> <i>(instead of Portlet Container in JSR 286)</i> is a server side component supporting request processing and dynamic content generating. Portlet Applications are used as pluggable user interface components that provide a presentation layer of Information System. Ajax Portal provides Java based default implementation of Portlet Application (see Portlet implementation module of Ajax Portal). Portal and Portlet Applications can be built together as one Web application.</li></ul>

<h2>1.8. Architecture</h2>

We extend existing enterprise solutions which are based on standard <b>JSR-168</b> and <b>JSR-286</b>. We don't use any bridges like <b>JSR-301</b> and <b>JSR-329</b> based ones. We use AJAX technology exclusively. It gives us the possibility to develop easy and high performance portal solutions which are called <b>Enterprise Ajax Portal</b>. We implement classic Enterprise Portal approach by <b>Web 2.0 solution</b> (Intranet 2.0).<br>
<br>
Architecturally <b>Ajax Portal</b> consists of two main parts:<br>
<ul><li><b>Server side</b> - portal server.<br>
</li><li><b>Client side</b> - portal JavaScript application.</li></ul>

Server side of Ajax Portal includes the following main components (see picture below):<br>
<ol><li><b>Portlet connector</b> - portlet container of JSR168/JSR286 portlets.<br>
</li><li><b>Content aggregator</b> - supports work with standard Web applications.<br>
</li><li><b>Portal Web application</b> - provides implementation of main services (e.g. <b>Personalization Service</b>, etc.).<br>
</li><li><b>HTTP Proxy</b> - provides the possibility to load content (by Ajax calls) from resources outside of portal domain.</li></ol>

Client side of Ajax Portal includes the following main components (see picture below):<br>
<ol><li><b>Portal Page</b> - provides minimal set of CSS and JavaScript.<br>
</li><li><b>JavaScript UI Library</b> - provides the main UI components of the portal: <b>PortletPage</b>, <b>Region</b> and <b>Portlet</b>. The library supports all interactive effects as Drag&Drop, themes for regions/portlets (especially for accordion and tabs functionality).<br>
</li><li><b>JavaScript Portal API</b> - supports Ajax Call to the portal and portlets.<br>
</li><li><b>Content aggregator</b> - supports <b>Content Aggregation</b> pattern by <b>ajax4all</b> JavaScript library.</li></ol>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/ajaxportal_server_architecture.jpg' />

<b>Picture 9.</b> Ajax Portal architecture<br>
<br>
Client (browser) connects to <i>Ajax Portal Server</i> using HTTP. <i>Ajax Portal Server</i> is a <i>Web Application</i>. The Portal builds a portal page (HTML/XHTML page and required images, CSS files and scripts). The portal page defines:<br>
<ol><li>the layout of the portal page,<br>
</li><li>the navigation mechanism,<br>
</li><li>the possibility to change portal settings.<br>
The portal page may contain the content of the portlets or it can be loaded by client side of portal directly from portlet server or through the HTTPProxy component.</li></ol>

Content of each portlet can be loaded by the following ways:<br>
<ol><li>directly from portlet application (portlet server),<br>
</li><li>form portlet server thought HttpProxy component,<br>
</li><li>portal server injects content of portlets in the portal page during its rendering.</li></ol>

The difference of principle is <b>Portlet Phases</b> (see picture below). The classic approach uses 3 phases of relations between portal and portlets: action (apply of changes in current portlet), event sending and rendering of content. For Ajax Portal only the render phase is required. Each activity between portal-portlet and portlet-portlet is supported by Ajax calls. By Ajax call the portlet:<br>
<ol><li>sends parameters and receives a new portlet content,<br>
</li><li>sends application data to the portlet and receives the result code (e.g. success or not),<br>
</li><li>sends application data to another portlet (portlet intercommunication).<br>
The picture demonstrates parameter sending and receiving of the new portlet content. An important feature is that the portal page is not reloaded. The portal sends only the portlet content.</li></ol>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_phases.gif' />

<b>Picture 10.</b> Portlet phases in Ajax Portal<br>
<br>
Everybody knows about security issues with Ajax calls outside of current domain, but <b>Web Applications Working Group</b> with <b>W3C</b> created <a href='http://www.w3.org/TR/cors/'>Cross-Origin Resource Sharing</a>. It allows access to resources outside of current domain by Ajax.<br>
<br>
Ajax Portal provides HTTP Proxy component which helps to connect outside of current domain without <b>Cross-Origin Resource Sharing</b> (it's actual for old browsers). In addition HTTP Proxy component helps to support <b>SSO</b>. It's not possible to store password and any security certificates in JavaScript code (all Portlets are part of portal page and can access to all properties and methods). As a result, all security certificates, SSO tickets are added during the proxy of Ajax calls by HTTP Proxy component.<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/components_and_technologies.jpg' />

<b>Picture 11.</b> Component and technology pool<br>
<br>
<h2>1.9. How Does It Work?</h2>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/readit.gif' /><a href='http://code.google.com/p/ajaxportal/wiki/How_works_JavaScript_API'>How does JavaScript API work? </a>

Portlet Core: <b>TBD</b>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/readit.gif' /><a href='http://code.google.com/p/ajaxportal/wiki/Portlet_API'>Portlet API</a>

<h2>2. Special Appeal No. 1: Region States</h2>
<i>Ajax portal</i> supports five states of <i>Region</i>s. Each region state provides a specific decoration for the <i>Region</i> and an additional decoration for the <i>Portlets</i> in the <i>Region</i>.<br>
<ul><li><b>nodecoration</b> view cancels all decorations of the portlets in the region.<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/container_nodecoration.jpg' /></li></ul>

<b>Picture 12.</b> Nodecoration region state.<br>
<ul><li><b>window</b> view represents the current region as a window.<br>
<blockquote>The window has an icon and a title.<br>
All portlets have no decorations in the region.<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/container_window.jpg' /></blockquote></li></ul>

<b>Picture 13.</b> Window region state.<br>
<ul><li><b>standard</b> view is classic view of the portlet.<br>
<blockquote>Any portlet is decorated as a small window with icon, title and behavior buttons.<br>
Set of buttons depends on the <b>Portlet View</b> (the buttons change the portlet state).<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/container_standard.jpg' /></blockquote></li></ul>

<b>Picture 14.</b> Standard region state.<br>
<ul><li><b>accordion</b> view represents portlets in the region as multiple panes (one pane for one portlet).<br>
<blockquote>Each pane has the same header as classic portlet view except for behavior buttons (see Standard state) and content.<br>
All headers are displayed vertically as horizontal bars.<br>
Only one pane can be selected at a time.<br>
By default the first pane is active.<br>
Content of the pane is shown under the pane header.<br>
User can activate another pane by clicking on the corresponding header.<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/container_accordion.jpg' /></blockquote></li></ul>

<b>Picture 15.</b> Accordion region state.<br>
<ul><li><b>tabs</b> view represents portlets in the region as multiple tabs (one tab for one portlet).<br>
<blockquote>Each tab has a header and a content.<br>
Usually the header has an icon and a title.<br>
All headers are displayed horizontally above the content.<br>
Only one tab can be selected at a time.<br>
By default the first tab is active.<br>
User can activate another tab by clicking on the corresponding header.<br />
<img src='http://sokolovbook.narod.ru/en/content/images/container_tabs.jpg' /></blockquote></li></ul>

<b>Picture 16.</b> Tabs region state.<br>
<h2>3. Special Appeal No. 2: Exotic Portlet Themes</h2>
<i>Ajax Portal</i> supports the following exotic themes for portlets in base package (see below). The themes are supported only for <i>Portlets</i> outside of any <i>Region</i>.<br>
<ul><li><b>Alternative1</b> theme (there're no portlet icon and title)<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_alternative1.jpg' /></li></ul>

<b>Picture 17.</b> Alternative1 theme.<br>
<ul><li><b>Alternative2</b> theme (<i>Portlet Content</i> follows after the portlet title)<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_alternative2.jpg' /></li></ul>

<b>Picture 18.</b> Alternative2 theme.<br>
<ul><li><b>Alternative3</b> theme<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_alternative3.jpg' /></li></ul>

<b>Picture 19.</b> Alternative3 theme.<br>
<ul><li><b>Apple</b> theme<br />
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/portlet_theme_apple.jpg' /></li></ul>

<b>Picture 20.</b> Apple theme.<br>
<h2>4. How to Write Portlets for Ajax Portal</h2>
<h3>4.1. Use Existing Web Applications</h3>
Ajax Portal provides the possibility to use standard Web applications as portlets without changes.<br>
<br>
It's possible by the following ways:<br>
<ul><li>by <b>IFRAME</b> HTML tags - starts Web application (Portlet) in a small subwindow on the main page,<br>
</li><li>by <b>ajax4all</b> JavaScript library - <b>ajax4all</b> library implements <b>Content Aggregation</b> pattern. The main idea is injection of Web application content into the portal page by DOM model methods of the browser. During injection all CSS styles, scripts and its links are added in the portal page too.<br>
<h3>4.2. Portlet API</h3>
<b>Ajax Portal team proposes Portlet API which is based on</b> <a href='http://sokolovbook.narod.ru/en/microservlet.html'>MicroServlet MVC framework</a>.</li></ul>

Portlet API of Ajax Portal helps to develop a Web application which can work as portlet (has portlet descriptor, implement portlet lifecycle, etc.). It means any portlet developed by Portlet API of Ajax Portal, can be used as standard Web application.<br>
<br>
Current Portlet API implementation differs from JSR 286, but in general we try to follow JSR 286. In future we are planning to propose a new JSR request for Java community which will specify  portlets and portals of new generation.<br>
<br>
<b>Portal Core</b> TBD<br>
<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/readit.gif' /><a href='http://code.google.com/p/ajaxportal/wiki/Portlet_API'>Portlet API: Lifecycle</a>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/readit.gif' /><a href='http://code.google.com/p/ajaxportal/wiki/Portlet_API'>Why do we use MicroServlet framework as base of Portlet API?</a>

Portlet API uses the following annotations which come from MicroServlet API:<br>
<ul><li><b>RenderForm</b> - annotation defines class, scope, name for request form bean,<br>
</li><li><b>RenderJsp</b> - annotation defines render JSP.<br>
Portlet API creates its own implementation of RenderMode annotation. The annotation marks the method which should be executed for the portlet’s <b>render mode</b>.</li></ul>

See demo of Portlet API:<br>
<pre><code>public class HelloWorldDispatchPortlet extends AbstractDispatchPortletServlet {<br>
<br>
    protected DemoFormExample getRequestForm(RenderRequest request) {<br>
        return (DemoFormExample) RequestFormUtil<br>
                .getRequestForm(((RenderRequestImpl)request)<br>
                        .getHttpServletRequest());<br>
    }<br>
<br>
    @RenderMode   // by default mode = PortletMode.VIEW<br>
    @RenderForm (name = "DemoFormExample",<br>
                 clazz = com.sokolov.microservlet.example.DemoFormExample.class,<br>
                 scope = Scope.SESSION)<br>
    @RenderJsp (page = "/page/demo.jsp")<br>
    public void doView(RenderRequest renderRequest,<br>
                       RenderResponse renderResponse)<br>
            throws PortletException, IOException {<br>
        DemoFormExample formExample = getRequestForm(renderRequest);<br>
        formExample.setParam1("Test");<br>
    }<br>
<br>
    @RenderMode (mode = PortletMode.EDIT)<br>
    public void doEdit(RenderRequest renderRequest,<br>
                       RenderResponse renderResponse)<br>
            throws PortletException, IOException {<br>
        PrintWriter out = renderResponse.getWriter();<br>
        out.println("EDIT mode.");<br>
    }<br>
<br>
    @RenderMode (mode = PortletMode.HELP)<br>
    public void doHelp(RenderRequest request,<br>
                       RenderResponse response)<br>
            throws PortletException, IOException {<br>
        PrintWriter out = response.getWriter();<br>
        out.println("HELP mode.");<br>
    }<br>
<br>
    @RenderMode (mode = PortletMode.CUSTOM,<br>
                 name = "HalfPage")<br>
    @RenderForm (name = "DemoFormExample",<br>
                 clazz = com.sokolov.microservlet.example.DemoFormExample.class)<br>
    public void doHalfPage(RenderRequest renderRequest,<br>
                           RenderResponse renderResponse)<br>
            throws PortletException, IOException {<br>
        PrintWriter out = renderResponse.getWriter();<br>
        out.println("HalfPage mode.");<br>
<br>
        DemoFormExample formExample = getRequestForm(renderRequest);<br>
        out.println("Param1 = " + formExample.getParam1());<br>
    }<br>
}<br>
</code></pre>

<h2>5. A New JSR Request for Java Community</h2>
We are planning to propose a new JSR request for Java community which will specify  portlets and portals of new generation.<br>
The reasons for creation of the new JSR:<br>
<ol><li>JSR168 and JSR286 don't specify Portal Server<br>
</li><li>JSR168 and JSR286 don't support Ajax. JSR301 and JSR329 are hot fixed drawbacks of JSR168 and JSR286.<br>
</li><li>Region approach is standard de facto, but it's not specified by JSR168 and JSR286.<br>
</li><li><b>PortletMode</b> should be <b>enum</b> (Java type).<br>
</li><li><b>WindowState</b> transforms to <b>PortletState</b>, because Ajax Portal supports <b>Tabs</b> and <b>Accordion</b> region states. <b>PortletState</b> should be <b>enum</b> (Java type).<br>
</li><li>add new <b>RegionState</b> enum, which supports the following enum values: <b>NODECORATION</b>, <b>WINDOW</b>, <b>STANDARD</b>, <b>ACCORDION</b>, <b>TABS</b>.<br>
</li><li><b>TBD</b></li></ol>

<h2>6. About a project leader</h2>
Sergei Sokolov is a lead software engineer with 21 years of development experience. His specialty is database and web development for business applications. For the last 9 years he's been concentrated on the development under Java platform, though he has good experience in C, C++, C#, VB (VBScript), Perl and Flash (action script and animation) development. He was a system architect on his two latest projects. He has deep experience in architecture documentation development.<br>
<br>
He started his portal experience from WebLogic Portal 8.0 in 2005.<br>
<br>
He published 4 books:<br>
<table><thead><th><img src='http://ajaxportal.googlecode.com/svn/trunk/images/my_css3_bolgaria_book.jpg' /><br> <b><a href='http://www.asenevtsi.com/index.php?p=book&book=46'>CSS3 в примери + CD.</a></b> 336 pages, 2009, Asenevtsi (Bulgaria).</th><th><img src='http://ajaxportal.googlecode.com/svn/trunk/images/my_css3_book.jpg' /><br> <b><a href='http://www.williamspublishing.com/Books/978-5-8459-1337-1.html'>CSS 3 в примерах.</a></b>352 pages, 2007, Williams (Russia).</th><th><img src='http://ajaxportal.googlecode.com/svn/trunk/images/my_html_and_css_book.jpg' /><br> <b><a href='http://www.williamspublishing.com/Books/978-5-8459-1192-6.html'>HTML и CSS в примерах, типовых решениях и задачах.</a></b> 416 pages, 2007, Williams (Russia).</th><th> <img src='http://ajaxportal.googlecode.com/svn/trunk/images/my_javascript_book.jpg' /><br> <b><a href='http://www.williamspublishing.com/Books/5-8459-1029-3.html'>JavaScript в примерах, типовых решениях и задачах.</a></b> 592 pages, 2006, Williams (Russia).</th></thead><tbody></tbody></table>

He has consolidated the following ideas, proposals and experience in Ajax Portal project:<br>
<ol><li>four-and-a-half-years’ experience in maintenance company intranet in MDTVision (an IBM company),<br>
</li><li>proposals of intranet console for MDTVision, EPAM and Exadel,<br>
</li><li>a small library for the second edition of JavaScript book,<br>
</li><li>experience of enterprise portal development,<br>
</li><li>ALL components (region and portlet states in Ajax Portal), which implement <b>State</b> and <b>Marker</b> patterns.</li></ol>


<table><thead><th> <img src='http://ajaxportal.googlecode.com/svn/trunk/images/english.gif' /> <b><a href='http://ajaxportal.org'>Home site</a></b></th><th><b><a href='http://code.google.com/p/ajaxportal/people/list'>Our team</a></b></th><th> <b>???</b> <b><a href='http://code.google.com/p/ajaxportal/wiki/FAQ'>FAQ</a></b></th><th><b><a href='http://groups.google.com/group/ajaxportal'>Our Google group</a></b></th></thead><tbody></tbody></table>

<br><br><br><br>
<b>Ajax Portal team</b><br>
Contact person: Sergei Sokolov,<br>
<img src='http://ajaxportal.googlecode.com/svn/trunk/images/letter.gif' /> <a href='mailto:ssokolov@ajaxportal.org'>ssokolov@ajaxportal.org</a>