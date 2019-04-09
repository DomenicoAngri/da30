/*******************************
 * Modules requirements
 ********************************/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./configs/routes');
const path = require('path');

// Dotenv current environment.
if(process.env.NODE_ENV === 'production'){
    require('dotenv').config({path: '.env.production'});
}
else{
    require('dotenv').config({path: '.env'});
}

/*******************************
 * Initialize
 ********************************/
const app = express();

// Middleware for initialize bodyParser for JSON.
app.use(bodyParser.json());

// ... Other app.use middleware 
app.use(express.static(path.join(__dirname, "frontend", "build")));

// This router will take all request, get and post, for every addresses.
app.use('/api', router);

/*******************************
 * Others
 ********************************/

// DB connection.
mongoose.connect(process.env.MONGODB_URI);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// CR7
app.listen(process.env.PORT || 7100);