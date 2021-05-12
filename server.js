if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const apiRouter = require('./routes/api');
const signUpRouter = require('./routes/user');
const parrotRouter = require('./routes/parrot');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected'));



app.listen(PORT, () => {
	console.log(`Server is working on ${PORT}`);
});

app.use('/api', apiRouter);
app.use('/api/users', signUpRouter);
app.use('/api/parrots', parrotRouter);