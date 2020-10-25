const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    const budget = JSON.parse(fs.readFileSync('myBudget.json', 'utf8'));
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
