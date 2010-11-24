<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html>
    <head>
        <title>User list</title>
        <style type="text/css">
            .userList {
                border-collapse: collapse;
                width: 40%;
            }
            .userList tr th {
                background-color: #DDDDDD;
            }
            .userList tr th,
            .userList tr td {
                border: 1px solid silver;
            }

        </style>
    </head>
    <body>
        <jsp:useBean id="DemoForm" scope="request" class="com.sokolov.microservlet.example.demo.DemoForm" />

        <b>User list:</b>
        <table class="userList">
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th style="width: 20%;">&nbsp;</th>
            </tr>
            <c:choose>
                <c:when test="${empty DemoForm.users}" >
                    <tr>
                        <td colspan="3" style="text-align: center;">No user(s) in the list.</td>
                    </tr>
                </c:when>
                <c:otherwise>
                    <c:forEach var="user" items="${DemoForm.users}">
                        <tr>
                            <td><c:out value="${user.name}"/></td>
                            <td><c:out value="${user.position}"/></td>
                            <td>
                                <a href="demo.action?method=edit&id=<c:out value="${user.id}"/>">edit</a>
                                <a href="demo.action?method=delete&id=<c:out value="${user.id}"/>">delete</a>
                            </td>
                        </tr>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
        </table>

        <a href="demo.action?method=view">Add a new user</a>
        <a href="demo.action?method=list">Refresh</a>
    
    </body>
</html>
