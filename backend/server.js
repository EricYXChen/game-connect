const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require ("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require('body-parser');
const User = require("./user");
const app = express();

mongoose.connect("mongodb+srv://dbUser:pqlA6UfE0Jvb6Qf8@cluster0.8wroh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => {
    console.log("Mongoose is connecting");
}

);

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("secretcode"));

app.post("/login", (req, res)=> {
    console.log(req.body);
});

app.post("/register", (req, res)=> {
    User.findOne({username: req.body.username}, async (err,doc) =>{
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if(!doc) {
          const newUser = new User ({
                username: req.body.username,
                password: req.body.password
          });
          await newUser.save();
          res.send("User Created");
      }  
    });
});

app.post("/user", (req, res)=> {
    console.log(req.body);
});



app.listen(4000, ()=> {
    console.log ('Server has Started')
})