const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'client/src/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({storage: storage})

const auth = require("../middleware/authmiddleware.js");

const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoClient.connect((err, client) => {
  const main = client.db("main");
  const users = main.collection("users");

  router.get("/:userid", auth, async (req, res) => {
    try {
      const user = await users.findOne({ _id: ObjectId(req.params.userid) });
      if (!user) {
        return res.status(404).send({ message: "User was not found" });
      }
      res.send(user);
    } catch (e) {
      res.status(404).send({ message: "Page not found" });
    }
  });

  router.post("/:userid", upload.single('userImage'), auth, async (req, res) => {
    try {
      const user = await users.findOne({ _id: ObjectId(req.params.userid) });
      if (!user) return res.status(404).send({ message: "User was not found" });

      users.updateOne(
        { _id: ObjectId(req.params.userid) },
        {
          $set: {
            updated: !!req.body.updated,
            name: req.body.name,
            secondName: req.body.secondName,
            dateOfBirth: req.body.dateOfBirth,
            address: {
              street: req.body.street,
              post: req.body.post,
              city: req.body.city
            },
            phone: req.body.phone,
            imageUrl: req.file.path,
            imageName: req.file.filename
          }
        }
      );
      res.send({message: "User was updated"});
    } catch (e) {
      res.status(401).send({ message: "Something is wrong with updating user" });
    }
  });
});

module.exports = router;
