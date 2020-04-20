const express = require('express')
const mysql = require('mysql')

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'node_sql'
});

//connect
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log("connected")
})
const app = express();

// create db
app.get('/createdb', (req, res)=> {
    let sql ='CREATE DATABASE node_sql'
    db.query(sql,(err, result)=>{
        if(err)  throw err;
        console.log(result)
        res.send('database created....')
    })
})

// create table
app.get('/createtable',(req, res)=> {
    let sql = `CREATE TABLE posts (
        id int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL, 
        body varchar(255),
        PRIMARY KEY (id)
        )`
    db.query(sql, (err, result)=> {
        if(err) throw err;
        console.log(result)
        res.send("table is created")
    })
})

// INSERT DATA
app.get('/addposts', (req, res)=> {
    let post ={
        title:"post3",
        body:"post number 3"
    }
    let sql ='insert into posts set ?'
    let query = db.query(sql, post,(err, result)=> {
        if(err) throw err;
        res.send('data is inserted')
    })
})

//select post
app.get('/getpost/:id', (req, res)=>{
    let sql =`select * from posts where id = ${req.params.id}`;
    let query=db.query(sql, (err, result)=> {
        if(err) throw err;
        console.log(result)
        res.send("posts fetched...")
    })
})

//update post
app.get('/updatepost/:id', (req, res)=>{
    let newTitle = "updated title"
    let sql =`update posts set title= '${newTitle}' where id = ${req.params.id}`;
    let query=db.query(sql, (err, result)=> {
        if(err) throw err;
        console.log(result)
        res.send("post is updated")
    })
})

// delete post
app.get('/deletepost/:id', (req, res)=>{
    let sql =`delete from posts where id = ${req.params.id}`;
    let query=db.query(sql, (err, result)=> {
        if(err) throw err;
        console.log(result)
        res.send("posts deleted...")
    })
})

app.listen('3000',()=> {
    console.log("server start on port 3000")
});