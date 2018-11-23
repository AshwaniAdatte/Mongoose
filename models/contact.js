
var express = require('express');
var fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;   
 
const contact = new Schema({
   id: ObjectId,
   name: String,
   phoneNo: String    
});

const MyModel = mongoose.model('contact', contact);
let Contact={}

// get all heroes from the database

Contact.getAllContacts = function(){
	return new Promise (function(resolve, reject){

    //create the connection to database

    const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
    console.log(connection);
    MyModel.find({},function(err,contact){
       
    	if (err) {
    		console.log(err);
    		console.log('ERR :: fetching data from database.');
    		reject();
    	}
    	else {
    		console.log (contact);
    		resolve(contact);
    	}
    });
});
}

Contact.update = function(updateData){
    return new Promise (function(resolve,reject){

        //create the connection to database

        const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log (connection);
        MyModel.findOneAndUpdate({_id: `${updateData._id}`}, { name: `${updateData.name}` , phoneNo: `${updateData.phoneNo}`}, function(err, con) {
          if (err) {
                console.log(err);
                console.log('ERR :: fetching data from database..');
                reject();
            }
            else {
                //console.log(result);
                console.log('con.......'+ con);
                resolve(con);

            }
        });
});        
    
}

Contact.saveNew = function(newContact){
    return new Promise (function(resolve,reject){
    
        const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log(connection);
        var newCont = new MyModel({
            name: `${newContact.name}`,
            phoneNo: `${newContact.phoneNo}`
        });
        newCont.save({},function(err,contact){
            if (err) {
                console.log(err);
                console.log('ERR :: Saving data into database..');
                reject();
            }
            else {
                console.log(contact);
                resolve(contact);
            }
        });
    });
}

Contact.deleteRow = function(delContData){
    return new Promise(function(resolve,reject){
        const connection =mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log(connection);
        MyModel.findOneAndRemove({name : `${delContData.name}`}, function(err){
            if (err) {
                console.log(err);
                console.log('ERR :: fetching data from database.');
                reject();
            }
            else {      
                console.log(contact);
                resolve(contact);
            }   
        });
    });  
}

Contact.viewFile = function(viewData){
    return new Promise (function(resolve, reject){

    //create the connection to database

    const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
    console.log(connection);
    MyModel.find({_id : `${viewData._id}`},function(err,contact){
       
        if (err) {
            console.log(err);
            console.log('ERR :: fetching data from database.');
            reject();
        }
        else {
            console.log (contact);
            resolve(contact);
        }
    });
});
}


module.exports = Contact;