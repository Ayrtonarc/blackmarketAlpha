'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');

const registro_admin = async function(req, res){
    //
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){
       

       if(data.password){
        bcrypt.hash(data.password,null,null, async function(err, hash) {
            if(hash){
                data.password = hash;
                var reg = await Admin.create(data);
                res.status(200).send({data:reg});
            }else{
                res.status(200).send({message: 'No hay una contrasena',data:undefined});
            }
        });
       }else{
        res.status(200).send({message: 'No hay una contrasena',data:undefined});
       }
        
    }else{
        res.status(200).send({message: 'El correo ya existe',data:undefined});
    }

}

const login_admin = async function(req, res){
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({email:data.email});

    if(admin_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo',data: undefined});
    }else{
        //login
        let user = admin_arr[0];

        bcrypt.compare(data.password, user.password, async function(error, check){//comparar contrasena
            if(check){
                res.status(200).send({data:user});
            }else{
                res.status(200).send({message: 'La contrasena no coincide', data: undefined});
            }
        });
        
    }

    
}

module.exports = {
    registro_admin,
    login_admin
}