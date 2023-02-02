class NewsController {

 // get
 index(req, res) {
  res.render('home');
 }

 show(req, res) {
  res.render('news')
 }
}
module.exports = new NewsController;