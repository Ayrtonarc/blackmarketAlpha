'use strict'

var Cliente = require('../models/cliente');

const registro_cliente = async function(req, res){
    //
    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

    if(clientes_arr.length == 0){
        var reg = await Cliente.create(data);
        res.status(200).send({data:reg});
    }else{
        res.status(200).send({message: 'El correo ya existe',data:undefined});
    }

}

module.exports ={
    registro_cliente
}