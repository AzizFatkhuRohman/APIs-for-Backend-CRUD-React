import  express  from "express";
import mysql from "mysql";
import cors from "cors"
const app = express()
app.use(cors())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crudnode"
})
app.use(express.json())
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
    const values = [
        req.body.judul,
        req.body.content,
        req.body.penulis
    ]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Create articles succesfully")
    })
})
app.delete("/artikel/:id", (req,res)=>{
    const artikelId = req.params.id
    const q = "DELETE FROM artikel WHERE id=?"
    db.query(q,[artikelId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Delete articles succesfully")
    })
})
app.listen(5000, ()=>{
    console.log("Connected to Backend")
})