const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const config = require('./config')
const app = express()

const moviesRouter = require('./src/routes/movies')
const user = require('./src/routes/users')
const ResultRouter = require('./src/routes/results')
const usersRouter = require('./src/routes/users')



mongoose.connect(config.MONGODB_URL)
.then(() => console.log('mongodb connected ...'))
.catch(e => console.log(`failed to connect mongodb: ${e}`))

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true
}
console.log(config, config.MONGODB_URL)


//프록시를 설정해서 cors에러 처리하기 
//https://velog.io/@lsx2003/CS-React-%EB%A6%AC%EC%95%A1%ED%8A%B8-Proxy-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0


app.use(cors(corsOptions))
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api/moviesdata', moviesRouter)
app.use('/api/users', user)
app.use('/api/result', ResultRouter)
app.use('/api/users', usersRouter)


app.listen(5201, () => {
  console.log('server is running on port 5201...')
})