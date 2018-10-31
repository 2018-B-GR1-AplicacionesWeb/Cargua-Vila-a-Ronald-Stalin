//import {paquete Uno, paquete DOS} from 'rxjs';
const rxjs = require('rxjs');
const observableUnos$ = rxjs.of(1, 2, 3, 4, 5, 6, 7);
//en el parentesis es lo que mandamos
//rxjs.of devuelve un observable
console.log(observableUnos$);
observableUnos$
    .subscribe((ok) => {
    console.log(ok);
}, (error) => {
    console.log(error);
}); //acpeta dos funciones como el punto then y el punto catch
