// Budget API

const express = require('express');
const cors = require('cors');

const fs = require('fs');

const app = express();
const port = 3000;



app.use(express.static('public'));
app.use(cors());


const budget = require('./budget.json');

app.get('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.get('/budget', (req, res) => {
    
    const data = fs.readFileSync('./budget.json', 'utf8');
    res.json(JSON.parse(data));
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});