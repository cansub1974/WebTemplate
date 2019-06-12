var Product = require('../models/product');

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        //var productImagePath = item.productImagePath;
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0,
            };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        //productImagePath = productImagePath;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        //this.productImagePath = productImagePath;
    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function () {
        var arr = [];



        for (var id in this.items) {


            // var imageBuffer = Buffer.from(this.items[id].item.productImage).toString('base64');
            // var productImagePath = "data:" + this.items[id].item.productImageType + ";charset=utf-8;base64," + imageBuffer;

            arr.push(this.items[id]);
            //arr.push(productImagePath);


        }
        return arr;
    };

    this.generateImageArray = function () {
        var imageArr = [];



        for (var id in this.items) {


            var imageBuffer = Buffer.from(this.items[id].item.productImage).toString('base64');
            //var productImagePath = "data:" + this.items[id].item.productImageType + ";charset=utf-8;base64," + imageBuffer;
            const productImagePath = `data:${this.items[id].item.productImageType};charset=utf-8;base64,${Buffer.from(this.items[id].item.productImage.toString('base64'))}`

            //arr.push(this.items[id]);
            imageArr.push(productImagePath);


        }
        return imageArr;
    };
};