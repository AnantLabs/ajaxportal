<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
    <head>
        <title>Add user form</title>
    </head>
    <body>
        <jsp:useBean id="DemoForm" scope="request" class="com.sokolov.microservlet.example.demo.DemoForm" />
        <form action="demo.action" method="get">
            <input type="hidden" name="method" value="save">
            <input type="hidden" name="id" value="<c:out value="${DemoForm.id}"/>">
            <b>Add a new user:</b>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input name="name" value="<c:out value="${DemoForm.name}"/>"></td>
                </tr>
                <tr>
                    <td>Position</td>
                    <td><input name="position" value="<c:out value="${DemoForm.position}"/>"></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>
                        <input type="submit" value="Save"/>
                        <input type="reset" value="Clean"/>
                        <a href="demo.action?method=list">Cancel</a>
                    </td>
                </tr>
            </table>
        </form>
    </body>
</html>
