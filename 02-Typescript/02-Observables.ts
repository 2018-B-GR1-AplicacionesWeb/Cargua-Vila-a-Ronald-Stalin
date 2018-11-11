//import {paquete Uno, paquete DOS} from 'rxjs';
/*import * as rxjs from 'rxjs';
import {Observable} from "rxjs";*/
declare var require;
declare var module: any;
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;
const observableUno$ = rxjs.of([1, 2, 3], 3, 'Hola', 3, true, 3, { nombre: 'Ronald' }, new Date(), 3);
console.log(observableUno$);
observableUno$
    .pipe(disctinct(), map((valor) => {
        console.log('Valor', valor);
        return {
            data: valor
        };
    }))
    .pipe()
    .pipe()
    .subscribe((ok) => {
        console.log('En ok', ok);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
    });
const promesita = () => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        resolve(':)');
    });
};
async function  ejecutarCodigoSyncrono() {
    console.log('Inicio');
    try{
        const resultadoPromesita= await promesita();
        console.log(resultadoPromesita);
    }catch (e) {
        console.log('Error en promesita',e);
    }
    console.log('Fin');
}
ejecutarCodigoSyncrono();


/*
const observableDePromesa$ = rxjs.from(promesita());
observableDePromesa$
    .pipe(map((valor) => {
        return {
            data: valor
        };
    }))
    .subscribe((objetoFeliz) => {
        console.log(objetoFeliz);
    }, (error) => {
        console.log(error);
    });
*/