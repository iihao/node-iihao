# 路由
## 路由基础
    每个路由可以具有一个或多个处理程序函数，这些函数在匹配该路由时执行。
    路由定义采用了以下结构
    app.method(path,handler)
    app代表express实例
    method是http请求方法（get/post）
    path是服务器上的路径
    handler是当路由匹配时要执行的功能

    示例：
    // get响应Hello World!
    app.get('/',(req,res)=>{
        res.send('Hello World')
    })
    // 在根路径响应post请求
    app.post('/',(req,res)=>{
        res.send('Post request')
    })
    // 在/user路径响应put请求
    app.put('/user',(req,res)=>{
        res.send('Put request at /user')
    })
    // 在/user路径响应delete请求
    app.delete('/user',(req,res)=>{
        res.send('Delete request at /user')
    })

## 请求和响应
    request response
    Express不对Node.js已有的特性进行二次抽象，只是在它之上扩展了web应用所需的基本功能，内部使用的还是http模块，请求对象继承自http.IncomingMessage
    响应对象继承自http.ServerResponse

    req.params.id 获取动态路径(/user/:id)
    req.query.id (localhost:3000/?id=2,得到2)
    req.body  用在post请求当中,req.body.username获取用户名
    
    res.statusCode=201  //设置响应状态码
    res.write('')   //发送响应（响应结果）
    res.send({'发送内容'}) 可发送对象
    res.json() //只发送json数据
    res.end(‘响应数据’)   //结束响应
    res.status(201).send('') 发送响应并返回状态码
    res.cookie('','') 发送cookie key+value

## 路由路径
    Express 使用path-to-regexp来匹配路由路径
    字符串模式 '/ab?cd'  匹配acd  abcd
    '/ab*cd'  匹配 ab12cd  abesdcd
    '/ab(cd)?e' 匹配abe  abcde
    正则表达路径 /a/  匹配所有带a的任何内容
    /.*fly$/  匹配butterfly  不匹配butterflyman 所有以fly结尾的

## 路径参数
    req.params.id 获取 '/users/:id/1'

    通过- 或 . 分割
    'users/:id-:name'  传入url:user/23-hq
    req.params.id=23   req.params.name=hq

    正则表达式 '/user/:userId(\d+)' 只传数字


## 案例
### 基础知识点
    添加fs文件处理模块
    const fs = request('fs') 
    fs.readFile('文件路径',编码utf-8，回调函数(err,data)) 以异步的方式读取文件内容。

    es6 find(value => {} ) value 返回条件为true的结果

    const path = request('path')
    path.join(_dirname,/)  将多个参数字符串合并成一个路径字符串
    __dirname：用来动态获取当前文件模块所属目录的绝对路径(必须两个下划线，不然打包报错)
    __filename：用来动态获取当前文件的绝对路径

    const {promisify} = require('util')
    promisify() 将基于回调的函数转换为基于 Promise 的函数。

### get请求
    app.get('/todos',(req,res) =>{
        fs.readFile('./db.json','utf-8',(err,data) =>{
            if(err){
                res.status(500).json({
                    error:err.message
                })
            }
            const db = JSON.parse(data)
            res.status(200).json(db.todos)
        })
    })

### post请求
1.获取客户端请求体
    常见请求体格式(json   x-www-form-urlencoded)
    app.use(express.json())  //配置解析表单请求体 application/json
    app.use(express.urlencoded)  //配置解析表单请求体 x-www-form-urlencoded
    获取请求数据：const todo = req.body
2.数据验证
    if(!todo.xxx){
        return res.status(422).json({
            error:''
        })
    }
3.数据验证通过，把数据存储到db
    writeFiles(path,data)

4.发送响应
    res.status(200).json(todo)

### patch请求
    object.assign(data,data2,data3)的用法：
        1、对象的合并；
        2、合并具有相同属性的对象；
        3、属性被后续参数中具有相同属性的其他对象覆盖。
    

# 中间件
面向切面编程（AOP），不去修改自己的代码，以此来扩展或处理一些功能
app.use((req.res.next)=>{
    next() //调用下一个匹配的中间件 
}) //可以匹配所有请求
    req 请求对象 
    res 响应对象
    next 下一个中间件
    中间件的顺序很重要，任何请求都是从上往下匹配
    路由也是中间件

