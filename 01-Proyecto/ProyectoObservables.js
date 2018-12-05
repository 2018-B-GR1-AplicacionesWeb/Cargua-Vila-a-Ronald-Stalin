var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Escoja una opción: ',
    choices: [
        '1.- Crear Producto',
        '2.- Borrar Producto',
        '3.- Buscar Producto',
        '4.- Actualizar Producto',
    ]
};
var ingresarProductos = [{
        name: 'nombre',
        type: 'input',
        message: 'Ingrese el nombre del producto: '
    }, {
        name: 'categoria',
        type: 'input',
        message: 'Ingrese la categoria del producto: '
    }, {
        name: 'precio',
        type: 'input',
        message: 'Ingrese el precio del producto: '
    }];
var preguntaBuscarProducto = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese el nombre del producto',
    }
];
var preguntaEdicionProducto = [{
        name: 'nombre',
        type: 'input',
        message: 'Ingrese el nuevo nombre del producto: '
    }, {
        name: 'categoria',
        type: 'input',
        message: 'Ingrese la nueva categoria del producto: '
    }, {
        name: 'precio',
        type: 'input',
        message: 'Ingrese el nuevo precio del producto: '
    }];
function inicialiarBDD() {
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile('bdd.json', '{"productos":[]}', function (error) {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"productos":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function main() {
    var respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe(function (data) {
        //
        console.log("\n*************Base Final*****************\n");
        console.log(data.bdd.productos);
    }, function (error) {
        //
        console.log(error);
    }, function () {
        main();
        console.log('Complete');
    });
}
function guardarBDD(bdd) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (error) {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
function preguntarOpcionesMenu() {
    return mergeMap(function (respuestaBDD) {
        return rxjs.from(inquirer.prompt(preguntaMenu)).pipe(map(function (respuesta) {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function opcionesRespuesta() {
    return mergeMap(function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case '1.- Crear Producto':
                return rxjs
                    .from(inquirer.prompt(ingresarProductos))
                    .pipe(map(function (producto) {
                    respuestaBDD.producto = producto;
                    return respuestaBDD;
                }));
            case '3.- Buscar Producto':
                return buscarProducto(respuestaBDD);
                break;
            case '4.- Actualizar Producto':
                return preguntarNombre(respuestaBDD);
            case '2.- Borrar Producto':
                return borrarProducto(respuestaBDD);
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    function (respuestaBDD) {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    function (respuestaBDD) {
        var opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case '1.- Crear Producto':
                var producto = respuestaBDD.producto;
                respuestaBDD.bdd.productos.push(producto);
                return respuestaBDD;
            case '4.- Actualizar Producto':
                var indice = respuestaBDD.indiceUsuario;
                respuestaBDD.bdd.productos[indice].nombre = respuestaBDD.producto.nombre;
                respuestaBDD.bdd.productos[indice].categoria = respuestaBDD.producto.categoria;
                respuestaBDD.bdd.productos[indice].precio = respuestaBDD.producto.precio;
                return respuestaBDD;
            case '2.- Borrar Producto':
                return respuestaBDD;
            case '3.- Buscar Producto':
                return respuestaBDD;
        }
    });
}
function preguntarNombre(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarProducto))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiciProducto = respuestaBDD.bdd.productos
            .findIndex(// -1
        function (producto) {
            return producto.nombre === respuesta.nombre;
        });
        if (indiciProducto === -1) {
            console.log('*************************');
            return preguntarNombre(respuestaBDD);
        }
        else {
            console.log(indiciProducto);
            respuestaBDD.indiceUsuario = indiciProducto;
            return rxjs.from(inquirer.prompt(preguntaEdicionProducto)).pipe(map(function (respuesta) {
                respuestaBDD.producto = {
                    nombre: respuesta.nombre,
                    categoria: respuesta.categoria,
                    precio: respuesta.precio
                };
                return respuestaBDD;
            }));
        }
    }));
}
function borrarProducto(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarProducto))
        .pipe(mergeMap(// RESP ANT OBS
    function (respuesta) {
        var indiceProducto = respuestaBDD.bdd
            .productos
            .findIndex(// -1
        function (producto) {
            return producto.nombre === respuesta.nombre;
        });
        if (indiceProducto === -1) {
            console.log('Borrar****************');
            return preguntarNombre(respuestaBDD);
        }
        else {
            console.log(indiceProducto);
            return rxjs.from(promesaEliminar(respuestaBDD.bdd.productos, indiceProducto)).pipe(map(function () {
                return respuestaBDD;
            }));
        }
    }));
}
function buscarProducto(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarProducto))
        .pipe(mergeMap(function (respuesta) {
        var indiceProducto = respuestaBDD.bdd.productos
            .findIndex(// -1
        function (producto) {
            return producto.nombre === respuesta.nombre;
        });
        if (indiceProducto === -1) {
            console.log('Buscar***********');
            return preguntarNombre(respuestaBDD);
        }
        else {
            return rxjs.from(promesaBuscar(respuestaBDD.bdd.productos[indiceProducto])).pipe(map(function () {
                return respuestaBDD;
            }));
        }
    }));
}
var promesaBuscar = function (respuestaBDD) {
    return new Promise(function (resolve) {
        var resultado = {
            respuesta: respuestaBDD
        };
        console.log('\nRespuesta:\n', respuestaBDD);
        resolve(resultado);
    });
};
var promesaEliminar = function (respuestaBDD, indiceProducto) {
    return new Promise(function (resolve) {
        resolve(respuestaBDD.splice(indiceProducto, 1));
    });
};
main();
