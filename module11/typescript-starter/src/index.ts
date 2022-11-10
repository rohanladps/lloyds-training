import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const winston = require('winston');

var Singleton = (function () {
    var instance : any;

    function createInstance() {
        const logConfiguration = {
            'transports': [
                new winston.transports.Console(),
                new winston.transports.File({ filename: './logging.log' })
            ]
        };
        const logger = winston.createLogger(logConfiguration);
        return logger;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

var instance1 = Singleton.getInstance();
instance1.log({
    message: 'Hello, Winston!',
    level: 'info'
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
