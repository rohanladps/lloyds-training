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
var callAPI = function (character) {
    var request = http.request({
        host: 'localhost',
        port: 3000,
        path: "/fetchAllUsers/".concat(character),
        method: 'GET',
        headers: {}
    }, function (response) {
        var data = '';
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
        });
    });
    request.end();
};
// async function Main() {
//     const result_a = callAPI('a');
//     const result_b = callAPI('b');
//     const result_c = callAPI('c');
//     const result_d = callAPI('d');
//     const result_e = callAPI('e');
//     const result_f = callAPI('f');
//     const finalResult = [await result_a, await result_b, await result_c, await result_d, await result_e, await result_f];
// }
function Main2(char_list) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, char_list_1, chr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, char_list_1 = char_list;
                    _a.label = 1;
                case 1:
                    if (!(_i < char_list_1.length)) return [3 /*break*/, 4];
                    chr = char_list_1[_i];
                    return [4 /*yield*/, callAPI(chr)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
// Main2(['a','b','c','d','e','f']);
Main2(['a', 'b']);
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
