const Coupan = require('../models/coupanModel')
const User = require('../models/authModel')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY


exports.addCoupan = (req, res) => {
  const auth = req.header('Authorization').split(' ')[1]
  const cdetails = req.body

  jwt.verify(auth, secret, (err, decoded) => {
    if (decoded) {
      User.findOne({ user_name: decoded.data }, { _id: 0, user_name: 1 }, (err, uresult) => {
        if (uresult) {
          cdetails['createdBy'] = uresult.user_name
          Coupan.create(cdetails, (err, cresult) => {
            res.send(cresult)
          })
        }
      })
    } else {
      res.send('Token expired')
    }
  })
}
exports.list = (req, res) => {
  const auth = req.header('Authorization').split(' ')[1]
  jwt.verify(auth, secret, (err, decoded) => {
    if (decoded) {
      Coupan.find((err,result)=>{
        res.json(result)
      })
    } else {
      res.send('Token Expired')
    }
  })
}
exports.single=(req,res)=>{
  const auth = req.header('Authorization').split(' ')[1]
  jwt.verify(auth, secret, (err, decoded) => {
    if (decoded) {
      Coupan.findById(req.params.id,(err,result)=>{
        res.send(result)
      })
    } else {
      res.send('Token Expired')
    }
  })
}