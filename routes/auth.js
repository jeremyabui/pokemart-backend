const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// TODO REMOVE INDEX
router.get('/', ctrl.auth.index);
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.get('/verify', ctrl.auth.verify);
router.delete('/logout', ctrl.auth.logout);
router.put('/:userId', ctrl.auth.update);
router.get('/:userId', ctrl.auth.show);
router.delete('/:userId', ctrl.auth.destroy);

module.exports = router;