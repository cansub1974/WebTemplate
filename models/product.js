var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productImage: {
        type: Buffer,
        //required: true
    },
    productImageType: {
        type: String,
        //required: true
    },
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    quantity: {
        type: Number,
        //required: true
    },
    productNumber: {
        type: String,
        //required: true
    },
    category: {
        type: String,
        //required: true
    },
    imagePath: {
        type: String
    }

});

productSchema.virtual('productImagePath').get(function () {
    if (this.productImage != null && this.productImageType != null) {
        return `data:${this.productImageType};charset=utf-8;base64,${this.productImage.toString('base64')}`
    }
});

module.exports = mongoose.model('Product', productSchema);