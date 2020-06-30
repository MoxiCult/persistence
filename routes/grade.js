const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db')

//create table grades ( id serial primary key, assignment varchar(100) not null, grade integer not null, student_id integer not null REFERENCES students(id));

// Record a new grade
router.get('/new/grade/', (req, res)=>{
    let filePath = path.resolve(__dirname, '..', 'static/grade/recordGrade.html')
    res.sendFile(filePath)
})

router.post('/new/grade/',(req,res)=>{
    let id = req.body.studentId;
    let assignment = req.body.assignment;
    let grade = req.body.grade;
    console.log(req.body)

    const query = `INSERT into grades (student_id, assignment, grade) values (${id}, '${assignment}', '${grade}');`
    console.log(query)
    db.query(query)
    .then(result=>{
        res.redirect('back');
    })
    .catch(err=>{
        res.json(err);
    })
})

// Get grade by student id
router.get('/get/:studentId', (req,res)=>{
    let html = `<h3>Student Grades</h3>`
    html += `<table><tr><th>Assignment</th><th>Grade</th></tr>`
    const query = `SELECT * from grades WHERE student_id=${req.params.studentId}`
    db.query(query)
    .then(results=>{
        results.rows.forEach(dict=>{
            html+=`<tr><td>${dict.assignment}</td><td>${dict.grade}</td></tr>`
        })
        html+=`</table>`
        res.send(html)
    })
    .catch(err=>{
        res.send(err);
    })
})

module.exports=router