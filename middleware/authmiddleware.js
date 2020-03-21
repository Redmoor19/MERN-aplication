const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) =>{

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
           return res.status(401).send({message:'No authorization'})
        }
        next()

    }catch (e){
        return res.status(401).send({message:'No authorization'})
    }
}