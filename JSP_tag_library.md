# JSP tag library #

Tag library helps to define:
  1. required CSS files and JavaScript files,
  1. structure of the portal page (positions of the regions and their properties),
  1. portlets.

Of course, you are able to use this library in JSP only. The JSP tag library can be used with Struts 1/2, WebWork 1/2 and JSF (JSP rendering) frameworks.

**JAR:** ajaxportal\_decoration\_jsp-1.0.1.jar

**Tag descriptor:** portal.tld

**Required JARs:** jstl.jar, standard.jar (ussually servlet-api.jar and jsp-api.jar are stored in common **lib** directory of the server).


## Required CSS Files and JavaScript Files ##

**The Java class:** com.sokolov.portal.tag.SupportTag


| **Property** | **Required** | **Value(s)** | **Description** |
|:-------------|:-------------|:-------------|:----------------|
| theme | no  | {default or blue or silver} | Defines the name of the theme |

**Example:**
```
<html>
    <head>
        ...
        <title>...</title>
        <portal:support theme="blue"/>
        ...
    </head>
    <body>
        ...
    </body>
</html>
```



## Structure of the Portal Page ##

**The Java class:** com.sokolov.portal.tag.RegionDiv

| **Property** | **Required** | **Value(s)** | **Description** |
|:-------------|:-------------|:-------------|:----------------|
| id | yes |  | Identificator of the region. |
| state | no | {nodecoration or window or standard or accordion or tabs} | Defines the state of the region.|
| dropTarget | no |  | The flag, if value is true than the region supports **Drag & Drop**. **Always true.** |
| styleClass | no |  | Analog of **class** HTML tag property.  |
| style | no |  | Analog of **style** HTML tag property. |
| title | no |  | Defines the title of the region when the state is **window**. |
| icon | no |  | Defines the icon uri when the state is **window**. |
| minWidth | no |  | Minimal width of the region. |


**Example:**
```
     <table width="100%" border="0">
         <tr>
             <portalLayout:tableCellContainer id="left" state="standard" title="Left region" icon="" dropTarget="true" styleClass="cbase" style="width: 600px;" minWidth="400px">
                 ...
             </portalLayout:tableCellContainer>
             <portalLayout:tableCellContainer id="right" state="standard" title="Right region" icon="" dropTarget="true" styleClass="cbase" style="width: 350px;" minWidth="250px">
                 ...
             </portalLayout:tableCellContainer>
         </tr>
     </table>
```



## Portlets ##


**The Java class:** com.sokolov.portal.tag.Portlet

| **Property** | **Required** | **Value(s)** | **Description** |
|:-------------|:-------------|:-------------|:----------------|
| id | yes |  | Identificator of the portlet. |
| state | no | {nodecoration or window or standard or accordion or tabs} | Defines the state of the portlet. |
| url | no |  | Defines url of the portlet content which will be load and put in the portlet. |
| helpUrl | no |  | Defines url of HELP page. |
| styleClass | no |  | Analog of **class** HTML tag property.  |
| style | no |  | Analog of **style** HTML tag property. |
| title | no |  | Defines portlet title. |
| icon | no |  | Defines portlet icon uri. |
| height | no |  | Defines fixed height of the portlet. By default the height of the portlet is not limited. |
| editable | no |  | The flag, if value is true than the portlet parameters can be changed by Edit dialog (**edit** button is vissible in the portlet header). |
| draggable | no |  | The flag, if value is true than the portlet supports **Drag & Drop**. |

**Example 1 (portlets without region):**
```
    <portal:portlet id="test1" title="Test Portlet 1">
    </portal:portlet>
    <portal:portlet id="test2" title="Test Portlet 2" url="content/ajax4all_what_is_ajax4all.html" height="400px">
    </portal:portlet>
```


**Example 2 (portlets in region):**
```
    <portalLayout:tableCellContainer id="left" state="standard" title="Left region" icon="" dropTarget="true" styleClass="cbase" style="width: 600px;" minWidth="400px">
                 
        <portal:portlet id="test1" title="Test Portlet 1">
        </portal:portlet>
        <portal:portlet id="test2" title="Test Portlet 2" url="content/ajax4all_what_is_ajax4all.html" height="400px">
        </portal:portlet>

     </portalLayout:tableCellContainer>
```