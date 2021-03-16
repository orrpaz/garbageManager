
const express = require('express')
require('dotenv').config()

// const User = require('./models/user')
// const Task = require('./models/task')
const garbgeRouter = require('./routers/garbage')
// const geocode = require('./utils/geocode')
// const taskRouter = require('./routers/task')


// const jhjg = geocode('tel aviv')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(garbgeRouter)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

