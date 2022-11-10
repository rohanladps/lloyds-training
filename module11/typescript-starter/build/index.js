"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = 3000;
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var winston = require('winston');
var Singleton = (function () {
    var instance;
    function createInstance() {
        var logConfiguration = {
            'transports': [
                new winston.transports.Console(),
                new winston.transports.File({ filename: './logging.log' })
            ]
        };
        var logger = winston.createLogger(logConfiguration);
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
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
