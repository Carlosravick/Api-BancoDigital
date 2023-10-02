
const verificar = ( req, res, next ) => {
    const {senha_banco} = req.query;

    if(!senha_banco){
       return res.status(400).json('é necessario colocar senha')
    }if(senha_banco !== 'Cubos123Bank'){
       return res.status(400).json('senha incorreta')
    }

    next()

}

module.exports=verificar