将比较公共的业务逻辑代码，比如日志记录，性能统计，事务处理，异常处理
独立划分出来，通过对这些行为的分离，将它们独立到非指导业务逻辑的方法中，进而改变这些行为的时候不影响业务的代码。
1.降低程序耦合度  2.提高程序的可复用性 3.提高开发效率和可维护性
核心概念：在程序生命周期中加减一个功能不影响原有功能

注意：如果当前的中间件功能没有结束请求-响应周期，必须调用next()将控制权传递给下一个中间件功能，不然改请求会被挂起。

## 应用程序级别中间件
不关心请求路径  
app.use((req,res,next)=>{
    console.log('time',Date.now())
    next()
})

限定请求路径 
app.use('/user',(req,res,next)=>{
    console.log('time',Date.now())
    next()
})

限定请求方法+请求路径（路由）
app.get('/user',(req,res,next)=>{
    console.log('time',Date.now())
    next()
})

多个处理函数
app.use('/user',()=>{
    xxx
    next() //下一个
},()=>{
    xxx
    next() //这个next会脱离当前处理栈，往后查找匹配调用
})

为一个路径定义多个处理中间件
app.get('/user',()=>{
    xxx
    next() //下一个
},()=>{
    xxx
    next() //这个next会脱离当前处理栈，往后查找匹配调用
})

next('route') 跳过当前处理栈所有的中间件，往后匹配


## 路由器级别中间件

const express = require('express')
//1、创建路由实例 相当于一个mini Express实例
const router = express.Router()

//2、配置路由
router.get('/user',(req.res)=>{
    res.send('get/user')
})

//3、导出路由实例
module.exports = router

//4、将路由挂载集成到Express实例
const router = require('./router')
app.use('前缀',router) 可以给路由限定访问浅醉


## 错误处理中间件
错误处理中间件有四个参数,一般在所有中间件之后挂载错误中间件
app.use((err,req,res,next)=>{
    console.log('错误',err)
    res.status(500).json({
        error:err.message
    })
})
将任何内容传递给next() (route除外)，Express都会讲当前请求视为错误，并且将跳过所有剩余的非错误处理路由和中间件函数

app.get('/',(req,res,next)=>{
    try{

    }
    catch(err){
        next(err) //会跳过所有非错误处理中间件，err作为参数传递给错误中间件的第一个参数
    }
})
注意：
1.错误处理中间件一定是四个参数，否则不会当成错误中间件
2.任意中间件next()传了参数，都会直接跳转到错误中间件

  中间件处理404
通常会在所有路由之后配置处理404
app.use((req,res,next)=>{
    res.status(404).send('404 Not Found')
})

## 内置中间件
express.json() 解析json格式的请求体
express.urlencoded() 解析x-www-form-urlencoded格式请求体
express.raw() 解析octet-stream格式请求体
express.text() 解析text/plain格式请求体
express.static() 托管静态资源文件

## 第三方中间件


# 接口设计

## RESTful接口设计规范
协议：API与用户的通信协议，尽量使用HTTPs协议

域名：应该尽量将API部署在专用域名下  api.xx.com
    如果API很简单，可以考虑放到主域名下 xx.com/api

版本：应该讲API的版本号放入URL  api.xx.com/v1/
    版本变动不去修改原有接口，也可将版本号放到HTTP头

路径：表示API的具体网址，网址中不能有动词，只能用名词。一般来说，数据库中的表都是同种记录的集合（collection） 所以api中的名词一般为复数

HTTP动词：get(读取) post(创建) put(完整更新)    patch(部分更新) delete(删除)
    不常用：head(获取元数据) options(获取信息)

过滤信息：如果记录数量很多，API应该提供参数，过滤返回结果。
    ?limit=10 :指定返回记录的数量
    ？offset=10 :制定返回记录的开始位置
    ？page=2 &per_page=100:指定第几页，以及每页的记录数
    ？sortby=name&order = asc :指定返回结果按照哪个属性排序，以及排序顺序
    ？animal_type_id=1:指定筛选条件
    参数的设计允许存在冗余，允许API路径和URL参数偶尔重复

状态码：状态码必须三位数
    1xx:相关信息
    2xx:操作成功
    3xx:重定向
    4xx:客户端错误
    5xx:服务端错误

返回结果：API返回的数据格式，不应该是纯文本，而应该是json对象 http头 Content-type设置为 application/json

错误处理：
    需要通过状态码反映发生的错误

身份认证：基于jwt的接口权限
    字段名：Authorization
    字段值：Bearer token数据

跨域处理：可以在服务器设置CORS允许客户端跨域资源请求


## 案例