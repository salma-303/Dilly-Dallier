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
app.set('Views',__dirname+'/views');
app.set('veiws engin','pug'); 
//--------------------database
const sql = require('mysql2');
const express = require("express");
const argon=require("argon2");
var con = sql.createConnection({
    host: process.env.host,
    port: process.env.port,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password
});
//------------------>load_data

//------------------>code
app.get('/',(req,res)=>{
    return res.redirect('first.html');
})
app.post('/loginAction',(req,res)=>{
    var email = req.body.email;
    var pass = req.body.pass;
    var index = users.findindex((x)=> x.email==email && x.pass==pass);
    if(index>-1)  res.redirect('/profile.html');
    
})
//------------------>
app.listen(7777,()=>{console.log('listening...')});