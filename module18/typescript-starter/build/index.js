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
var customers = [
    {
        "name": "rohan",
        "product": "pizza"
    },
    {
        "name": "ben",
        "product": "cheese"
    },
    {
        "name": "owen",
        "product": "milk"
    },
    {
        "name": "edward",
        "product": "apple"
    },
    {
        "name": "mark",
        "product": "banana"
    }
];
app.get('/fetchCustomer/:name', function (req, res, next) {
    var responseCustomer = customers.find(function (customer) { return customer.name === req.params.name; });
    if (responseCustomer) {
        res.send(responseCustomer);
    }
    else {
        next();
        return;
    }
});
app.get('/fetchCustomer/:name', function (req, res) {
    res.send('Sorry, we could not find a customer with that name');
});
app.post('/postCustomer/:name/:product', function (req, res) {
    var newCustomer = { "name": req.params.name, "product": req.params.product };
    customers.push(newCustomer);
    res.send('New Customer has been added');
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
