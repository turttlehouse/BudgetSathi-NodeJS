// using express package from npm for routing to define routes, Templates to use EJS engine which help in generating dynamic HTML content on the server and sending it to the client,
//For static file handling : we can serve static files easily using express
//For security : Express provides a foundation for implementing security practices such as input validation,authentication, and authorization.
const express= require("express") ()


express.get('/',(req,res)=>{
    res.send("hello world");
})





express.listen(5000,(req,res)=>{
    console.log("NodeJs Project has started at port no. 5000")
})