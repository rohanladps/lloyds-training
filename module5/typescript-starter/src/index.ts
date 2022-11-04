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


const customers = [
    {
        "name": "rohan",
        "product": "pizza"
    },
    {
        "name": "ben",
        "product": "cheese"
    },
    {
        "name": "owen",
        "product": "milk"
    },
    {
        "name": "edward",
        "product": "apple"
    },
    {
        "name": "mark",
        "product": "banana"
    }
];


app.get('/fetchCustomer/:name', (req: Request, res: Response) => {
    const responseCustomer = customers.find(customer => customer.name === req.params.name);
    if (responseCustomer) {
    res.send(responseCustomer);
    }
    else {
        res.send('Sorry, we could not find a customer with that name');
    }
});

app.post('/postCustomer/:name/:product', (req: Request, res: Response) => {
    const newCustomer = {"name": req.params.name, "product": req.params.product};
    customers.push(newCustomer);
    res.send('New Customer has been added');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});