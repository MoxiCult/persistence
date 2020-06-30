const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('./../db')

//
// Return list of all students
function fetchAllStudents(req,res){
    const query = ` SELECT * FROM students`;
    let html = `<h3>Current Students</h3>`
    html += `<table><tr><th>ID</th><th>Name</th></tr>`
    let names = ''
    db.query(query)
    .then(results=>{
        results.rows.forEach(dict=>{
            html+=`<tr><td>${dict.id}</td><td>${dict.fname} ${dict.lname}</td></tr>`
        })
        html+=`</table>`
        res.send(html)
    })
    .catch(err=>{
        res.send(err);
    })
}

// Search for student record
function searchForStudent(req,res){
    let param = req.query.search;
    console.log(param)
}

// Return list of all students
router.get('/', (req, res)=>{
    if (req.query.search){
        searchForStudent(req,res);
    }
    else{
        fetchAllStudents(req,res);
    }
});

// Return student name by id
router.get('/get/:studentId', (req,res)=>{
    let html = `<h3>Student</h3>`
    html += `<table><tr><th>ID</th><th>Name</th></tr>`
    const query = `SELECT * from students WHERE id=${req.params.studentId}`
    db.query(query)
    .then(results=>{
        results.rows.forEach(dict=>{
            html+=`<tr><td>${dict.id}</td><td>${dict.fname} ${dict.lname}</td></tr>`
        })
        html+=`</table>`
        res.send(html)
    })
    .catch(err=>{
        res.send(err);
    })
})

// New Student FOrm
router.get('/new/student/', (req, res)=>{
    let filePath = path.resolve(__dirname, '..', 'static/student/enterStudentForm.html')
    res.sendFile(filePath)
})

// Submit New Student Form
router.post('/new/student/', (req, res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;

    const query = `INSERT into students (fname, lname) VALUES ('${fname}', '${lname}')`

    db.query(query, (err,results)=>{
        if(err){
            res.send(err)
        }
        else{
            res.redirect('back')
        }
    })

    
})

// Searh for student by name
router.get('/search/', (req,res)=>{
    if(req.query.search){
        let name = req.query.search;
        let query = `SELECT * from students WHERE lname LIKE '${name}%'`
        console.log(query)
        db.query(query)
        .then(result=>{
            res.json(result.rows)
        })
        .catch(err=>{
            res.json(err);
        }) 
    }
    else{
        let filePath = path.resolve(__dirname, '..', 'static/student/search.html');
        res.sendFile(filePath)
    }
})


module.exports=router