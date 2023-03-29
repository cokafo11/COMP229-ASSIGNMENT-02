let mongoose = require('mongoose');
let contactsModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

//check the below line
module.exports = mongoose.model('contact', contactsModel);