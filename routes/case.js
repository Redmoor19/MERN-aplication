const express = require("express");
const router = express.Router();
const Case = require('../models/Case')
const auth = require("../middleware/authmiddleware.js");
const access = require('../middleware/accessmiddleware');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/src/files')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({storage: storage})


const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoClient.connect((err,client) =>{
    const usersData = client.db('usersData');
    const main = client.db('main');
    const users = main.collection('users');

    router.post('/',
        auth,
        (req,res) =>{
        try{
            const id = req.body.id
            const array = []
            const cases = usersData.collection(id).find({ })
            if(!cases) 
                return res.status(404).send({message:"No cases found for this request"})
            cases.forEach( item =>{
                array.push(item)
            },
            () =>res.send(array))

        }catch (err){
            res.status(404).send({message:"Something went wrong with getting cases"})
        }
    })
    router.post('/new',
        auth,
        access,
        async (req,res) => {
        try{
            const id = req.body.id;

            if(!usersData.collection(id)){
                return res.status(404).send({message:"No such user"})
            }

            const event = new Case({
                doctor: req.body.doctor,
                doctorId: req.body.doctorId,
                disease: req.body.disease,
                recipe: req.body.recipe,
                information: req.body.information
            })
            res.send({message: "Success"})

            await usersData.collection(id).insertOne(event);

            await users.updateOne(
                {_id: ObjectId(id)},
                {
                    "$push":{
                        "notifications":{
                            type: "case",
                            from: req.body.doctor,
                            to: id
                        }
                    }
                }
            )

        }catch (err){
            res.status(403).send({message:"Something went wromg with posting a case"})
        }
    })

    router.post('/upload', 
        upload.single('file'),
        auth,
        async (req,res) =>{
        try{
        const post = await usersData.collection(req.body.userId).findOne({_id: ObjectId(req.body.postId)});
        
        if (req.file) {
        await usersData.collection(req.body.userId).updateOne(
            { _id: ObjectId(req.body.postId)},
            {
                "$push":{
                    "comments":{
                        person: req.body.person,
                        content: req.body.content,
                        filename: req.file.originalname,
                        date: Date.now()
                    },
                }
            }
        )}else{
        await usersData.collection(req.body.userId).updateOne(
            { _id: ObjectId(req.body.postId)},
            {
                "$push":{
                    "comments":{
                        person: req.body.person,
                        content: req.body.content,
                        date: Date.now()
                    },
                }
            }
        )  
        }
        if (req.body.senderId == req.body.userId){
            await users.updateOne(
                {_id: ObjectId(post.doctorId)},
                {
                    "$push":{
                        "notifications":{
                            type: "comment",
                            from: req.body.person,
                            to: req.body.userId
                        }
                    }
                }
            )
        }else{
            await users.updateOne(
                {_id: ObjectId(req.body.userId)},
                {
                    "$push":{
                        "notifications":{
                            type: "comment",
                            from: req.doctor,
                            to: req.body.userId
                        }
                    }
                }
            )
        }

        res.send({message: "Post has been posted"})
        }catch (err){
            res.send({message:"Something went wrong with sending comment"})
        }

    })

    router.delete('/delete/:id',
        auth,
        async (req, res) => {
        try{
            users.updateOne({_id: ObjectId(req.params.id)},
            {
                "$unset":{notifications: ""}
            })
            res.send({message: "Notifications were cleared"})
        }catch (err){
            res.status(404).send({message: "No such user found"})
        }
    })
});

module.exports = router;