//jshint esversion:6

const express = require('express');
const router = express.Router();
const Author = require('../models/user');

router.get('/edit', function (req, res, next) {

    res.render('edit/edit');
});

router.put('/:id', async (req, res) => {
    let user;
    try {
        user = await Author.findById(req.params.id);
        user.firstName = req.body.firstName;
        user.familyName = req.body.familyName;
        user.email = req.body.email;
        user.address.street = req.body.street;
        user.address.city = req.body.city;
        user.address.state = req.body.state;
        user.address.zip = req.body.zip;

        await user.save();
        res.redirect(`/edit/edit`);
    } catch {
        if (user == null) {
            res.redirect('/');
        } else {
            res.render('edit/edit', {
                author: author,
                errorMessage: 'Error updating User'
            });
        }
    }
});




module.exports = router;