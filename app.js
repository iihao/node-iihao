const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan') //日志

const http = require('http')
const { onError, onListening, normalizePort } = require('./utils/local')

const indexRouter = require('./routes/index') //路由
const errorHeadlers = require('./middleware/errorHandlers') //错误处理中间件
require('./model')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)

app.use(express.json()) //配置解析表单请求体 application/json
app.use(express.urlencoded) //配置解析表单请求体 x-www-form-urlencoded

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(errorHeadlers())

const port = normalizePort(process.env.PORT || '3030')
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () => {
  console.log('Running at http://localhost:3030')
})
server.on('error', onError)
server.on('listening', onListening)
