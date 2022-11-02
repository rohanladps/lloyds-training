const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/read', (req, res) => {
    jsonReader('test.json', (err, data) => {
        if (err) {
            res.send('nonexistent');
        }
        else {
            res.send(data);
        }
    })
})

app.post('/submit', (req, res) => {
    fs.writeFile("test.json", JSON.stringify(req.body), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200);
})

fs.watchFile('test.json', (curr, prev) => {
    console.log('file Changed');
    jsonReader('test.json', (err, data) => {
        fs.writeFile("backup.json", JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
    })
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})