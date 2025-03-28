//importing all required external modules after instalation
const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=required('./models/User')
const bcrypt=require("bcryptjs")

//Middleware
const PORT=3000
const app=express()
app.use(express.json())

//connecting Mongodb Atlas
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully...")
).catch(
    (err)=>console.log(err)
)
//API Landing page http://localhost:3000/register
app.get('/',async(req, res)=>{
    try{
        res.send("<h1 align=center>welcome to the backend and week 2</h1>")
    }
    catch(err)
    {
        console.log(err)
    }
})
//API registration page http://localhost:3000/register
app.post('/register',async(req,res)=>{
    const {user, email, password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
       const NewUser=new User({user,email,password:hashPassword})
      await newUser.save()
      console.log("New user is registered successfully...")
      res.json({message:'User created...'})
    }
    catch(err)
    {
        console.log(err)
    }
})
//login page api
app.post('/login',async(req,res)=>{
    const {email, password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)));
        {
            return res.status(404).json({message:"Invalid Credentials"});
        }
        res.json({ message: "login successfully", username: user.username})
    }
    catch(err)
    {
        console.log(err)
    }
})


//server running and testing

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }
    console.log("server is running on port | This Sarwar : "+PORT)
})