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
// Create a node app using express to build a getUserDetails API which takes in user id as param 
// and reads data from fetchAllUsers API(contains list of all user id and name) 
// and balances Api(fetches balance per user). 
// The getUserDetails API should return the user id, name as well as balance in the response. 
// Implement the solution using both Promise and Async-await
// const fetchBalancePerUserAPI = async () => {
//     return await fetch(`http://localhost:3000/fetchAllUsers`)
//         .then(res => res.json())
//         .then(data => data)
//         .catch(err => console.log("Error: ", err))
// }
// const getUserDetailsAPI = async () => {
//     const balances = await fetchBalancePerUserAPI;
//     return balances;
// }
var getBalances = function (id, res) { return __awaiter(void 0, void 0, void 0, function () {
    var balance, name, request, request2;
    return __generator(this, function (_a) {
        request = http.request({
            host: 'localhost',
            port: 3000,
            path: '/balances',
            method: 'GET',
            headers: {
            // headers such as "Cookie" can be extracted from req object and sent to /test
            }
        }, function (response) {
            var data = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                //res.end(data);
                balance = JSON.parse(data).find(function (user) { return user.id === id; }).balance;
            });
        });
        request.end();
        request2 = http.request({
            host: 'localhost',
            port: 3000,
            path: '/fetchAllUsers',
            method: 'GET',
            headers: {
            // headers such as "Cookie" can be extracted from req object and sent to /test
            }
        }, function (response2) {
            var data2 = '';
            response2.setEncoding('utf8');
            response2.on('data', function (chunk2) {
                data2 += chunk2;
            });
            response2.on('end', function () {
                // res.end(data2);
                name = JSON.parse(data2).find(function (user) { return user.id === id; }).name;
                res.end(id + ',' + name + ',' + balance);
            });
        });
        request2.end();
        return [2 /*return*/];
    });
}); };
app.get('/getUserDetails/:id', function (req, res) {
    getBalances(req.params.id, res);
    // const getSuggestions = async () => {
    // var request = http.request({
    //     host: 'localhost',
    //     port: 3000,
    //     path: '/fetchAllUsers',
    //     method: 'GET',
    //     headers: {
    //       // headers such as "Cookie" can be extracted from req object and sent to /test
    //     }
    //   }, function(response: Readable) {
    //     var data = '';
    //     response.setEncoding('utf8');
    //     response.on('data', (chunk) => {
    //       data += chunk;
    //     });
    //     response.on('end', () => {
    //     //   res.end('check result: ' + data);
    //       var request2 = http.request({
    //         host: 'localhost',
    //         port: 3000,
    //         path: '/balances',
    //         method: 'GET',
    //         headers: {
    //           // headers such as "Cookie" can be extracted from req object and sent to /test
    //         }
    //       }, function(response2: Readable) {
    //         var data2 = '';
    //         response2.setEncoding('utf8');
    //         response2.on('data', (chunk2) => {
    //           data2 += chunk2;
    //         });
    //         response2.on('end', () => {
    //           res.end('check result: ' + data + data2);
    //         });
    //       });
    //       request2.end();
    //     });
    //   });
    //   request.end();
    // }
    // getSuggestions()
    // getUserDetailsAPI()
    //     .then(data => res.status(200).send(data))
    //     .catch(err => console.log("Error", err))
});
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
