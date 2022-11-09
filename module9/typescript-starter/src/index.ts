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

interface UserBalance {
    id: string,
    balance: string
}
interface UserName {
    id: string,
    name: string
}

// **********************************
// *** SOLUTION USING ASYNC AWAIT ***
// **********************************
app.get('/getUserDetailsAsync/:id', (req: Request, res: Response) => {
    getBalances(req.params.id, res)
});

const getBalances = async (id: string, res: Response) => {

    var balance: string;
    var name: string;

    var request = await http.request({
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
            balance = JSON.parse(data).find((user: UserBalance) => user.id === id).balance;
        })
    })
    request.end();

    var request2 = await http.request({
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
            name = JSON.parse(data2).find((user: UserName) => user.id === id).name;
            res.end(id + ',' + name + ',' + balance);
        })
    })
    request2.end();
}
// **********************************
// *** SOLUTION USING ASYNC AWAIT ***
// **********************************







// ****************************
// *** SOLUTION USING PROMISE ***
// ****************************

function httpRequestBalance() {
    return new Promise<string>(function (resolve, reject) {
        var req = http.request({
            host: 'localhost',
            port: 3000,
            path: '/balances',
            method: 'GET',
            headers: {
            }
        }, function (res: Readable) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body);
            });
        });
        req.on('error', function (err: Error) {
            reject(err);
        });
        req.end();
    });
}

function httpRequestUsers() {
    return new Promise<string>(function (resolve, reject) {
        var req = http.request({
            host: 'localhost',
            port: 3000,
            path: '/fetchAllUsers',
            method: 'GET',
            headers: {
            }
        }, function (res: Readable) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body);
            });
        });
        req.on('error', function (err: Error) {
            reject(err);
        });
        req.end();
    });
}


app.get('/getUserDetailsPromise/:id', (req: Request, res: Response) => {
    httpRequestBalance().then(function (body: string) {
        var balance = JSON.parse(body).find((user: UserBalance) => user.id === req.params.id).balance;
        httpRequestUsers().then(function (body2: string) {
            var name = JSON.parse(body2).find((user: UserName) => user.id === req.params.id).name;
            res.send(req.params.id + ',' + name + ',' + balance);
        })
    })
});
// ****************************
// *** SOLUTION USING PROMISE ***
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
