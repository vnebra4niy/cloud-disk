const express=require('express')
const mongoose=require('mongoose')
const config=require('config')

const app=express()
const PORT=config.get('serverPort')
const dbUrl=config.get('dbUrl')

const start = async () => {
    try {
        mongoose.connect(dbUrl)

        app.listen(PORT, ()=>console.log(`Server is working on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()