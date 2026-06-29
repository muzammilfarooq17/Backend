const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello Habiba Mai Agyyya")
})

app.get("/about",(req,res)=>{
    res.send("Hello Subhuu Mai AGyaaa Beta")
})

app.listen(4000)