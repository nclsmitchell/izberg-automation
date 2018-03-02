const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const AUTH_IP = ['::ffff:127.0.0.1', '213.152.2.6'];

function testIP(req) {
    let ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        const list = ipAddr.split(",");
        if (list[list.length-1] == AUTH_IP[0] || list[list.length-1] == AUTH_IP[1]) {
            return true
        };
    }
    else {
        return false
    }
}

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

app.use(cors({origin: '*'}));
app.use('/static', express.static(path.join(__dirname, '../../build/static')));

const isAuth = (req, res, next) => {
    if (testIP(req)) {
        next();
    }
    else {
        res.status(403).send('Unauthorized IP: ' + req.connection.remoteAddress);
    }
}

app.get('*', isAuth, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../build/index.html'));
});

module.exports = app;
