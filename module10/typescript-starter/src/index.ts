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

const callAPI = async (character : string) => {
    var request = await http.request({
        host: 'localhost',
        port: 3000,
        path: `/fetchAllUsers/${character}`,
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
        })
    })
    request.end();
}

function Main(char_list : string[]) {
    for(var chr of char_list) {
        callAPI(chr);
    }
  };

Main(['a','b','c','d','e','f']);



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
