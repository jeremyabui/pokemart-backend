const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const cors = require ('cors');

require('dotenv').config();

// NOTE CONFIG Variables
const PORT = process.env.PORT


//------- Middleware -------//



//------- Route -------//
app.get('/', (req, res) => {
    res.send('<h1>BUY ME</h1>');
});

// API Routes
app.listen(process.env.PORT || 4000, () => console.log(`Server connected at http://localhost:${PORT}`))


