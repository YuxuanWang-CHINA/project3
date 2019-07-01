const express = require('express');
var app = express();
var apirouter = require('./routers'); 

app.use('/api', apirouter);