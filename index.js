const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose')
const router = require('./api/router/index')
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router)
mongoose.connect('', {
    useNewUrlParser: true
}).then(
    () => console.log('DB connection success')
).catch(
    () => console.log('Error connecting to DB')
)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server running'))