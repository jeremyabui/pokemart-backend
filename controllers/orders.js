const db = require('../models');

const index = (req, res) => {
  db.Order.find({})
    .populate('user')
    .populate('products')
    .exec((err, allOrders) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      mesage: 'Show all orders',
      count: allOrders.length,
      data: allOrders,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const create = (req, res) => {
  db.Order.create(req.body, (err, createdOrder) => {
    // Would need to find User DB and update to db
    if (err) return console.log(err);
    res.json({
      status: 201,
      message: 'Created order',
      data: createdOrder,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const show = (req, res) => {
  db.Order.findById(req.params.orderId)
  .populate('user')
  .populate('products')
  .exec((err, foundOrder) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: foundOrder,
    });
  });
};

const update = (req, res) => {
  db.Order.findByIdAndUpdate(
    req.params.orderId,
    req.body,
    {new:true}, (err, updatedOrder) => {
      if(err) return console.log(err);
      res.json({
        status: 200,
        count: 1,
        data: updatedOrder,
        requestedAt: new Date().toLocaleString(),
      });
    }
  )
}

const destroy = (req, res) => {
  db.Order.findByIdAndDelete(req.params.orderId, (err, deletedOrder) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: deletedOrder,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
}