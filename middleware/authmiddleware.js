const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async (req, res, next) =>{

    try{
        const recievedId = req.headers.authorization.split(' ')[2];
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        const userId = decodedToken.userId;
        if(recievedId !== userId){
           return res.status(401).send({message:'No authorization'})
        }
        next()

    }catch (e){
        return res.status(401).send({message:'No authorization'})
    }
}
