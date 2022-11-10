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
var Car = /** @class */ (function () {
    function Car(model, engine, colour) {
        this.model = model;
        this.engine = engine;
        this.colour = colour;
    }
    return Car;
}());
createHeapSnapshot();
var car1 = new Car('bmw', '1000', 'blue');
var car2 = new Car('honda', '2000', 'green');
var car3 = new Car('fiat', '3000', 'red');
createHeapSnapshot();
var car4 = new Car('merc', '4000', 'yellow');
var car5 = new Car('porsche', '5000', 'white');
createHeapSnapshot();
// @ts-ignore
car3 = undefined;
createHeapSnapshot();
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
