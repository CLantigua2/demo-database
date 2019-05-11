const express = require('express')
const server = express()
const middleWare = require('./config/middleware')
const { userRouter } = require('./routes/')

middleWare(server)

server.use(express.json())
server.use('/users/', userRouter)

server.get('/', (req, res) => {
    res.status(200).send({ message: "Server is running" })
})

module.exports = server