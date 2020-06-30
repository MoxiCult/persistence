const express= require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true })); 

// Routes
const studentRouter = require('./routes/student')
const gradeRouter = require('./routes/grade.js');

const db = require('./db')
app.use('/student', studentRouter);
app.use('/grade', gradeRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to the DB front end!')
})


app.listen(port)

module.exports=app;