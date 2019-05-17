const express = require ('express');
const exphbs  = require('express-handlebars');
const port = process.env.PORT || 3000;

const app = express();
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', "public/views/") 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 

app.listen(port, () => console.log(`App listening on port ${port}!`));

// app.get('/', (req, res) => res.render('index'));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newshub', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
// const db = mongoose.connection;
const db = require("./models");


// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log("DB connected"));
const cheerio = require('cheerio');
const axios = require("axios");

// Routes
require("./routes/scrape")(app);
require("./routes/html-routes")(app);
require("./routes/comment-routes")(app);