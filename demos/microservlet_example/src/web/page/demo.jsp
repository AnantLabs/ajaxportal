<html>
    <head>
        <title>Demo</title>
    </head>
    <body>
        <jsp:useBean id="DemoFormExample" scope="request" class="com.sokolov.microservlet.example.DemoFormExample" />

        <h1>Demo</h1>
        <p>
            param1 = <jsp:getProperty name="DemoFormExample" property="param1" />
        </p>
    </body>
</html>
