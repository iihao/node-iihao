const express = require('express')
const fs = require('fs')
const { getDb, saveDb } = require('../utils/getdb')
const app = express.Router()

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

app.get('/todos', async (req, res) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.get('/todos/:id', async (req, res) => {
  try {
    const dbId = await getDb()
    const todo = dbId.todos.find((val) => val.id === parseInt(req.params.id))
    if (!todo) {
      return res.status(404).json({ error: 404 })
    } else {
      res.status(200).json(todo)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/todos', async (req, res) => {
  try {
    const todo = req.body
    console.log(todo)
    if (!todo.name) {
      res.status(422).json({
        error: '必须有name值'
      })
    } else {
      const db = await getDb()
      const todoMaxId = db.todos[db.todos.length - 1].id
      todo.id = parseInt(todoMaxId) ? todoMaxId + 1 : 1
      todo.name = todo.name || ''
      todo.password = todo.password || '123456'
      db.todos.push(todo)
      await saveDb(db)
      res.status(200).json(todo)
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})
module.exports = app
