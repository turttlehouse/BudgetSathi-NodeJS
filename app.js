// using express package from npm for routing to define routes, Templates to use EJS engine which help in generating dynamic HTML content on the server and sending it to the client,
//For static file handling : we can serve static files easily using express
//For security : Express provides a foundation for implementing security practices such as input validation,authentication, and authorization.
const express= require("express") ()
const port = 5000;

//set the viewengine to ejs -> setting the view engine to 'ejs' telling Express.js that when we render views or templates (e.g., when using res.render()), it should use the EJS templating engine to process and render those templates. 
express.set('view engine','ejs');


//Get API - defining the route for '/'
express.get('/',(req,res)=>{
    res.render("home");
})











 //Installin nodemon - Automatically restarting our Node.js application whenever changes are detected in our codebase
// After the server start listening on a specific port for incoming requests
express.listen(port,(req,res)=>{
    console.log("NodeJs Project has started at port no. 5000")
})