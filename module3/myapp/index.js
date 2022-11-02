const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

const logger = winston.createLogger(logConfiguration);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/submit', (req, res) => {
    logger.log({
        message: 'Hello, Winston!',
        level: 'info'
    });
    logger.info('Hello, Winston!');
    res.send('The server has successfully received your request!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
