const express = require("express");
const router = express.Router();
const Case = require('../models/Case')
const auth = require("../middleware/authmiddleware.js");
const access = require('../middleware/accessmiddleware');

const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoClient.connect((err,client) =>{
    const main = client.db('main');
    const users = main.collection('users');
    const usersData = client.db('usersData');

    router.post('/', (req,res) =>{
        try{
            const id = req.body.id
            const array = []
            const cases = usersData.collection(id).find({ })
            console.log(cases)
            if(!cases) 
                return res.status(404).send({message:"No cases found for this request"})
            cases.forEach( item =>{
                array.push(item)
            },
            () =>res.send(array))

        }catch (err){


        }
    })
    router.post('/new', (req,res) => {
        try{
            const id = req.body.id;

            const event = new Case({
                doctor: req.body.doctor,
                disease: req.body.disease,
                recipe: req.body.recipe,
                information: req.body.information
            })

            usersData.collection(id).insertOne(event);

            res.send({message: "Success"})

        }catch (err){

        }
    })


});

module.exports = router;