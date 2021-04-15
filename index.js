require('dotenv').config()

const { env: { PORT = 8080, MONGODB_URL }} = process

const express = require('express')
const { getPhones } = require('./routes')
const { cors } = require('./mid-wares')
const { mongoose } = require('./data')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express()

        app.use(cors)

        app.get('/phones', getPhones)

        app.listen(PORT, () => console.log(`🚀 server up and running on port ${PORT}`))

        process.on('SIGINT', () => {
            console.log('🛑 server abruptly stopped')

            process.exit(0)
        })
    })