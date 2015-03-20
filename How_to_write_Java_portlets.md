!!!The page is not finished!!!

# How to write Java portlets #

Ajax Portal gives possibility to use standard Web application as portlets, but Ajax Portal team decides that Ajax Portal should follow JSR 286 if it's possible or generate new JSR proposal to Java community.

We start development of our implementation of JSR 286. We found some issues and we will recommend a new implementation of Portlet API.


# Details #

Our Portlet API is based on MicroServlet MVC framework. The MicroServlet framework was develop as very easy MVC frame for Java developer education on Java trainings. The MicroServlet framework gives possibility to understand main principles in Java servlets, reflection,

Our Portlet API could be use instead of current Portlet API (you just change parent class of you portlet).

```
public class HelloWorldDispatchPortlet extends AbstractDispatchPortletServlet {

    protected DemoForm getRequestForm(RenderRequest request) {
        return (DemoForm) RequestFormUtil
                .getRequestForm(((RenderRequestImpl)request)
                        .getHttpServletRequest());
    }

    @RenderMode   // by default mode = PortletMode.VIEW
    @RenderForm (name = "DemoFormExample",
                 clazz = com.sokolov.portlet.example.DemoForm.class,
                 scope = Scope.SESSION)
    @RenderJsp (page = "/page/demo.jsp")
    public void doView(RenderRequest renderRequest,
                       RenderResponse renderResponse)
            throws PortletException, IOException {
        DemoForm form = getRequestForm(renderRequest);
        form.setParam1("Test");
    }

    @RenderMode (mode = PortletMode.EDIT)
    public void doEdit(RenderRequestImpl renderRequest,
                       RenderResponseImpl renderResponse)
            throws PortletException, IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("EDIT mode.");
    }

    @RenderMode (mode = PortletMode.HELP)
    public void doHelp(RenderRequestImpl request,
                       RenderResponseImpl response)
            throws PortletException, IOException {
        PrintWriter out = response.getWriter();
        out.println("HELP mode.");
    }

    @RenderMode (mode = PortletMode.CUSTOM,
                 name = "HalfPage")
    @RenderForm (name = "DemoFormExample",
                 clazz = com.sokolov.portlet.example.DemoForm.class)
    public void doHalfPage(RenderRequestImpl renderRequest,
                           RenderResponseImpl renderResponse)
            throws PortletException, IOException {
        PrintWriter out = renderResponse.getWriter();
        out.println("HalfPage mode.");

        DemoForm form = getRequestForm(renderRequest);
        out.println("Param1 = " + form.getParam1());
    }
}
```

The RenderForm and RenderJsp annotations come from MicroServlet framework.

The RenderMode annotation is stub in current moment. It will be changed in version 1.1 of Portlet  API.