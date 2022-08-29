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