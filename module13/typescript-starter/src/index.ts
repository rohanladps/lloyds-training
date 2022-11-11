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

// From: https://blog.logrocket.com/understanding-memory-leaks-node-js-apps/
// The following code will cause a memory leak because the variable requests, which holds a new instance of the Map object, is global. 
// Thus, every time a request hits the server, there is a memory allocation to the object.
// The guaranteed memory allocation to the new instance means that the object will live forever. 
// The application will eventually run out of memory and crash when the number of requests consumes memory beyond the resources available to the application.
const requests = new Map();
app.get( "/:id", (req,res) => {
    requests.set(req.params.id, req);
    createHeapSnapshot()
    res.status(200).send("Hello World");
});



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
