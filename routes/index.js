var express = require('express')
var fs = require('fs')
var app = express.Router()

/* GET home page. */
app.get('/', function (req, res, next) {
  console.log(req.query)
  res.render('index', { title: 'Express' })
})

// 在根路径响应post请求
app.post('/', (req, res) => {
  res.send('Post request')
})
// 在/user路径响应put请求
app.put('/user', (req, res) => {
  res.send('Put request at /user')
})
// 在/user路径响应delete请求
app.delete('/user', (req, res) => {
  res.send('Delete request at /user')
})

app.get('/todos', (req, res) => {
  fs.readFile('./data.json','utf-8',(err,data)=>{
    if(err){
      res.status(500).json({
        error:err.message
      })
    }
    const db = JSON.parse(data)
    res.status(200).json(db.todos)
  })
})

app.get('/todos/:id',(req,res) =>{
  fs.readFile('./data.json','utf-8',(err,data)=>{
    if(err){
      res.status(500).json({
        error:err.message
      }
      )
    }

    const dbId = JSON.parse(data)
    const todo = dbId.todos.find((val)=> val.id === parseInt(req.params.id))
    if(!todo){
      return res.status(404)
    }
    res.status(200).json(todo)
  })
})
module.exports = app
