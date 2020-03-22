module.exports = (req, res,next) =>{
    try{
        const worthy =  req.headers.authorization.split(' ')[3]
        if(worthy === 'true'){
            next()
        }else{
            return res.status(400).send({message:'You have no access'})
        }

    }catch (e){
        return res.status(400).send({message:'You have no access'})
    }
}