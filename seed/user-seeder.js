var User = require('../models/user');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var users = [
    new User({
        familyName: 'Mckay',
        firstName: 'Jason',
        email: 'jasonalexandermckay@hootmail.com',
        address: {
            street: '319 E del Ray Ave',
            city: 'Alexandria',
            state: 'VA',
            zip: 22301
        }
    })
];

var done = 0;
for (var i = 0; i < users.length; i++) {
    users[i].save(function (err, result) {
        done++;
        if (done === users.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}