const express = require('express') //nap thu vien
const morgan = require('morgan')
const handlebars  = require('express-handlebars')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
const path = require('path');
const db = require('./config/db')
const sortMiddleware = require('./app/middleware/sortMiddleware');
const newscontoller = require('./routes');
const route = require('./routes');
const app = express() // express dc coi mot function de su dung 
const port = 3000;
// const initializePassport = require('./passport-config')
// initializePassport(passport, name => user.find(user => user.name === name))
// app.use(morgan('combined'))
db.connect()//db connect
app.use(sortMiddleware)
// app.use(flash)
// app.use(session({
//   secret: process.env.SESSION_SECRET
// }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(methodOverride('_method'))
app.engine('hbs', handlebars.engine(
  {
  // defaultLayout: 'main',
  extname: '.hbs',
  helpers : {
    sum:(a,b)=> a+b,
    sortAble: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      console.log(field);
      // console.log(sort.column);
      const icons ={
        default: "/img/arrow-switch.svg ",
        asc: "/img/arrow-switch.svg ",
        desc: "/img/arrow-both.svg",

      }
      const types = {
        default: "asc",
        asc: "asc",
        desc: "desc",
      }
      const type = types[sortType]
      const icon = icons[sortType]
      return  `<a href="?_sort&column=${field}&type=${type}">
      <img src="${icon}" alt="">
    </a>`
    }
  }
}
  )); 
// su dung engine template la handlebar
app.set('view engine', 'hbs') // dinh nghia dung engine

app.set('views', path.join(__dirname, 'resources','views'));

//router
route(app)
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})