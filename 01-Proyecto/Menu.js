var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var map = require('rxjs/operators').map;
var usuarios = function (usua) {
    return new Promise(function (resolve, reject) {
        fs.readFile('Login.txt', 'utf-8', function (err, contenido) {
            if (err) {
                reject(err);
            }
            else {
                var arregloUsuarios = contenido.split(/\r?\n/).map(function (linea) {
                    var users = linea.split(' ');
                    return { user: users[0], pass: users[1] };
                });
                arregloUsuarios
                    .forEach(function (element) {
                    if (usua === element.user) {
                        resolve(element.pass);
                    }
                });
            }
        });
    });
};
//usuarios('ronald').then((contenido)=>{console.log(contenido)}).catch((err)=>{console.log(err)});
var queEs = {
    name: 'queEsUsted',
    type: 'list',
    message: '¿Qué es usted?',
    choices: ['Comprador', 'Vendedor'],
    default: 1,
};
var menuVendedor = {
    name: 'menuVendedor',
    type: 'list',
    message: 'Escoja una opción:',
    choices: ['Ingresar más productos', 'Editar productos', 'Ingresar Usuarios', 'Regresar'],
    default: 3,
};
var menuComprador = {
    name: 'menuComprador',
    type: 'list',
    message: 'Escoja una opción:',
    choices: ['Escojer producto a comprar', 'Enlistar los productos seleccionados', 'Regresar'],
    default: 2,
};
var login = [{
        name: 'user',
        type: 'input',
        message: 'Ingrese su usuario: '
    }, {
        name: 'pass',
        type: 'password',
        message: 'Ingrese su contraseña: ',
        mask: '*'
    }];
function regresar() {
    inquirer.prompt(queEs).then(function (answer) {
        if (answer.queEsUsted === 'Vendedor') {
            subMenuVendedor();
        }
        else {
            subMenuComprador();
        }
    });
}
function logi() {
    inquirer.prompt(login).then(function (ans) {
        usuarios(ans.user).then(function (user) {
            if (user === ans.pass) {
                inquirer.prompt([menuVendedor]).then(function (menu) {
                    if (menu.menuVendedor === 'Regresar') {
                        regresar();
                    }
                });
            }
            else {
                console.log('Usuario o contraseña incorrecta');
                logi();
            }
        }).catch(function (error) {
            console.log(error);
        });
    });
}
function subMenuVendedor() {
    logi();
}
function subMenuComprador() {
    inquirer.prompt([menuComprador]).then(function (ans) {
        if (ans.menuComprador === 'Regresar') {
            regresar();
        }
    });
}
regresar();
/*
inquirer.prompt([queEs]).then((answer)=>{
    if (answer.queEsUsted==='Vendedor'){
        subMenuVendedor();
    }
    else{
        inquirer.prompt([menuComprador]).then((ans=> {
            if (ans.menuVendedor === 'Regresar') {
                inquirer.prompt([queEs])
            }
        }));
    }
});
*/
