const calculador = require('./02-calculadora.js');
const util = require('../05-nodejs-02/01-util.js');
const tiempo = require('./tiempo/02-tiempo');
const fs = require('fs');
const exprexjs=require('express');
console.log('Calculadora',calculador.nombreCalculadora);
console.log('Calculadora',calculador.sumarDosNumeros(1,2));
console.log(tiempo);
console.log(exprexjs);
console.log(fs);
console.log('Util',util);