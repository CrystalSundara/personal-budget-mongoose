const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require ("mongoose");
const chartDataModel = require ("./models/chartData_schema")

const url = 'mongodb://localhost:27017/myBudget'
const port = 3000;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
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









// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(()=> {
//             console.log("Connected to the database")
//             List all entries
//             chartDataModel.find({})
//                         .then((data)=>{
//                             console.log(data)
//                             mongoose.connection.close()
//                         })
//                         .catch((connectionError)=>{
//                             console.log(connectionError)
//                         })
            
            // // Fetch one document
            // chartDataModel.find({title: "Eat out"})
            //             .then((data)=>{
            //                 console.log(data)
            //                 mongoose.connection.close()
            //             })
            //             .catch((connectionError)=>{
            //                 console.log(connectionError)
            //             })

            // Fetch by ID
            // chartDataModel.findById("5f94a22223175da5a9b91fdc")
            //             .then((data)=>{
            //                 console.log(data)
            //                 mongoose.connection.close()
            //             })
            //             .catch((connectionError)=>{
            //                 console.log(connectionError)
            //             })

            // Insert data
            // let newData = new chartDataModel({title: "Testing valid hex", budget: 300, color: "#ABC123"});
            // chartDataModel.insertMany(newData)
            //             .then((data)=>{
            //                 console.log(data)
            //                 mongoose.connection.close()
            //             })
            //             .catch((connectionError)=>{
            //                 console.log(connectionError)
            //             })

            // Update data
            // let newData = {$set: {id: 10, name: "added a new name from MangoDB Native Driver"}};
            // chartDataModel.update({id: 10}, newData)
            //             .then((data)=>{
            //                 console.log(data)
            //                 mongoose.connection.close()
            //             })
            //             .catch((connectionError)=>{
            //                 console.log(connectionError)
            //             })       
            
            // Delete data
            // chartDataModel.remove({color: "#000000"})
            //             .then((data)=>{
            //                 console.log(data)
            //                 mongoose.connection.close()
            //             })
            //             .catch((connectionError)=>{
            //                 console.log(connectionError)
            //             })     

        // })
        // .catch((connectionError) => {
        //     console.log(connectionError)
        // })
