const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
// const slug = require('mongoose-slug-generator');
// const ObjectId = Schema.ObjectId;

const User = new Schema(
  {
    name: { type: String, require:true },
    pass: { type: String, require:true }
  }
  // ,{
  //   timestamps:true
  // }
  );
  

// mongoose.plugin(slug)
User.plugin(mongooseDelete,  { 
  deletedAt : true,
  overrideMethods: 'all'
 })
module.exports = mongoose.model('user', User)