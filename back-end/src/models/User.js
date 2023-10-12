const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId }} = Schema

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  //선호하는 장르
  likeGenre: [{
    type: String,
  }],
  //즐겨찾기 한 영화 목록
  likeMovie: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now
  }

})


const User = mongoose.model('User', userSchema)
module.exports = User