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

app.post('/module4api', (req, res) => {
    if (fs.existsSync('test.json')) {
        jsonReader('test.json', (err, data) => {
            res.send(data);
        })
    }
    else {
        fs.writeFile('test.json', JSON.stringify(req.body), (err) => {
            if (err) {
                console.log(err);
            }
            res.send('Successfully written to file.')
        });
    }
})

fs.watchFile('test.json', (curr, prev) => {
    console.log('file Changed');
    jsonReader('test.json', (err, data) => {
        fs.writeFile("backup.json", data ? JSON.stringify(data) : '', (err) => {
            if (err) {
                console.log(err);
            }
        });
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})