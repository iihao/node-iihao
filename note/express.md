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

    req.params.id 获取动态路径
    
    res.statusCode=201  //设置响应状态码
    res.write('')   //发送响应（响应结果）
    res.send({'发送内容'}) 可发送对象
    res.json() //只发送json数据
    res.end(‘响应数据’)   //结束响应
    res.status(201).send('') 发送响应并返回状态码
    res.cookie('','') 发送cookie key+value

## 案例
    添加fs文件处理模块
    const fs = request('fs')
    fs.readFile('文件路径',编码utf-8，回调函数(err,data))

    es6 find(value => {} ) value 返回条件为true的结果

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

    const path = request('path')
    path.join(__,/)