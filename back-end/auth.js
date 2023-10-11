const express = require('express')
const app = express()
const config = require('./config')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// 쿠키 테스트
app.use(cookieParser())

//토큰 생성
const makeToken = (user) => {
  return jwt.sign({
    _id: user._id,
    userId: user.userId,
    email: user.email,
    isAdmin: user.isAdmin,
    likeGenre: user.likeGenre,
    createdAt: user.createdAt    
  },
  config.JWT_SECRET,
  {
    expiresIn: '1d',
    issuer: 'mood'
  })
}

//사용자 권한 검증
const isAuth = (req, res, next) => {
  const token = req.headers.authorization

  // console.log(token)
  if(!token){
    res.status(401).json({code: 401, message: '토큰이 유효하지 않습니다.'})
  }else{
    // const token = bearerToken.slice(7, bearerToken.length)

    jwt.verify(token, config.JWT_SECRET, (err, userInfo) => {
      if(err && err.name === 'TokenExpiredError'){
        res.status(419).json({code: 419, message: '토큰이 만료되었습니다.'})
      }else if(err){
        res.status(401).json({code: 401, message: '토큰 확인중에 문제가 생겼습니다.'})
      }else{
        req.user = userInfo
        next()
      }
    })
  }
}

//관리자 권한 검증
const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next()
  }else{
    res.status(401).json({code: 401, message: '당신은 관리자가 아닙니다.'})
  }
}

module.exports = {
  makeToken,
  isAuth,
  isAdmin
}