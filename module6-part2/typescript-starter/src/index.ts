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


app.get('/concatenateCustomers', (req: Request, res: Response) => {
    let customers1 = JSON.parse(fs.readFileSync('src/customers1.json'));
    let customers2 = JSON.parse(fs.readFileSync('src/customers2.json'));
    res.send(customers1.concat(customers2));

});



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});