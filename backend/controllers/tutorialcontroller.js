Useritem = require('../models/userModel');
Tutorialitem = require('../models/tutorialModel');
const bcrypt = require('bcrypt');

exports.getCompletedTutorials = function(req, res) {
  let mongoose = require('mongoose');
  var dev_db_url = 'mongodb+srv://gauthier:Neaissem135@cluster0-fistj.azure.mongodb.net/dwbl?retryWrites=true&w=majority'
  mongoose.connect(dev_db_url, { useNewUrlParser: true });
  let db = mongoose.connection;

  db.collection('authentications').findOne({username: req.body.username})
  .then(function(doc) {
        if(!doc){
          res.status(401).send("The password was not correct or this username does not exist.");
          db.close();
        } else {
          bcrypt.compare(req.body.password, doc.password, (err, result) => {
            if (err) {
              res.status(401).send("The password was not correct or this username does not exist.");
              db.close();
            } else {
              if(result){
                var query = Tutorialitem.find({});

                query.where('user_id', doc.id);
                query.where('category', req.body.category);
                query.select('tutorial_id');
                query.exec(function (err, docs) {
                  res.send(docs);
                  db.close();
                });
              } else {
                res.status(401).send("The password was not correct.");
                db.close();
              }
            }   
          });
        } 
  });
};

exports.newCompletedTutorial = function(req, res) {  
  let mongoose = require('mongoose');
  var dev_db_url = 'mongodb+srv://gauthier:Neaissem135@cluster0-fistj.azure.mongodb.net/dwbl?retryWrites=true&w=majority'
  mongoose.connect(dev_db_url, { useNewUrlParser: true });
  let db = mongoose.connection;

  db.collection('authentications').findOne({username: req.body.username})
  .then(function(doc) {
        if(!doc){
          res.status(401).send("The password was not correct or this username does not exist.");
          db.close();
        } else {
          bcrypt.compare(req.body.password, doc.password, (err, result) => {
            if (err) {
              res.status(401).send("The password was not correct or this username does not exist.");
              db.close();
            } else {
              if(result){
                let completedTutorial = new Tutorialitem();
              
                completedTutorial.user_id = doc.id;
                completedTutorial.tutorial_id = req.body.tutorialId;
                completedTutorial.category = req.body.category;

                // save the contact and check for errors
                completedTutorial.save()
                  .then(item => {
                    res.send("Tutorialitem saved to database");
                  })
                  .catch(err => {
                    console.debug(err);
                    res.status(400).send("Unable to save to database");
                  });
              } else {
                  res.status(401).send("The password was not correct.");
                  db.close();
              }
            }   
          });
        } 
    });
};

