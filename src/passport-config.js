const { log } = require('handlebars');

const LocalStratery = require('passport-local').Strategy
function initializePassport( passport, getUserByName) {
 const authenicateUser  = async  (name, password,done) => {
  const user = getUserByName(name)
  if(user = null) {
   return done( null, false,{ mess:"incorrect"})
  }

  try {
   if( await bcrypt.compare(password, user.password) ){
    return done(null,user);
   }else {
    return done(null, false, {mess:'correct'})
   }
  } catch(e) {
   console.log(e)
  }
 }
 passport.user(new LocalStratery({usernameField: 'name'}),
 authenicateUser)
 passport.serializeUser((user,done) => { })
 // passport.serializeUser((user,done) => { })
}
module.exports(initializePassport)