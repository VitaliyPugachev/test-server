const express = require('express');
const config = require('config');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || config.get('port');
const app = express();

app.use(express.json());
app.use(cors());


for (let i = 1; i <= 5; i++) {
    app.get('/' + i, (req, res) => {
        try {
            fs.readFile(path.resolve(__dirname, 'data', `reports_${i}.json`), 'utf8', (error, content) => {
                return res.json(JSON.parse(content));
            })
        } catch (e) {
            console.log(e);
        }
    })
}

const start = async () => {
    try {

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT} port`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();

