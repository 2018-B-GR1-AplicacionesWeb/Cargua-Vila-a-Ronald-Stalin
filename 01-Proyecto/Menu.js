const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const produtosSeleccionados = [];
function enlistarProductos(arreglo) {
    console.log('\n***Productos a comprar: ***');
    console.log('   Producto\t\tPrecio');
    arreglo.forEach((elemnto, indice) => {
        indice = indice + 1;
        console.log(`${indice} ${elemnto.nombre}\t\t${elemnto.precio}`);
    });
}
function arregloProductos(arreglo) {
    const arr = [];
    arreglo.forEach((elemnto) => {
        arr.push(elemnto.nombre);
    });
    return arr;
}
const productosABuscar = (producto) => {
    return new Promise((resolve, reject) => {
        fs.readFile('Productos.txt', 'utf-8', (err, contenido) => {
            if (err) {
                reject(err);
            }
            else {
                const arregloUsuarios = contenido.split(/\r?\n/).map((linea) => {
                    var users = linea.split(' ');
                    return { nombre: users[0], categoria: users[1], unidades: users[2], precio: users[3] };
                });
                arregloUsuarios
                    .forEach((element) => {
                    if (producto === element.nombre) {
                        resolve(element.precio);
                    }
                });
            }
        });
    });
};
function buscarProducto(arreglo) {
    console.log('\n***Productos a comprar: ***');
    console.log('   Producto\t\tPrecio');
    arreglo.forEach((elemnet, indice) => {
        productosABuscar(elemnet.productos).then((respuesta) => {
            indice = indice + 1;
            console.log(`${indice} ${elemnet.productos}\t\t${respuesta}`);
        });
    });
}
const productos = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('Productos.txt', 'utf-8', (err, contenido) => {
            if (err) {
                reject(err);
            }
            else {
                const arregloUsuarios = contenido.split(/\r?\n/).map((linea) => {
                    var users = linea.split(' ');
                    return { nombre: users[0], categoria: users[1], unidades: users[2], precio: users[3] };
                });
                resolve(arregloUsuarios);
            }
        });
    });
};
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
                arregloUsuarios
                    .forEach((element) => {
                    if (usua === element.user) {
                        resolve(element.pass);
                    }
                });
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
    name: 'menuComprador',
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
const confirmarMasProductos = {
    name: 'confirm',
    type: 'confirm',
    message: 'Desea comprar mas productos',
};
function menuProductos(producto) {
    inquirer.prompt([producto]).then((res) => {
        produtosSeleccionados.push(res);
        inquirer.prompt([confirmarMasProductos]).then((resul) => {
            if (resul.confirm === true) {
                console.log(produtosSeleccionados);
                menuProductos(producto);
            }
            else {
                subMenuComprador();
            }
        });
    });
}
function regresar() {
    inquirer.prompt(queEs).then((answer) => {
        if (answer.queEsUsted === 'Vendedor') {
            subMenuVendedor();
        }
        else {
            subMenuComprador();
        }
    });
}
function logi() {
    inquirer.prompt(login).then((ans) => {
        usuarios(ans.user).then((user) => {
            if (user === ans.pass) {
                inquirer.prompt([menuVendedor]).then((menu) => {
                    if (menu.menuVendedor === 'Regresar') {
                        regresar();
                    }
                });
            }
            else {
                console.log('Usuario o contraseña incorrecta');
                logi();
            }
        }).catch((error) => {
            console.log(error);
        });
    });
}
function subMenuVendedor() {
    logi();
}
function subMenuComprador() {
    inquirer.prompt([menuComprador]).then((ans) => {
        if (ans.menuComprador === 'Regresar') {
            regresar();
        }
        else if (ans.menuComprador === 'Escojer producto a comprar') {
            productos().then((resultado) => {
                const producto = {
                    name: 'productos',
                    type: 'list',
                    message: 'Escoja un producto',
                    choices: arregloProductos(resultado),
                    default: 1,
                };
                menuProductos(producto);
            });
        }
        else if (ans.menuComprador === 'Enlistar los productos seleccionados') {
            buscarProducto(produtosSeleccionados);
        }
    });
}
regresar();
