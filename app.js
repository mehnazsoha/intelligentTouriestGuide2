const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

const db = require('./config/keys').MongoURI; //mongodb config

//connect to mongodb
mongoose.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log('Mongodb Connected'))
	.catch(err => console.log(err));
//connect to mongodb

//connect handlebars
app.set('views', path.join(__dirname, '/views/')); //views folder ta join korar jno
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'mainLayout',
	layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');
//connect handlebars

app.use(express.urlencoded({
	extended: false
})); //Bodyparser (body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body)

app.use('/', require('./routes/index')); //routes

app.listen(5000, () => {
	console.log("Server started on port 5000");
});