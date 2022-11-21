import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { writeHeapSnapshot } from 'v8';

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

writeHeapSnapshot()

var car1 = new Car('bmw', '1000', 'blue');
var car2 = new Car('honda', '2000', 'green');
var car3 = new Car('fiat', '3000', 'red');
writeHeapSnapshot()
var car4 = new Car('merc', '4000', 'yellow');
var car5 = new Car('porsche', '5000', 'white');

writeHeapSnapshot()

// @ts-ignore
car3 = undefined;

writeHeapSnapshot()


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
