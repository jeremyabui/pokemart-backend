const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.orders.index);
router.post('/', ctrl.orders.create);
router.get('/:orderId', ctrl.orders.show);
router.put('/:orderId', ctrl.orders.update);
router.delete('/:orderId', ctrl.orders.destroy);

module.exports = router;