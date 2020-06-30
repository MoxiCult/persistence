const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db')

// Record a new grade
router.get('/new/grade/', (req, res)=>{
    let filePath = path.resolve(__dirname, '..', 'static/grade/recordGrade.html')
    res.sendFile(filePath)
})

router.post('/new/grade/',(req,res)=>{
    let id = req.body.id;
    let assignment = req.body.assignment;
    let grade = req.body.grade;

    const query = `INSERT into grades (id, assignment, grade) values (${id}, ${assignment}, ${grade});`

    db.query(querh)
    .then(result=>{
        res.redirect('back');
    })
    .catch(err=>{
        res.json(err);
    })
})

module.exports=router