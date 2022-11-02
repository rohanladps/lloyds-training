const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const book = req.body;
    res.send('The server has successfully received your request!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})