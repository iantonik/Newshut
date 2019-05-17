const mongoose = require("mongoose");
var commentSchema = require("./Comment");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image:{
    type: String,
    required: false
  },
  comments: [commentSchema]

});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
