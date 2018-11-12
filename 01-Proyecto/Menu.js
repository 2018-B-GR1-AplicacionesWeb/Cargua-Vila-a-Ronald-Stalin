const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const usuarios = (usua) => {
    return new Promise((resolve, reject) => {
        fs.readFile('Login.txt', 'utf-8', (err, contenido) => {
            if (err) {
                reject(err);
            }
            else {
                const arregloUsuarios = contenido.split(/\r?\n/).map((linea) => {
                    var users = linea.split(' ');
                    return { user: users[0], pass: users[1] };
                });
                const contraseña = arregloUsuarios
                    .forEach((element) => {
                    if (usua === element.user) {
                        resolve(element.pass);
                    }
                    else {
                        reject();
                    }
                });
                resolve(contraseña);
            }
        });
    });
};
//usuarios('ronald').then((contenido)=>{console.log(contenido)}).catch((err)=>{console.log(err)});
const queEs = {
    name: 'queEsUsted',
    type: 'list',
    message: '¿Qué es usted?',
    choices: ['Comprador', 'Vendedor'],
    default: 1,
};
const menuVendedor = {
    name: 'menuVendedor',
    type: 'list',
    message: 'Escoja una opción:',
    choices: ['Ingresar más productos', 'Editar productos', 'Ingresar Usuarios', 'Regresar'],
    default: 3,
};
const menuComprador = {
    name: 'menuVendedor',
    type: 'list',
    message: 'Escoja una opción:',
    choices: ['Escojer producto a comprar', 'Enlistar los productos seleccionados', 'Regresar'],
    default: 2,
};
const login = [{
        name: 'user',
        type: 'input',
        message: 'Ingrese su usuario: '
    }, {
        name: 'pass',
        type: 'password',
        message: 'Ingrese su contraseña: ',
        mask: '*'
    }];
inquirer.prompt([queEs]).then((answer) => {
    if (answer.queEsUsted === 'Vendedor') {
        inquirer.prompt(login).then((ans) => {
            const contraseña = '';
            usuarios(ans.user).then((user) => {
                if (ans.pass === user) {
                    inquirer.prompt([menuVendedor]);
                }
                else {
                    console.log('Usuario o contraseña incorrecta');
                }
            });
        });
    }
    else {
        inquirer.prompt([menuComprador]).then((ans => {
            if (ans.menuVendedor === 'Regresar') {
                inquirer.prompt([queEs]);
            }
        }));
    }
});
