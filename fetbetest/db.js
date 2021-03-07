const chalk = require('chalk')
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

module.exports = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('connected', () => {
    console.log(`connection on: \n  ${chalk.magenta('MONGO_URL:')} ${chalk.green(url)} \n ${chalk.magenta('SECRET_KEY:')} ${chalk.red(process.env.SECRET_KEY)} \n ${chalk.magenta('REDIS_URL:')} ${chalk.yellow(process.env.REDIS_URL)}`)
  })
}