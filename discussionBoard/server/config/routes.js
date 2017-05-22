var topic = require('../controllers/topics.js'); // for EJS
// var topic = require('../../public');  // for Angular
// console.log("routes.js");   // sanity check
module.exports = function(app) {
  app.get('/topics', topic.index); // display all topics
  app.get('/topics/:id', topic.show); // show topic
  app.post('/topics', topic.create); // create topic
  app.put('/topics/:id', topic.update); // update topic
  app.delete('/topics/:id', topic.delete);  // delete topic
  app.post('/login', topic.login); // login or register account
  app.get('/logout', topic.logout); // logout account
  app.get('/checkLogin', topic.checkLogin); // check login status
  app.get('/account', topic.getAccounts); // get all accounts
  app.get('/account/:id', topic.showAccount); // show account
  app.put('/account/:id', topic.updateAccount); // update account
  // For Angular Routing - catchall
  app.get('*', function (req, res) {
      res.sendFile(path.resolve('./public/dist/index.html'));
  })
}
