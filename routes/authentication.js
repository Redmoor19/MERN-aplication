const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const MongoClient = require('mongodb').MongoClient;

const mongoClient = new MongoClient(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true , useUnifiedTopology: true }
);

mongoClient.connect((err,client) =>{
    console.log('Database connected');
    const main = client.db('main');
    const users = main.collection('users');
    const usersData = client.db('usersData')

    /************Registration*********************/
    router.post('/register',
    [
        //Validation conditions
        check('email').isString().isEmail().exists(),
        check('password').isString().isLength({min:6}).exists()
    ],
    async (req, res) =>{
        try{
            //Validation results
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).send({message: 'Validation error'})
            }
            //Password hash
            const hashedpassword = await bcrypt.hash(req.body.password, 10);
            //Create user
            const user = new User({
                email: req.body.email,
                password: hashedpassword
            })
            //Check of the user existance
            const userExist = await users.findOne({email: user.email})
            if (userExist){
                return res.send({message: 'Such user already exists'})
            }               
            //Save user
            await users.insertOne(user);
            res.send({message: 'User was created'});
            //Create user's database
            usersData.createCollection(user.id)

        }catch (e){
            res.status(404).send({message: 'Something is wrong'})
        }
    });
    /************Login*********************/
    router.post('/login',
        [
            check('email').normalizeEmail().isEmail(),
            check('password').exists()
        ],
        async (req,res) =>{
        try{
            //Login validation
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(422).send({message: 'Login data is incorrect'})
            }
            //User check
            const user = await users.findOne({email: req.body.email})
            if(!user){
                return res.status(404).send({message: 'User was not found'})
            }
            //Password check
            const passMatch = await bcrypt.compare(req.body.password,user.password)
            if (!passMatch){
                return res.status(404).send({message:'Wrong password'})
            }
            //JWT authentication
            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.send({token, userId: user._id, worthy: user.isWorthy})

        }catch (e){
            res.status(400).send({message:'Something is wrong'})
        }

    })
});



module.exports = router;