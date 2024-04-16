const express=require('express')
const mongoose=require('mongoose')
const config=require('config')
const authRouter = require('./routes/auth.routes')

const app=express()
const PORT=config.get('serverPort')
const dbUrl=config.get('dbUrl')

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        mongoose.connect(dbUrl)

        app.listen(PORT, ()=>console.log(`Server is working on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()