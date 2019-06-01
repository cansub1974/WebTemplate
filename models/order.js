var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: Object,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    street2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', schema);