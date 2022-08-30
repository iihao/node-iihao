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

app.get('/todos', async (req, res, next) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (error) {
    next(error)
  }
})

app.get('/todos/:id', async (req, res, next) => {
  try {
    const dbId = await getDb()
    const todo = dbId.todos.find((val) => val.id === parseInt(req.params.id))
    if (!todo) {
      return res.status(404).json({ error: 404 })
    } else {
      res.status(200).json(todo)
    }
  } catch (error) {
    next(error)
  }
})

app.post('/todos', async (req, res, next) => {
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
    next(error)
  }
})

app.patch('/todos/:id', async (req, res, next) => {
  try {
    const todo = req.body
    const db = await getDb()
    const newDb = db.todos.find((val) => val.id === parseInt(req.params.id))
    if (!newDb) {
      return res.status(404).end()
    }
    Object.assign(newDb, todo)
    await saveDb(db)
    res.status(200).json(newDb)
  } catch (error) {
    next(error)
  }
})

app.delete('/todos/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const db = await getDb()
    const todos = db.todos
    const todoIndex = todos.findIndex((val) => val.id === id)
    console.log(todoIndex)
    if (todoIndex === -1) {
      return res.status(404).end()
    }
    todos.splice(todoIndex, 1)
    await saveDb(db)
    res.status(204).json({ status: '成功' })
  } catch (error) {
    next(error)
  }
})
module.exports = app
