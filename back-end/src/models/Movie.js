const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId }} = Schema

const MoiveSchema = new Schema({
  adult: {
    type:Boolean,
  },
  benre_ids:[{
    type: Number,
  }],
  id: {
    type: Number,
  },
  original_languate:{
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: Date,
  },
  title: {
    type: String,
  }
})


const Movie = mongoose.model('Movie', MoiveSchema)
module.exports = Movie