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
const fs = require('fs');
const v8 = require('v8');

function createHeapSnapshot() {
    const snapshotStream = v8.getHeapSnapshot();
    const fileName = `${Date.now()}.heapsnapshot`;
    const fileStream = fs.createWriteStream(fileName);
    snapshotStream.pipe(fileStream);
}

interface Car {
    model: string,
    engine: string,
    colour: string
}

class Car {
    constructor(model: string, engine: string, colour: string) {
        this.model = model;
        this.engine = engine;
        this.colour = colour;
    }
}

createHeapSnapshot()

var car1 = new Car('bmw', '1000', 'blue');
var car2 = new Car('honda', '2000', 'green');
var car3 = new Car('fiat', '3000', 'red');
createHeapSnapshot()
var car4 = new Car('merc', '4000', 'yellow');
var car5 = new Car('porsche', '5000', 'white');

createHeapSnapshot()

// @ts-ignore
car3 = undefined;

createHeapSnapshot()


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
