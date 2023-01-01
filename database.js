const sql = require('mysql2');
const express = require("express");
const router = express.Router();
const argon=require("argon2");
var con = sql.createPool({
    host: process.env.host,
    port: process.env.port,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password,
    // connectionLimit:process.env.connectionLimit
});
console.log("yarb1");
router.post('/regAction',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var pass1 = req. body.pass1;
    var pass2=req.body.pass2;
    var accept = req.body.accept;
    console.log(name);
    console.log("yarbbb");
    if(!name.trim() || !pass1.trim() || !pass2.trim() || !accept){
    return res.status(400).send({messge: "Missing an input field"});
    }
    if(pass1!=pass2){
        return res.status(400).send({messge: "passwords are not the same"});
    }
    
    con.query("INSERT INTO player (name,email) VALUES (?,?,?)",
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
       con.query("INSERT INTO auth (username,password) VALUES (?,?)",[name,hashpass], 
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
router.post("/loginAction",(req,res)=>{

});
// con.connect((err)=>{
//     if(err) throw err;
//     console.log("connected");
//     con.query(sql,(err,result)=>{
//         if(err) throw err;
//         console.log("Result: "+ result);
//     });
// })
// 
// app.post('/loginAction',(req,res)=>{
//     var email = req.body.email;
//     var pass = req.body.pass;
//     var index = users.findindex((x)=> x.email==email && x.pass==pass);
//     if(index>-1)  res.redirect('/profile.html');
    
// })

module.exports = router;