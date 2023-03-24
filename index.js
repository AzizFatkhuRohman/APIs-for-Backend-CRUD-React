import  express  from "express";
import mysql from "mysql";
const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crudnode"
})
if(!db){
    console.log("Database Not Connected")
}else{
    console.log("Database Connected")
}

app.get('/',(req,res)=>{
    res.json("Hallo Word!")
})
app.get("/artikel", (req,res)=>{
    const q = "SELECT * FROM artikel ORDER BY id DESC"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/artikel", (req,res)=>{
    const q = "INSERT INTO artikel (`judul`, `content`, `penulis`) VALUES (?)"
    const values = ["ini judul", "ini Content", "ini nama Penulis"]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.listen(5000, ()=>{
    console.log("Connected to Backend")
})