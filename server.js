if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session') (session);
const cors = require('cors');
const mongoose = require('mongoose');
// const passport = require('passport');
const app = express();

// const initializePassport = require('./passport-config')
// initializePassport(passport)

const signUpRouter = require('./routes/user');
const parrotRouter = require('./routes/parrot');
const signInRouter = require('./routes/sessions');

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected'));

const store = new MongoDBSession({
	uri: process.env.DATABASE_URL,
	collection: 'sessions',
});

//catching errors for saving session to DB
store.on('error', function(error) {
  console.log(error);
});

//
app.use(
		session({
  		secret: 'boys in french',
  		cookie: {
    	maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week (calculated in milliseconds )
  	},
  	store: store,
  	//resave: true,
  	saveUninitialized: false
}));

// Authentication function but unsure how it works - have found req.session.isAuth in a log in file
app.use((req, res, next) => {
	res.locals.isAuth = req.session.isAuth;
	next();
});

app.use('/api/users', signUpRouter);
app.use('/api/parrots', parrotRouter);
app.use('/api/sessions', signInRouter);


app.listen(PORT, () => {
	console.log(`Server is working on ${PORT}`);
});
