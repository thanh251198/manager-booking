const mongoose = require('mongoose')

async function connect( ) {
 try {
  mongoose.connect('mongodb://127.0.0.1:27017/Book_dev',{
   // useCreateIndex:true
  })
  .then(() => console.log('Connected!'));
 } catch (error) {
  console.log("error: ", error);
 }
}
mongoose.set('strictQuery', true);
module.exports = {connect}