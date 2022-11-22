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
const axios = require('axios');


app.get('/fetchAllUsers/:character', (req: Request, res: Response) => {
    fs.readFile('src/file_to_be_changed.txt', 'utf8', (err : Error, data: string) => {
                data = data.replaceAll(req.params.character, '');
                fs.writeFile('src/file_to_be_changed.txt', data, (err : Error) => {
                    if (err) {
                      console.error(err);
                    }
                  });
    })
    res.send(`Every instance of character ${req.params.character} has successfully been removed from the file`);

});

axios.get('http://localhost:3000/fetchAllUsers/a')
    .then(function (response: any) {
    })
    .catch(function (error: any) {
        console.log(error);
    })
    .then(function () {
        axios.get('http://localhost:3000/fetchAllUsers/b')
            .then(function (response: any) {
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                axios.get('http://localhost:3000/fetchAllUsers/c')
                    .then(function (response: any) {
                    })
                    .catch(function (error: any) {
                        console.log(error);
                    })
                    .then(function () {
                        axios.get('http://localhost:3000/fetchAllUsers/d')
                            .then(function (response: any) {
                            })
                            .catch(function (error: any) {
                                console.log(error);
                            })
                            .then(function () {
                                axios.get('http://localhost:3000/fetchAllUsers/e')
                                    .then(function (response: any) {
                                    })
                                    .catch(function (error: any) {
                                        console.log(error);
                                    })
                                    .then(function () {
                                        axios.get('http://localhost:3000/fetchAllUsers/f')
                                            .then(function (response: any) {
                                            })
                                            .catch(function (error: any) {
                                                console.log(error);
                                            })
                                            .then(function () {
                                            });
                                    });
                            });
                    });
            });
    });



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
