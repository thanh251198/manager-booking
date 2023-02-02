const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const ObjectId = Schema.ObjectId;

const Book = new Schema(
  {
    name: { type: String, require:true },
    time: { type: String, require:true },
    description: { type: String, require:true },
    image: { type: String },
    slug: { type: String, slug: 'name', unique:true }
  },{
    timestamps:true
  });
  
// custopm query hlper
Book.query.sortAble = function (req) {
  if(req.query.hasOwnProperty('_sort')) {
    console.log("req.query.type: ", req.query.type);
    const isValidtype =['acs', 'desc'].includes(req.query.type)
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : 'desc'
    });
  }
  return this
}

mongoose.plugin(slug)
Book.plugin(mongooseDelete,  { 
  deletedAt : true,
  overrideMethods: 'all'
 })
module.exports = mongoose.model('Book', Book)