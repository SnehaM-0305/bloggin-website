// require("dotenv")
const express = require('express');
const path = require("path") ; 
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
// const {User} = require('./models/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser') ;
const {checkForAuthenticationCookie } = require('./middlewares/auth');
const Blog = require("./models/blog") ; 

const app = express() ; 
// const PORT = process.env.PORT||8000 ; 
const PORT = 8000;

// mongoose.connect(process.env.MONGO_URL).then(e=>{
//     console.log("mongo db connected");
// });
mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(e=>{
    console.log("mongo db connected");
});
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
//middleware for rending static files
app.use(express.static(path.resolve("./public")));
app.set("view engine","ejs") ; 
app.set("views" , path.resolve("./views"));
//ROUTES
app.get('/',async(req,res)=>{ 
    const allBlogs = await Blog.find({}).sort({createdAt:-1}) ; 
    res.render("home",{
        user:req.user ,
        blogs:allBlogs
    });
});

app.use('/user' , userRoute);
app.use('/blog' , blogRoute);
app.listen(PORT , ()=>{console.log(`Server is running on ${PORT}`)});