const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
// app.use(express.static('./public'));
app.use(express.static(__dirname + '/../public'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/films', require('./routes/films'));
app.use('/api/v1/reviews', require('./routes/reviews'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
