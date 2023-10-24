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

//For using Layout Features
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate)

//Parsing the incoming form data from the registration page
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//For creating users importing 'users' object from "./model/index.js" module
const { users } = require("./model/index.js");

// Importing the 'bcryptjs' library for password hashing
const brcypt=require('bcryptjs');

//For creating incomes source importing 'incomes' object from "./model/index.js" module
const { incomes } = require("./model/index.js");

//For creating expenses category importing 'expenes' object from "./model/index.js" module
const { expense } = require("./model/index.js");


//Get API -defining route for '/'
app.get('/',(req,res)=>{
    res.render('Landingpage')
})


//Get API - defining the route for '/Register'
app.get('/Register',(req,res)=>{
    res.render('Registration')
})

//Post API -defining the route for '/Register'
app.post('/Register',async(req,res)=>{
    // console.log(req.body)

    //first approach - destructuring the object
    //variable name in JS should not containe hyphen(-) so we are  using the aliasing feature of object destructuring to map the confirm-password property to the confirmpassword variable.
    // const {username,email,password,'confirm-password':confirmpassword}=req.body

    //second approach - directly accessing object properties
    const username= req.body.username
    const email= req.body.email
    const password= req.body.password
    const confirmPassword= req.body['confirm-password']   //value is coming in this property of object

    const emailExist= await users.findAll({
        where:{
            email:email,
        }
    })
   
    if(emailExist.length>0)
    {
        return res.send("Users with that email exist")
    }
    else
    {       
        if (!username || !email || !password || !confirmPassword)
        {
            return res.send("please provide all the credentials")
        }
        else if(password !== confirmPassword)
        {
            return res.send("you password didn't matched")
        }
        else
        {
            await users.create({
                username:username,
                email:email,
                password:brcypt.hashSync(password,8),
                confirmPassword:brcypt.hashSync(confirmPassword,8)
            })
            res.redirect('/Login')
        }       
        
    }

   
})


//Get API - defining the route for '/Login'
app.get('/Login',(req,res)=>{
    res.render('Login')
})

//Post API -defining the rout for '/Login'
app.post('/Login',async(req,res)=>{
    const email=req.body.email
    const password =req.body.password

    //checking if the email exist in the table 'users' or not.
    const userExists= await users.findAll({
        where :{
            email:email
        }
    })
    if (userExists.length>0)
    {
        //checking password
        //1st argument password is the plain text password from register form and 2nd argument is the old password stored in database inside the 0 index of array userExists.
        const isMatch=brcypt.compareSync(password,userExists[0].password)
        
        //isMatch ko output vaneko either true or false dinxa compareSync ley
        //True vako case
        if(isMatch)
        {
            res.redirect('/Dashboard')
        }
        else
        {
            res.send("invalid email or password")
        }
    }
    else
    {
        res.send("Invalid email or Password")

    }
})

//Get API - defining the route for '/home'
app.get('/Dashboard',(req,res)=>{
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
// Route to render the Myincomes template to display all incomes
app.get('/Myincomes',async(req,res)=>{
    //Read Operation
    //To show dynamic data in front end table fetching all the data from the incomes table
    const incomesdata = await incomes.findAll();
    // console.log(incomesdata);
    res.render("Myincomes.ejs",{Allincomedata:incomesdata})
})

//Post API -defining the route for '/Myincomes' to add incomes data from form
// Route to render the Myincomes template to add incomes
app.post('/Myincomes',async(req,res)=>{
    // console.log(req.body)
    const IncomeSource = req.body.IncomeSource
    const Amount =req.body.Amount
    const Date = req.body.Date
    const Remarks = req.body.Remarks

    await incomes.create({
        SourceOfIncome:IncomeSource,
        Amount:Amount,
        Date:Date,
        Remarks:Remarks
    })
    res.redirect('/Myincomes')
})


//Get API - defining the route for '/deleteIncome'
app.get("/deleteIncome/:id",async(req,res)=>{
    //grabing the id of which income object has been clicked
    const id = req.params.id

     await incomes.destroy({
        where : {
            id:id
        }

    })

    res.redirect("/Myincomes")
})

//Get API -defining the route for '/Updateincome'
//Route to render the Myincomes template for updating a specific income
app.get('/Updateincome/:id',async(req,res)=>{
    const id = req.params.id
    const singleincomedata = await incomes.findAll({
        where : {
            id : id
        }
    })
    console.log(singleincomedata);
    res.render("Updateincome",{singleincomedata:singleincomedata})
})

//Post API -defining the route for '/Updateincome'
app.post("/Updateincome/:id",async(req,res)=>{
    const id = req.params.id;
    const { IncomeSource,Amount,Date,Remarks} = req.body;

    await incomes.update({
        SourceOfIncome:IncomeSource,
        Amount:Amount,
        Date:Date,
        Remarks:Remarks
    },{
        where :{
            id:id
        }
    })
    res.redirect('/Myincomes');
})






//Get API - defining the route for '/Myexpenses'
app.get('/Myexpenses',async(req,res)=>{
    const Allexpenses = await expense.findAll();
    // console.log(Allexpenses);
    res.render("Myexpenses",{Allexpenses})
})

//Post API - defining the route for '/Myexpenses'
app.post('/Myexpenses',async(req,res)=>{

    const {ExpenseCategory,Amount,Date,Remarks} = req.body;
    
    await expense.create({
        ExpenseCategory,
        Amount,
        Date,
        Remarks
    })
    res.redirect('/Myexpenses')
})

app.get('/deleteExpense/:id',async(req,res)=>{
    const id = req.params.id;

    await expense.destroy({
        where :{
            id:id
        }
    })
    res.redirect('/Myexpenses')

})

app.get('/Updateexpense/:id',async(req,res)=>{
    const id = req.params.id;
    const singleexpensedata = await expense.findAll({
        where:{
            id:id
        }
    });
    // console.log(singleexpensedata);    
    res.render('Updateexpense',{singleexpensedata})
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

//1)express - For -> (Routing) to define routes, (Templates) to use EJS engine which help in generating dynamic HTML content on the server and sending it to the client,(For static file handling) : we can serve static files easily using express,(For security) : Express provides a foundation for implementing security practices such as input validation,authentication, and authorization.
//2)nodemon - Automatically restarting our Node.js application whenever changes are detected in our codebase
//3)ejs - Embedded JavaScript a template engine for JavaScript that allows us to embed dynamic JavaScript code within our HTML or other markup templates. 
//4)ejs-mate -It is a middleware for Express.js that enhances the functionality of the EJS template engine. It helps to maintain consistent layouts in your Express.js application by providing features like partials and block content, making it easier to reuse and organize our templates.
//5)sequelize - ORM to replace raw queries with function
//6)mysql2  - database version of mysql. library used for simplifying database interactions. It provides an abstraction layer over SQL databases, allowing developers to work with databases using JavaScript objects and functions.
//7)brcyptjs - JavaScript library used for hashing and salting passwords. It helps secure user authentication by safely storing and verifying passwords in a hashed format, protecting user data from unauthorized access.
