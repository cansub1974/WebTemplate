const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Author = require('../models/author');
const User = require('../models/user');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// Search Products Route
router.get('/search', async (req, res) => {
  let query = Product.find();
  let searchOptions = {};
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter);
  }
  try {
    const products = await query.exec();
    res.render('products/search', {
      products: products,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/search');
  }
});

// UserSearch Products Route
router.get('/userSearch', async (req, res) => {
  let query = Product.find();
  let searchOptions = {};
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter);
  }
  try {
    const products = await query.exec();
    res.render('products/results', {
      products: products,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/');
  }
});




// New Product Route
router.get('/new', async (req, res) => {
  if (isAdmin) {
    renderNewPage(res, new Product());
  } else {
    res.redirect('/');
  }

});

// Create Product Route
router.post('/', async (req, res) => {
  if (isAdmin) {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      productNumber: req.body.productNumber,
      category: req.body.category
    });
    saveImage(product, req.body.productImage);

    try {
      const newProduct = await product.save();
      res.redirect(`products/${newProduct.id}`);
      //res.redirect('../routes/index');
    } catch {
      renderNewPage(res, product, true);
    }
  } else {
    res.redirect('/');
  }

});

// Show Product Route
router.get('/:id', async (req, res) => {
  if (isAdmin) {
    try {
      const product = await Product.findById(req.params.id).exec();
      res.render('products/show', {
        product: product
      });
    } catch {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }

});

// Edit Product Route
router.get('/:id/edit', async (req, res) => {
  if (isAdmin) {
    try {
      const product = await Product.findById(req.params.id);
      renderEditPage(res, product);
    } catch {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }

});

// Update Product Route
router.put('/update/:id', async (req, res) => {

  if (isAdmin) {
    let product;

    try {
      product = await Product.findById(req.params.id);
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantity = req.body.quantity;
      product.productNumber = req.body.productNumber;
      product.category = req.body.category;
      if (req.body.productImage != null && req.body.productImage !== '') {
        saveImage(product, req.body.image);
      }
      await product.save();
      res.redirect(`/products/${product.id}`);
    } catch {
      if (product != null) {
        renderEditPage(res, product, true);
      } else {
        res.redirect('/');
      }
    }
  } else {
    res.redirect('/');
  }

});

// Delete Product Page
router.delete('/:id', async (req, res) => {
  if (isAdmin) {
    let product;
    try {
      product = await Product.findById(req.params.id);
      await product.remove();
      res.redirect('/product');
    } catch {
      if (product != null) {
        res.render('products/show', {
          product: product,
          errorMessage: 'Could not remove product'
        });
      } else {
        res.redirect('/');
      }
    }
  } else {
    res.redirect('/');
  }

});

async function renderNewPage(res, product, hasError = false) {
  renderFormPage(res, product, 'new', hasError);
}

async function renderEditPage(res, product, hasError = false) {
  renderFormPage(res, product, 'edit', hasError);
}

async function renderFormPage(res, product, form, hasError = false) {
  try {
    const params = {
      product: product
    };
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Product';
      } else {
        params.errorMessage = 'Error Creating Product';
      }
    }
    res.render(`products/${form}`, params);
  } catch {
    res.redirect('/product');
  }
}

function saveImage(product, imageEncoded) {
  if (imageEncoded == null) return;
  const image = JSON.parse(imageEncoded);
  if (image != null && imageMimeTypes.includes(image.type)) {
    product.productImage = new Buffer.from(image.data, 'base64');
    product.productImageType = image.type;
  }
}

function isAdmin(req, res, next) {
  if (req.user.admin === true) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;