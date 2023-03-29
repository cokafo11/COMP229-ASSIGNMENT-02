let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Contact = require('../models/contacts');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err) {
            return console.error(err);
        }
        else {
            //console.log(ContactList);
            res.render('contact/list', 
            {title:'ContactList', ContactList:contactList,
        displayName: req.user ? req.user.displayName:''});
        }
    });
}
// router.get('/', (req, res, next) => {
    
// });
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contact/update', { title: 'Edit Contact', contact: contactToEdit,
            displayName: req.user?req.user.displayName:''});
            
        }
    });
}
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    console.log(req.body);
    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    Contact.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}
