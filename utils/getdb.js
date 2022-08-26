const fs = require('fs')
const {promisify} = require('util')
const path = require('path')

const readFile = promisify(fs.readFile)
const dbPath = path.join(_dirname,'./data.json')

exports.getDb = async () =>{
    const data = await fs.readFile()
}