const TemplateEngine = require("../template/TemplateEngine");

function createProject(){

    console.log("");
    console.log("Creating project...");
    console.log("");

    TemplateEngine.write(

        "website/index.html",

`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Game Platform</title>
</head>

<body>

<h1>Game Platform Framework</h1>

</body>
</html>`

    );

    TemplateEngine.write(

        "website/style.css",

`body{

    font-family:Arial;

}`

    );

    TemplateEngine.write(

        "website/app.js",

`console.log("Game Platform Framework");`

    );

    console.log("");
    console.log("Project created.");
    console.log("");

}

module.exports={createProject};
