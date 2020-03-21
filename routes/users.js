const express = require('express');
const router = express.Router();
const auth = require('../middleware/authmiddleware');
const access = require('../middleware/accessmiddleware');

const MongoClient = require('mongodb').MongoClient;

const mongoClient = new MongoClient(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true , useUnifiedTopology: true }
);

mongoClient.connect((err,client) =>{
    const main = client.db('main');
    const users = main.collection('users');
    const usersData = client.db('usersData')

    router.get('/', async (req,res) => {
        try{
            const array = []
            const clients = users.find({"isWorthy":false})
            if(!clients) 
                return res.status(404).send({message:"Users not found"})
            clients.forEach( (user) =>{
                array.push(user)
            },
            () =>res.send(array))
            
            
        }catch (e){
            res.status(404).send({message:"Users not found"})
        }
    })

});

module.exports = router;

