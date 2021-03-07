const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/authModel')

const secret = process.env.SECRET_KEY

exports.register = (req, res) => {
  const hashpass = bcrypt.hashSync(req.body.password, 8)
  const { first_name, last_name, user_name, email } = req.body
  User.create({ first_name, last_name, user_name, email, password: hashpass },
    (err, result) => {
      if (err) res.send(err)
      else res.send(result)
    })
}

exports.login = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }, { _id: 0, email: 1, password: 1, user_name: 1 },
    (err, result) => {
      if (err) res.send(err)
      else {
        if (result) {
          const validpass = bcrypt.compareSync(password, result.password)
          if (validpass) {
            const token = jwt.sign({ data: result.user_name }, secret, { expiresIn: 60 * 60 })
            res.send({ token })
          }
          else {
            res.send('Wrong credentials')
          }
        }
        else {
          res.send('Enail is not registered')
        }
      }
    })
}

exports.details = (req, res) => {
  const auth = req.header('Authorization').split(' ')[1]
  jwt.verify(auth, secret, (err, decoded) => {
    if (decoded) {
      User.findOne({ user_name: decoded.data }, {
        _id: 0,
        first_name: 1,
        last_name: 1,
        user_name: 1,
        email: 1
      }, (err, result) => {
        res.send(result)
      })
    }
    else {
      res.send('Token expired')
    }
  })

}