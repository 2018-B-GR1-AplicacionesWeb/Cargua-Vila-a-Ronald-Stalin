holaMundo();//Hola mundo

function holaMundo() {
    console.log('Hola mundo');
}

console.log(holaMundo());//undefined

function sumarDosNumeros(numeroUno, numeroDos) {
    var esNumberNumeroUno = typeof numeroUno == 'number';
    var esNumberNumeroDos = typeof numeroDos == 'number';
    if (esNumberNumeroUno && esNumberNumeroDos) {
        return numeroUno + numeroDos
    } else {
        console.error('No envia numeros');
        return 0;
    }
}
console.log(sumarDosNumeros(1, 2));
console.log(sumarDosNumeros('Ronald', true, 3, 4, 5, 6,));

function sumarNNumeros(...numeros) {
    var tieneUnParametroDiferenteDeNumbre = false;
    var resultado =0;
    var respuesta = sumarNumerosDesdeUnArreglo(numeros);
    if (respuesta.noEsNumber) {
        console.error('No envia numeros');
        return 0;
    } else {
        return respuesta.resultado
    }
}
function sumarNumerosDesdeUnArreglo(numeros){
    var tieneUnParametroDiferenteDeNumbre = false;
    var resultado =0;
    for (var i = 0; i < numeros.length; i++) {
        var esNumeroNumber = typeof numeros[i] == 'number';
        if (!esNumeroNumber) {
            tieneUnParametroDiferenteDeNumbre = true;
        } else {
            resultado = resultado + numeros[i];
        }
    }
    return {
        noEsNumber: tieneUnParametroDiferenteDeNumbre,
        resultado: resultado
    }

}
console.log(sumarNNumeros(1,2,3,4,5));
function saludarEnUpperCase(nombre, funcion) {
    return `Hola ${funcion(nombre)}`;//template strings
}
console.log(saludarEnUpperCase("ronald", convertirStringEnMayuscula));
console.log(saludarEnUpperCase("VICENTE", convertirStringEnMinuscula));
console.log(saludarEnUpperCase("Buen dia", anadirPuntoAlFinal));

function convertirStringEnMayuscula(texto) {
    return texto.toUpperCase();
}

function convertirStringEnMinuscula(texto) {
    return texto.toLowerCase();
}

function anadirPuntoAlFinal(texto) {
    return texto + ".";
}

function primeraLetraEnMayuscula(texto) {
    var primeraLetraMayuscula = texto[0].toUpperCase();
    var restoPalabra = texto.slice(1, texto.length);
    return primeraLetraMayuscula + restoPalabra;
}
console.log(saludarEnUpperCase("ronald",primeraLetraEnMayuscula));

