const express = require('express');
const students= require("./student");

const app = express();
app.use(express.json());

app.get("/students",(req,res)=>{
    res.status(200).json(students);
});

app.get("/students/:id",(req,res)=>{
    const id = Number(req.params.id);

    const student = students.find((s) => s.id ===id);
    if(!student){
        return res.status(404).json({message:"Student not found"});
    }
    res.status(200).json(student);
});

app.post("/students",(req,res)=>{
    const {id,name,age,course} = req.body;

    if(
        typeof name !== "string" ||
        !name.trim() ||
        !Number.isFinate(age) ||
        age <=0 ||
        typeof course !== "string" ||
        !course.trim()
    ){
        return res.status(400).json({message:"Invalid student data"});
    }

    const newStudent = {id,name,age,course};

    students.push(newStudent);
    res.status(201).json(newStudent);

    res.status(201).json({message:"Student added successfully"});
});
 
const Port = process.env.PORT || 3000;

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});

