const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ipfilter = require('express-ipfilter').IpFilter;

const app = express();

const AUTH_IP = ['::ffff:127.0.0.1', '213.152.2.6/24'];

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info('Server started');
    }
});

app.use('/static', express.static(path.join(__dirname, '../../build/static')));

app.get('/test', function(req, res) {
    res.send(req.connection.remoteAddress);
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../build/index.html'));
});

module.exports = app;
