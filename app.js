// const app = require("express") () yo garda express.static use garda error ayo public file ko lagi
//Importing the Express.js library and initializing an instance of an Express application
const express= require("express") 
const app = express()

//setting the port variable to 5000, indicating that the application will listen on port 5000 for incoming network requests.
const port = 5000;

//set the viewengine to ejs -> telling Express.js that when we render views or templates (e.g., when using res.render()), it should use the EJS templating engine to process and render those templates. 
app.set('view engine','ejs');

//This line of code is configuring express.js to serve static files located in the public directory. By default NodeJS ko kunai pani directory public hudaina
app.use(express.static("public/"))

//For database connection
require("./model/index.js")

const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate)


//Get API - defining the route for '/'
app.get('/',(req,res)=>{
    res.render('Login')
})

//Get API - defining the route for '/Register'
app.get('/Register',(req,res)=>{
    res.render('Registration')
})


//Get API - defining the route for '/home'
app.get('/home',(req,res)=>{
    //rendering the home.ejs file inside views folder
    res.render("Dashboard");
})

//Get API - defining the route for '/Profile'
app.get('/Profile',(req,res)=>{
    res.render("Profile");
})

//Get API - defining the route for '/Notification'
app.get('/Notification',(req,res)=>{
    res.render("Notification")
})

//Get API - defining the route for '/incomes'
app.get('/incomes',(req,res)=>{
    res.render("Myincomes")
})

//Get API - defining the route for '/expenses'
app.get('/expenses',(req,res)=>{
    res.render("Myexpenses")
})

//Get API - defining the route for '/expenses'
app.get('/Report',(req,res)=>{
    res.render("Report")
})

//Get API - defining the route for '/Settings'
app.get('/Settings',(req,res)=>{
    res.render("Settings")
})


























// After the server start listening on a specific port for incoming requests
app.listen(port,(req,res)=>{
    console.log("NodeJs Project has started at port no. 5000")
})

//Packages used

//express - For -> (Routing) to define routes, (Templates) to use EJS engine which help in generating dynamic HTML content on the server and sending it to the client,(For static file handling) : we can serve static files easily using express,(For security) : Express provides a foundation for implementing security practices such as input validation,authentication, and authorization.
//nodemon - Automatically restarting our Node.js application whenever changes are detected in our codebase
// ejs - Embedded JavaScript a template engine for JavaScript that allows us to embed dynamic JavaScript code within our HTML or other markup templates. 
