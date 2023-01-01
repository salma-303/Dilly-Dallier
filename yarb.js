// --------------->import express
const express = require('express');
var app = express();
//---------------->file system
const fs = require('fs');
/*==================================
 body-parser express middleware reads
 a form's input and stores it as a js
 object accessible through req.body
 ==================================*/
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//------------------> keep track of user action using cookie parser
const secret = "W#defaJEO*@##321";
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//------------------>pug directory 
app.set("view engine", "pug");
app.set('Views', __dirname + '/views');
//--------------------database
const sql = require('mysql2');
const argon = require("argon2");
const { Script } = require('vm');
var con = sql.createConnection({
    host: "cai.aast.edu",
    port: 3306,
    database: 'web_12',
    user: "web_12",
    password: "9399"
});
//---------------->code
app.get("/", (req, res) => {
    return res.redirect('/first.html');
})
//===============register
app.post('/regAction', (req, res) => {
    var name = req.body.namereg;
    var email = req.body.emailreg;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    var accept = req.body.accept;
    if (name.trim() == "" || pass1.trim() == "" || pass2.trim() == "" || accept == undefined) {
        return res.redirect('first.html');
    }
    if (pass1 != pass2) {
        return res.status(400).send({ messge: "passwords are not the same" });
    }
    con.connect((err) => {
        if (err) {
            console.log('err', err.message);
        } else {
            console.log('connected');
            const query = "INSERT INTO player (username,email) VALUES (?,?)";
            con.query(query, [name, email],
                async (err, result) => {
                    if (err) {
                        console.log("err", err.message);
                    } else {
                        const id = result.insertId;
                        const hashpass = await argon.hash(pass1);
                        const hashpas = await argon.hash(pass2);
                        const query1 = "INSERT INTO auth (username,password) VALUES (?,?)"
                        con.query(query1, [name, hashpass],
                            (err, result2) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send({ message: "Failed to login", data: null });
                                    console.log("yarbbb");
                                    return;
                                } else {
                                    const query = `SELECT * FROM player WHERE  player.username = '${result2[0].username}'`;
                                    con.query(query,
                                        async (err, result3) => {
                                            if (err) {
                                                console.log("err", err.message);
                                                return res.end("email does not exsit")
                                            } else {
                                                console.log(result3[0])
                                                var token = jwt.sign(result3[0], secret, { expiresIn: "1d" });
                                                try {
                                                    var data = jwt.verify(token, secret);
                                                    console.log(data)
                                                } catch (err) {
                                                    console.log(err);
                                                }
                                                res.cookie('TOKEN', token, { maxAge: 10 * 10000 });
                                                console.log(result3)
                                                console.log(token)
                                                res.redirect('/profile');
                                            }
                                        })
                                }
                            }
                        );

                    }
                }
            )
        }
    })

});
//==============login
app.post('/loginAction', (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;
    console.log("yarabbbbbbbbbbb")
    con.connect((err) => {
        if (err) {
            console.log('err', err.message);
        } else {
            console.log('connected');
            const query = `SELECT * FROM player , auth WHERE player.email = '${email}' AND auth.username = player.username`;
            con.query(query,
                async (err, result) => {
                    if (err) {
                        console.log("err", err.message);
                        return res.end("email does not exsit")
                    } else {
                        console.log(result)
                        if (result.length == 0) {
                            return res.end("email does not exsit")
                        } else {
                            if (await argon.verify(result[0].password, pass)) {
                                // res.end(result[0].email,result[0].username);
                                const query = `SELECT * FROM player WHERE player.email = '${email}' AND player.username = '${result[0].username}'`;
                                con.query(query,
                                    async (err, result2) => {
                                        if (err) {
                                            console.log("err", err.message);
                                            return res.end("email does not exsit")
                                        } else {
                                            console.log(result2[0])
                                            var token = jwt.sign(result2[0], secret, { expiresIn: "1d" });
                                            try {
                                                var data = jwt.verify(token, secret);
                                            } catch (err) {
                                                console.log(err);
                                            }
                                            res.cookie('TOKEN', token, { maxAge: 10 * 10000 });
                                            console.log(result2)
                                            console.log(token)
                                            res.redirect('/profile');
                                        }
                                    })
                                } else {
                                    return res.end("wrong passowrd");
                                }
                        }


                    }
                }
            )
        }
    })

});
//+++++++++++++++++++++
var data;
app.get('/profile', (req, res) => {
    cookies=req.cookies;
    console.log("profile")
    console.log(!cookies)
    if(!cookies || !cookies.TOKEN || cookies.TOKEN==""){
        return res.redirect('first.html');
    }
    try{
        data = jwt.verify(cookies.TOKEN,secret);
        const query = `SELECT * FROM player WHERE player.email = '${data.email}' AND player.username = '${data.username}'`;
        con.query(query,
            async (err, result) => {
                if (err) {
                    console.log("err", err.message);
                } else {
                   if(result.length==0){ 
                     res.redirect("/first.html")
                    console.log(result.length)
                    console.log("email does not exist")
                   }else{
                      res.end("welcome")
                   }
                }
            })
    }catch(e){
        if(e instanceof jwt.JsonWebTokenError){
            return res.end('token expired');
        }
        return res.end('invalid token');
    }
})
//----------------dashboard
app.post("/snake",(req,res)=>{
    res.redirect("/games")
})
app.get("/games", (req, res) => {
    const query = `SELECT * FROM games,scores,player WHERE  games.game_id=1 AND player.pid=scores.pid ORDER BY scores.score DESC `;
        con.query(query,
            async (err, result) => {
                if (err) {
                    console.log("err", err.message);
                } else {
                   if(result.length==0){ 
                     res.redirect("/first.html")
                    console.log(result.length)
                    console.log("no players")
                   }else{
                    console.log(result);
                    res.render('games', {result:result});
                   }
                }
            })
});
//----------------games score

//--------------->initialize server
app.listen(3306, () => { console.log('listening...') });