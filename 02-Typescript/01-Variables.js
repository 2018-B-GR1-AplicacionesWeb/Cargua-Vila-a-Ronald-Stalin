// npm i -g typescript
const nombre = " ";
const edad = 23;
const nada = null;
const casado = true;
let loQueSea = {};
loQueSea = 1;
loQueSea = 'facil';
loQueSea = true;
//Deifinicion de clases
const fechaNacimiento = new Date();
let identificador = '1';
identificador = 1;
identificador = 'uno';
class Usuario {
}
const usuario = {
    nombre: 'Ronald',
    apellido: 'Cargua'
};
usuario.edad = 2;
// el signo de pregunta es que ese parametro es opcional
// funciones ---------
function sumarDosNumeros(numeroUno, numeroDos) {
    return numeroDos + numeroUno;
}
sumarDosNumeros(2, 2);
const saludar = (nombre, apellido, ...infinito) => {
    return 2;
};
let respuesta = saludar('Ronald', 'Cargua', 1, 2, 3, 4);
respuesta = respuesta.toUpperCase();
let nombreDos = 'Ronald';
