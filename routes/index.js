var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contacts' });
});

// View all contacts
router.get('/getAllContacts', function(req, res, next) {
  Contact.getAllContacts()
  .then(function(retVal){
  res.render('contact',{data : retVal})
 }) 
  .catch(console.log('ERR :: in resolve in promise'))
});

// Update contacts
router.get('/update', function(req, res, next) {
  Contact.update(req.query)
  .then(function(){
  res.redirect('/getAllContacts')
 }) 
  .catch(console.log('ERR :: in resolve in promise'))
});

// save contacts
router.get('/saveNew', function(req, res, next) {
  Contact.saveNew(req.query)
  .then(function(){
  	res.redirect('/getAllContacts')
  })
  .catch(console.log('ERR :: in resolve in promise'))
});

// delete contact
router.get('/deleteRow', function(req, res, next) {
  Contact.deleteRow(req.query)
  .then(function(){
   res.redirect('/getAllContacts')
 }) 
  .catch(console.log('ERR :: in resolve in promise'))
});

// go to update form
router.get('/viewFile', function(req, res, next) {
  Contact.viewFile(req.query)
  .then(function(retVal){
  res.render('view',{data : retVal})
 }) 
  .catch(console.log('ERR :: in resolve in promise'))
});

// display json
router.get('/getAllValues', function(req, res, next) {
  Contact.getAllContacts()
  .then(function(retVal){
  res.send(retVal)
 }) 
  .catch(console.log('ERR :: in resolve in promise'))
});


module.exports = router;