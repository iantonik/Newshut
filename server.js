const express = require ('express');
const exphbs  = require('express-handlebars');
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

const port = process.env.PORT || 3000;

const app = express();
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', "public/views/") 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 

app.listen(port, () => console.log(`App listening on port ${port}!`));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newshub';
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
const db = require("./models");

const cheerio = require('cheerio');
const axios = require("axios");

// Routes
require("./routes/routes")(app);

