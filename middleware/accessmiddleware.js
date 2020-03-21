module.exports = (req, res,next) =>{
    try{
        if(req.body.isWorthy && req.body.isWorthy == false){
            next()
        }else{
            return res.status(400).send({message:'You have no access'})
        }

    }catch (e){
        return res.status(400).send({message:'You have no access'})
    }
}