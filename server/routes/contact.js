let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
//connnect to our contacts model
let Contact = require('../models/contacts');
let contactController = require('../controllers/contact');

//helper function for guard purposes
function requireAuth(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
//Get route for the book list page - READ operation.
router.get('/', contactController.displayContactList);

//GET ROUTE for displaying the Edit Page - UPDATE operation
router.get('/update/:id', requireAuth, contactController.displayEditPage);

//POST ROUTE for processing the Edit Page - UPDATE operation
router.post('/update/:id', requireAuth, contactController.processEditPage);

//GET ROUTE to perform deletion - DELETE operation
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;