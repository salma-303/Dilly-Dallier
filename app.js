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
//------------------>
app.listen(7070,()=>{console.log('listening...')});