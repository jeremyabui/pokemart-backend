const db = require('../models');

const index = (req, res) => { 
    db.Product.find({}, (err, allProducts) => {
        if (err) return console.log(error);
        res.json({
            status: 200,
            count: allProducts.length,
            data: allProducts,
            requestedAt: new Date().toLocaleString()
        });
    });
}

const show = (req, res) => {
    db.Product.findById(req.params.productId, (err, foundProduct) => {
        if (err) return res.status(500).json(err);
        res.json({
            status: 200,
            data: foundProduct
        });
    });
};

const create = (req, res) => {
    db.Product.create(req.body, (err, createdProduct) => {
        if (err) return console.log(err);
        res.json({
            status: 201,
            message: 'Created product',
            data: createdProduct,
            requestedAt: new Date().toLocaleString(),
        });
    });
}

const update = (req, res) => {
    db.Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {new: true}, (err, updatedProduct) => {
            if (err) return console.log(err);
            res.json({
                status: 200,
                count: 1,
                data: updatedProduct,
                requestedAt: new Date().toLocaleString()
            });
        }
    )
}

const destroy = (req, res) => {
    db.Product.findByIdAndDelete(req.params.productId, (err, deletedProduct) => {
        if (err) return console.log(err);
        res.json({
            status: 200,
            data: deletedProduct,
            requestedAt: new Date().toLocaleString()
        });
    });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}