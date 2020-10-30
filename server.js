const express = require('express');
const app = express();

const mongoose = require ("mongoose");
const bodyParser = require('body-parser');
const chartDataModel = require ("./models/chartData_schema")

const url = 'mongodb://localhost:27017/myBudget'
const port = 3000;

app.use(bodyParser.json());

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> {
            // console.log("Connected to the database")
            chartDataModel.find({})
                        .then((data)=>{
                            res.json(data);
                            // console.log("Data within DB connection", data)
                            mongoose.connection.close()
                        })
                        .catch((connectionError)=>{
                            res.send(connectionError)
                            // console.log(connectionError)
                        })
        })
        .catch((connectionError) => {
            res.send(connectionError)
            // console.log(connectionError)
        });
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> {
            // console.log("Connected to the database")
            // let newData = new chartDataModel({title: "Test 1", budget: 300, color: "#ABC123"});
            let newData = new chartDataModel(req.body);           
            chartDataModel.insertMany(newData)
                        .then((data)=>{
                            // console.log(data)
                            res.json(data)
                            mongoose.connection.close()
                        })
                        .catch((connectionError)=>{
                            res.send(connectionError)
                            // console.log(connectionError)
                        })
        })
        .catch((connectionError) => {
            res.send(connectionError)
            // console.log(connectionError)
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

