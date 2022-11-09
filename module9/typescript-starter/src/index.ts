import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();
const app: Express = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fs = require('fs');
var http = require('http');

// ****************************
// *** SOLUTION USING ASYNC ***
// ****************************
app.get('/getUserDetailsAsync/:id', (req: Request, res: Response) => {
    getBalances(req.params.id, res)
});

const getBalances = async (id: string, res: Response) => {

    var balance: string;
    var name: string;

    var request = http.request({
        host: 'localhost',
        port: 3000,
        path: '/balances',
        method: 'GET',
        headers: {
        }
    }, function (response: Readable) {
        var data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            balance = JSON.parse(data).find((user: any) => user.id === id).balance;
        })
    })
    request.end();

    var request2 = http.request({
        host: 'localhost',
        port: 3000,
        path: '/fetchAllUsers',
        method: 'GET',
        headers: {
        }
    }, function (response2: Readable) {
        var data2 = '';
        response2.setEncoding('utf8');
        response2.on('data', (chunk2) => {
            data2 += chunk2;
        });
        response2.on('end', () => {
            name = JSON.parse(data2).find((user: any) => user.id === id).name;
            res.end(id + ',' + name + ',' + balance);
        })
    })
    request2.end();
}
// ****************************
// *** SOLUTION USING ASYNC ***
// ****************************

app.get('/fetchAllUsers', (req: Request, res: Response) => {
    const names = [{ id: '1', name: 'rohan' }, { id: '2', name: 'mark' }, { id: '3', name: 'ben' }, { id: '4', name: 'oscar' }];
    res.send(names);

});

app.get('/balances', (req: Request, res: Response) => {
    const balances = [{ id: '1', balance: '981' }, { id: '2', balance: '456' }, { id: '3', balance: '722' }, { id: '4', balance: '624' }];
    res.send(balances);

});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
