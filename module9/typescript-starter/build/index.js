"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
// **********************************
// *** SOLUTION USING ASYNC AWAIT ***
// **********************************
app.get('/getUserDetailsAsync/:id', function (req, res) {
    getBalances(req.params.id, res);
});
var getBalances = function (id, res) { return __awaiter(void 0, void 0, void 0, function () {
    var balance, name, request, request2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, http.request({
                    host: 'localhost',
                    port: 3000,
                    path: '/fetchAllUsers',
                    method: 'GET',
                    headers: {}
                }, function (response) {
                    var data = '';
                    response.setEncoding('utf8');
                    response.on('data', function (chunk) {
                        data += chunk;
                    });
                    response.on('end', function () {
                        name = JSON.parse(data).find(function (user) { return user.id === id; }).name;
                    });
                })];
            case 1:
                request = _a.sent();
                request.end();
                return [4 /*yield*/, http.request({
                        host: 'localhost',
                        port: 3000,
                        path: '/balances',
                        method: 'GET',
                        headers: {}
                    }, function (response2) {
                        var data2 = '';
                        response2.setEncoding('utf8');
                        response2.on('data', function (chunk2) {
                            data2 += chunk2;
                        });
                        response2.on('end', function () {
                            balance = JSON.parse(data2).find(function (user) { return user.id === id; }).balance;
                            res.end(id + ',' + name + ',' + balance);
                        });
                    })];
            case 2:
                request2 = _a.sent();
                request2.end();
                return [2 /*return*/];
        }
    });
}); };
// **********************************
// *** SOLUTION USING ASYNC AWAIT ***
// **********************************
// ****************************
// *** SOLUTION USING PROMISE ***
// ****************************
function httpRequestBalance() {
    return new Promise(function (resolve, reject) {
        var req = http.request({
            host: 'localhost',
            port: 3000,
            path: '/balances',
            method: 'GET',
            headers: {}
        }, function (res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body);
            });
        });
        req.on('error', function (err) {
            reject(err);
        });
        req.end();
    });
}
function httpRequestUsers() {
    return new Promise(function (resolve, reject) {
        var req = http.request({
            host: 'localhost',
            port: 3000,
            path: '/fetchAllUsers',
            method: 'GET',
            headers: {}
        }, function (res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body);
            });
        });
        req.on('error', function (err) {
            reject(err);
        });
        req.end();
    });
}
app.get('/getUserDetailsPromise/:id', function (req, res) {
    axios.get('http://localhost:3000/fetchAllUsers')
        .then(function (response) {
        var name = (response.data).find(function (user) { return user.id === req.params.id; }).name;
        axios.get('http://localhost:3000/balances')
            .then(function (response) {
            var balance = (response.data).find(function (user) { return user.id === req.params.id; }).balance;
            res.end(req.params.id + ',' + name + ',' + balance);
        })
            .catch(function (error) {
            console.log(error);
        })
            .then(function () {
        });
    })
        .catch(function (error) {
        console.log(error);
    })
        .then(function () {
    });
});
// ****************************
// *** SOLUTION USING PROMISE ***
// ****************************
// axios.get('/fetchAllUsers2')
// .then(function (response : any) {
//   // handle success
//   console.log(response);
// })
// .catch(function (error : any) {
//   // handle error
//   console.log(error);
// })
// .then(function () {
//   // always executed
//   console.log('hello');
// });
app.get('/fetchAllUsers', function (req, res) {
    var names = [{ id: '1', name: 'rohan' }, { id: '2', name: 'mark' }, { id: '3', name: 'ben' }, { id: '4', name: 'oscar' }];
    res.send(names);
});
app.get('/balances', function (req, res) {
    var balances = [{ id: '1', balance: '981' }, { id: '2', balance: '456' }, { id: '3', balance: '722' }, { id: '4', balance: '624' }];
    res.send(balances);
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
