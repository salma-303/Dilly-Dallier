var mysql = require('mysql2');

var con = mysql.createConnection({
  host: 'cai.aast.edu',
  port:3306,
  user: 'web_12',
  password: "9399",
  database:'web_12'
});

con.connect((err)=> {
  if (err){
    console.log('erorr',err.message);
  }else{
    console.log('connected');
    const query='INSERT INTO player (username,email) VALUES ("xxx","xxx")';
    con.query(query,(err,result)=>{
        if (err){
            console.log('erorr',err.message);
        }else{
            console.log('blal',result)
        }
    });
  }
});