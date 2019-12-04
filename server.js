const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const cors = require ('cors');

require('dotenv').config();
const routes = require('./routes');

// NOTE CONFIG Variables
const PORT = process.env.PORT


//------- Middleware -------//
//Session
app.use(
  session({
    store: new mongoStore({ url: process.env.MONGODB_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


//------- Route -------//
app.get('/', (req, res) => {
  res.send('<h1>BUY ME</h1>');
});

// API Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/products', routes.products)
app.use('/api/v1/orders', routes.orders)

// Start server
app.listen(process.env.PORT || 4000, () => console.log(`Server connected at http://localhost:${PORT}`))


