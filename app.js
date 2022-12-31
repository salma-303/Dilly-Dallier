// --------------->import express
const express=require('express');
var app= express();
//---------------->file system
const fs = require('fs');
/*==================================
 body-parser express middleware reads
 a form's input and stores it as a js
 object accessible through req.body
 ==================================*/
const bodyparser =require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));
//------------------> keep track of user action using cookie parser
const cookieParser = require('cookie-parser');
//------------------>pug directory 
app.set('views',__dirname+'/views');
app.set('veiws engin','pug'); 
//--------------------database
const sql = require('mysql2');
const argon=require("argon2");
require("dotenv").config()
var con = sql.createConnection({
    host: process.env.host,
    port: process.env.port,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password
});
// var con = sql.createConnection({
//     host: "cai.aast.edu",
//     port: 3306,
//     database:'web_12',
//     user:"web_12",
//     password:"9399"
// });
//------------------>code
app.get('/',(req,res)=>{
    return res.redirect('first.html');
})
//+++++++++++++++++++++
app.post('/regAction',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var pass1 = req.body.pass1;
    var pass2=req.body.pass2;
    var accept = req.body.accept;
    console.log(name);
    console.log("yarbbb");
    if(name.trim()=="" || pass1.trim()=="" || pass2.trim()=="" || !accept){
        return res.redirect('first.html')
    }
    if(pass1!=pass2){
        return res.status(400).send({messge: "passwords are not the same"});
    }
    console.log("befor err");
    con.conect("INSERT INTO player (name,email) VALUES (?,?)",[name,email],
        async (err,result)=>{
        if(err){
            console.log(err);
            console.log("here");
            res.status(500).send({message:"Failed to register", data:null});
            return;
        }
       const id = result.insertId;
       const hashpass = await argon.hash(pass1);
       const hashpas = await argon.hash(pass2);
       con.conect("INSERT INTO auth (username,password) VALUES (?,?)",[name,hashpass], 
        (err,result2)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:"Failed to register", data:null});
                console.log("yarbbb");
                return;
            }
            res.status(201).send({message:"Done",data:{id,username}});   
        });
       }
    );
});
//++++++++++++++++++++++++
app.post('/loginAction',(req,res)=>{
    var email = req.body.email;
    var pass = req.body.pass;
    var index = users.findindex((x)=> x.email==email && x.pass==pass);
    if(index>-1)  res.redirect('/profile.html');
    
})
//------------------>
const port = process.env.port;
app.listen(3306,()=>{console.log('listening...')});