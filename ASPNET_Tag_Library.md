# Asp.net tag library #

Tag library helps to define:
  1. Required CSS files and JavaScript files,
  1. Structure of the portal page (positions of the regions),
  1. Portlet.

Of course, you are able to use this library in asp.net applications only. The asp.net tag library can be used with .net frameworks 2.0 or newer.

**DLL:** AjaxPortal\_NetControls.dll


## Register component ##

**Register** component defines all required JavaScript and CSS files for Region and Portlet component.

**Example:**
```
<portal:Register runat="server">
        ...
</portal:Register>
```

## Region component ##

**Region** component is a placeholder for portlets.

| **Property** | **Required** | **Value(s)** | **Description** |
|:-------------|:-------------|:-------------|:----------------|
| id | no |  | Identificator of the region. |


**Example:**
```
<portal:Region runat="server">
        ...
</portal:Region>
```

## Portlet component ##

**Portlet** coponent is a placeholder for the content.
| **Property** | **Required** | **Value(s)** | **Description** |
|:-------------|:-------------|:-------------|:----------------|
| id | no |  | Identificator of the portlet. |
| IsDraggable | no | yes/no | The flag, if value is true than the polygon supports Drag & Drop. |
| IsTitleEditable | no | yes/no | The flag, if value is true than the polygon supports the title change. |
| IsIframe | no | yes/no | The flag, if value is true than the polygon contents the frame setted by using IframeUrl parameter. |
| IframeUrl | no (yes if IsIframe = true) |  | Defines url of the polygon content which will be load and put in the polygon. |
| IsNoHeader | no | yes/no | The flag, if value is true than the polygon has header. |
| Title | no |  | Defines polygon title. |
| HelpUrl | no |  | Defines url of hepl page.|


**Example:**
```
<portal:Region runat="server">
        <portal:Portlet runat="server" IsNoHeader="true">
                no header
        </portal:Portlet>
        <portal:Portlet runat="server" HelpUrl="content/help_poligon1.html" IsTitleEditable="true">
                editable header
        </portal:Portlet>
        <portal:Portlet runat="server" IsTitleEditable="true" Title="Content area 2" HelpUrl="content/help_poligon2.html">
                Text <b>bold</b> <i>italic</i>
        </portal:Portlet>
        <portal:Portlet runat="server" Title="Content area 3" IsDraggable="true">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </portal:Portlet>
        <portal:Portlet runat="server" IsDraggable="true" Title="Content area 4" HelpUrl="content/help_poligon4.html">
                <ul>
                        <li>Item A</li>
                        <li>Item B</li>
                        <li>Item C</li>
                </ul>
        </portal:Portlet>
        <portal:Portlet runat="server" IsIframe="true" Title="IFrame" IframeUrl="content/help_poligon4.html" />
        <portal:Portlet ID="Portlet1" runat="server" IsIframe="true" Title="IFrame google"
                IframeUrl="http://google.com" IsDraggable="true" />
</portal:Region>
```