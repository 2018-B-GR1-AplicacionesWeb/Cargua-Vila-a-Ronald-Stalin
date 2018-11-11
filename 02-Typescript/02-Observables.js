var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function ejecutarCodigoSyncrono() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Inicio');
        try {
            const resultadoPromesita = yield promesita();
            console.log(resultadoPromesita);
        }
        catch (e) {
            console.log('Error en promesita', e);
        }
        console.log('Fin');
    });
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
