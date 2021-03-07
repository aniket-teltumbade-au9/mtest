const Coupan = require('../models/coupanModel')
const User = require('../models/authModel')
const Valid = require('../models/validateModel')
const jwt = require('jsonwebtoken')
const redis = require('redis')
const secret = process.env.SECRET_KEY

const redis_url = process.env.redis_url

const redisClient = redis.createClient({
  host: 'redis.acme.com',
  username: 'aniket',
  password: 'cldv3WHFkwrs0Ir93YKtIWZvJ7iv1u5D',
  url: '//redis-15782.c51.ap-southeast-2-1.ec2.cloud.redislabs.com:15782'
})
redisClient.on('error', function (er) {
  console.trace('Here I am');
  console.error(er.stack);
});

exports.validate = (req, res) => {
  const auth = req.header('Authorization').split(' ')[1]
  const cdetails = req.body

  jwt.verify(auth, secret, (err, decoded) => {
    if (decoded) {
      User.find({ user_name: decoded.data },{_id:0,user_name:1}, (err5, udoc) => {
        Coupan.findById(req.body.id,{_id:0,expireDate:1,website:1}, (err6, cdoc) => {
          if (udoc[0].user_name && cdoc) {
            console.log(decoded.data)
            let timediff = new Date(cdoc.expireDate) - new Date()
            console.log(timediff, new Date(cdoc.expireDate), new Date())
            if (timediff > 0) {
              
              redisClient.get(`${udoc[0].user_name}`,(err,reply)=>{
                if(reply===null){
                  Valid.create({uname:udoc[0].user_name,website:cdoc.website},(err,vres)=>{
                    /* console.log(`${udoc[0].user_name} ${cdoc.website} ${reply} ${err}`) */
                    redisClient.setex(`${udoc[0].user_name}`,60*60,JSON.stringify(vres),(err,reddoc)=>{
                      res.send(reddoc)
                    })
                    
                  })
                }
                else{
                  Valid.create({uname:udoc[0].user_name,website:cdoc.website},(err,vres)=>{
                    console.log(`${udoc[0].user_name} ${cdoc.website} ${reply} ${err}`)
                    redisClient.append(`${udoc[0].user_name}`,JSON.stringify(vres),(err,reddoc)=>{
                      let rsponse=JSON.parse(`{[${reply.replace('}{','},{')}]}`)
                      console.log(rsponse)
                      res.send(reddoc)
                    })
                    
                  })
                }
              })
            }
            else {
              res.send('Expired')
            }
          }
        })
      })
    } else {
      res.send('Token expired')
    }
  })
}