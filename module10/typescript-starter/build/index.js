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
var fs = require('fs');
var http = require('http');
var axios = require('axios');
app.get('/fetchAllUsers/:character', function (req, res) {
    fs.readFile('src/file_to_be_changed.txt', 'utf8', function (err, data) {
        data = data.replaceAll(req.params.character, '');
        fs.writeFile('src/file_to_be_changed.txt', data, function (err) {
            if (err) {
                console.error(err);
            }
        });
    });
    res.send("Every instance of character ".concat(req.params.character, " has successfully been removed from the file"));
});
axios.get('http://localhost:3000/fetchAllUsers/a')
    .then(function (response) {
})
    .catch(function (error) {
    console.log(error);
})
    .then(function () {
    axios.get('http://localhost:3000/fetchAllUsers/b')
        .then(function (response) {
    })
        .catch(function (error) {
        console.log(error);
    })
        .then(function () {
        axios.get('http://localhost:3000/fetchAllUsers/c')
            .then(function (response) {
        })
            .catch(function (error) {
            console.log(error);
        })
            .then(function () {
            axios.get('http://localhost:3000/fetchAllUsers/d')
                .then(function (response) {
            })
                .catch(function (error) {
                console.log(error);
            })
                .then(function () {
                axios.get('http://localhost:3000/fetchAllUsers/e')
                    .then(function (response) {
                })
                    .catch(function (error) {
                    console.log(error);
                })
                    .then(function () {
                    axios.get('http://localhost:3000/fetchAllUsers/f')
                        .then(function (response) {
                    })
                        .catch(function (error) {
                        console.log(error);
                    })
                        .then(function () {
                    });
                });
            });
        });
    });
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
