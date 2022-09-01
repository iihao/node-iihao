# 快速开始
1.定义集合架构
    import mongoose from 'mongoose'
    const {Schema} = mongoose
    const userSchema = new Schema({
        //字段名：字段类型
        userName:String,
        userName:{type:String} 
        //字段名{字段属性--类型，默认值}
        userId:{type:Number,default:0}
    })

2.创建模型
    //mongoose.model('集合名',架构)
    const user = mongoose.model('user',userSchema)