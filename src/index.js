
const express = require('express')

// const User = require('./models/user')
// const Task = require('./models/task')
const garbgeRouter = require('./routers/garbage')
// const taskRouter = require('./routers/task')



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(garbgeRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

