const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Room = new Schema(
  {
    name: { type: String, require:true },
    price: { type: Number, require:true },
    description: { type: String, require:true },
    image: { type: String },
    slug: { type: String, slug: 'name', unique:true }
  },{
    timestamps:true
  });
  
mongoose.plugin(slug)
Room.plugin(mongooseDelete,  { 
  deletedAt : true,
  overrideMethods: 'all'
 })
module.exports = mongoose.model('room', Room)