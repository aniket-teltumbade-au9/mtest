const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const chalk = require('chalk')
const db = require('./db')
const authRouter = require('./routes/authRouter')
const coupanRouter = require('./routes/coupanRouter')
const validateRouter = require('./routes/validateRouter')

const app = express()

const port = process.env.PORT || 8989

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

db()

app.use('/user', authRouter)
app.use('/coupan',coupanRouter)
app.use('/valid',validateRouter)

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, (err) => {
  console.log(chalk.bgBlue(`http://localhost:${port}`))
})