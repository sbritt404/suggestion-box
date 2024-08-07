const express = require('express')
const mongoose = require('mongoose')
const suggestionRouter = require('./routes/suggestions/suggestionRouter')

const app = express()
const port = 3000

mongoose
    .connect("mongodb://localhost:27017/movie-db")
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
            console.log('MongoDB connected.')
        })
    })

    .catch((error) => {
        console.log(error)
    })

    app.use(express.json())
    app.use('/api/suggestions', suggestionRouter)