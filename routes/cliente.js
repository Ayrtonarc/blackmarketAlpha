'use strict'

var express = require('express');
var ClienteController = require('../controllers/ClienteController');

var api = express.Router();

api.post('/registro_cliente', ClienteController.registro_cliente); //url

module.exports = api;