const db = require('../models');

const productsList = require('./products.json');

// changed from remove to delteMany
db.Product.remove({}, () => {
    db.Product.create(productsList, (err, createdProduct) => {
        if (err) return console.log(err);
        console.log(createdProduct);
    });
});