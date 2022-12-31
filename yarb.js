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
const secret="W#defaJEO*@##321";
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
//------------------>pug directory 
app.set('Views',__dirname+'/views');
app.set('veiws engin','pug'); 
//--------------------database
const sql = require('mysql2');
const argon=require("argon2");
const { Script } = require('vm');
var con = sql.createConnection({
    host: "cai.aast.edu",
    port: 3306,
    database:'web_12',
    user:"web_12",
    password:"9399"
});
//---------------->code
app.get('/',(req,res)=>{
    return res.redirect('first.html');
})
//===============register
app.post('/regAction',(req,res)=>{
    var name = req.body.namereg;
    var email = req.body.emailreg;
    var pass1 = req.body.pass1;
    var pass2=req.body.pass2;
    var accept = req.body.accept;
    if(name.trim()=="" || pass1.trim()=="" || pass2.trim()=="" || accept==undefined){
          return res.redirect('first.html');
    }
    if(pass1!=pass2){
        return res.status(400).send({messge: "passwords are not the same"});
    }
    con.connect((err)=>{
        if(err){
            console.log('err',err.message);
        }else{
            console.log('connected');
            const query="INSERT INTO player (username,email) VALUES (?,?)";
            con.query(query,[name,email],
                async(err,result)=>{
                    if(err){
                        console.log("err",err.message);
                    }else{
                        const id = result.insertId;
                        const hashpass = await argon.hash(pass1);
                        const hashpas = await argon.hash(pass2);
                        const query1 = "INSERT INTO auth (username,password) VALUES (?,?)"
                        con.query(query1,[name,hashpass], 
                        (err,result2)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send({message:"Failed to login", data:null});
                                console.log("yarbbb");
                                return;
                            }else{
                                var token=jwt.sign({email:email},secret,{expiresIn:"1d"});
                        res.cookie('TOKEN',token,{maxAge:10*10000});
                        res.redirect('/profile');
                            }
                        });

                    }
                }
            )
        }
    })


});
//==============login
app.post('/regAction',async (req,res)=>{
    var email = req.body.email;
    var pass = req.body.pass;
    console.log("yarabbbbbbbbbbb")
    const hashpass = await argon.hash(pass);
    con.connect((err)=>{
        if(err){
            console.log('err',err.message);
        }else{
            console.log('connected');
            const query="Select * From player , auth where `player`.`username` = (?) AND `auth`.username =`player`.username AND `auth`.password = (?) ";
            con.query(query,[email,hashpass],
                async (err,result)=>{
                    if(err){
                        console.log("err",err.message);
                    }else{
                        var token=jwt.sign({email:email},secret,{expiresIn:"1d"});
                        res.cookie('TOKEN',token,{maxAge:10*100000});
                        res.redirect('/profile');
                    }
                }
            )
        }
    })

});
//+++++++++++++++++++++


//--------------->initialize server
app.listen(3306,()=>{console.log('listening...')});