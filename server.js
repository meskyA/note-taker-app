// require dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// initialize express app

const app = express();
const PORT = process.env.PORT || 3000;

// data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// require routes file
require('./routes/routes')(app);


// setup listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})




