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
var v8 = require('v8');
function createHeapSnapshot() {
    var snapshotStream = v8.getHeapSnapshot();
    var fileName = "".concat(Date.now(), ".heapsnapshot");
    var fileStream = fs.createWriteStream(fileName);
    snapshotStream.pipe(fileStream);
}
// From: https://blog.logrocket.com/understanding-memory-leaks-node-js-apps/
// The following code will cause a memory leak because the variable requests, which holds a new instance of the Map object, is global. 
// Thus, every time a request hits the server, there is a memory allocation to the object.
// The guaranteed memory allocation to the new instance means that the object will live forever. 
// The application will eventually run out of memory and crash when the number of requests consumes memory beyond the resources available to the application.
var requests = new Map();
app.get("/:id", function (req, res) {
    requests.set(req.params.id, req);
    createHeapSnapshot();
    res.status(200).send("Hello World");
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
