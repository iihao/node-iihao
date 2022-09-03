const mongoose = require('mongoose')
const baseModel = require('./base')
const { Schema } = mongoose

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    default: null
  },
  favorited: {
    type: Boolean,
    default: false
  },
  favoritesCount: {
    type: Number,
    default: null
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  ...baseModel
})

module.exports = articleSchema
