const bcrypt = require('bcryptjs');
const db = require('../models');

// TODO REMOVE INDEX BEFORE DEPLOYMENT
// Index
const index = (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      message: 'Show all users',
      requestedAt: new Date().toLocaleString(),
      count: allUsers.length,
      data: allUsers,
    });
  });
};

//POST Register
const register = (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({
      status: 400,
      message: 'Please enter your name, email, and password.'
    });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong. Please try again.'
      });
    if (foundUser)
      res.status(400).json({
        status: 400,
        message: 'Email address has already registered. Please try again.'
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong. Please try again.'
        });
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong. Please try again.'
        });
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
        };
        db.User.create(newUser, (err, savedUser) => {
          if (err)
            return res.status(500).json({
              status: 500,
              message: 'Something went wrong. Please try again'
            });
        res.status(201).json({ status: 201, message: 'Account successfully created'});
          // TODO FIX Create session on register
          // req.session.currentUser = {id: foundUser._id};
        });
      });
    });
  });
};

// Login
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .jason({ 
          status: 400,
          message: 'Please enter your email and password'
      });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) 
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong. Please try again.'
      });
    if (!foundUser) {
      return res
        .status(400)
        .json({
          status: 400,
          message: 'Email or password is incorrect'
        });
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong. Please try again.'
        });
      if (isMatch) {
        req.session.currentUser = {id: foundUser._id};
        return res
          .status(200)
          .json({ 
            status: 200, 
            message: 'Success', data: foundUser._id
          });
      } else {
        return res
          .status(400)
          .json({
            status: 400, 
            message: 'Email or password is incorrect'
          });
      }
    });
  });
};

// Verify
const verify = (req, res) => {
  if (!req.session.currentUser)
    return res.status(401).json({ 
      status: 401, 
      message: 'Unauthorized'
    });
  req.session.destroy(err => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong. Please try again.'
      });
    res.sendStatus(200);
  });
};

// Logout
const logout = (req, res) => {
  if (!req.session.currentUser)
    return res.status(401).json({ 
      status: 401, 
      message: 'Unauthorized'
    })
  req.session.destroy(err => {
    if (err) 
      return res.status(500).json({
        status: 500,
        message: 'Something went wrong. Please try again'
      });
    res.sendStatus(200);
  });
};

// Show one
const show = (req, res) => {
  db.User.findById(req.params.userId)
  // NOTE Need to uncomment to populate orders
  // .populate('orders')
  .exec((err, foundUser) => {
    if (err) return res.status(500).json(err);
    res.json({
      status: 200,
      message: 'User details',
      data: foundUser
    });
  });
};

// Update
const update = (req, res) => {
  db.User.findById(req.params.userId, (err, foundUser) => {
    if (err) console.log(err);

    if (req.body.name) {
      foundUser.name = req.body.name;
    }

    if (req.body.email) {
      foundUser.email = req.body.email;
    }

    if (req.body.password) {
      let updatedPassword = bcrypt.hashSync(req.body.password, 10);
      foundUser.password = updatedPassword;
    }

    if (req.body.address) {
      foundUser.address = req.body.address;
    }

    if (req.body.city) {
      foundUser.city = req.body.city;
    }

    if (req.body.state) {
      foundUser.state = req.body.state;
    }

    if (req.body.zipcode) {
      foundUser.zipcode = req.body.zipcode;
    }

    foundUser.save((err, updatedUser) => {
      if (err) {
        res.json({
          status: 400,
          message: 'Error - Unable to update',
          err,
          requestedAt: new Date().toLocaleString()
        });
      }
      res.json({
        status: 200,
        data: updatedUser,
        requestedAt: new Date().toLocaleString()
      });
    });
  });
};

// Delete
const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
    if (err) console.log(err);
    res.json({
      status: 200, 
      data: deletedUser,
      requestedAt: new Date().toLocaleString()
    });
  });
};

module.exports = {
  // TODO REMOVE INDEX
  index,
  register,
  login,
  verify, 
  logout,
  show,
  update,
  destroy
}