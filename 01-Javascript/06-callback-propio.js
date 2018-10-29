// 06-callback-propio.js

const  fs = require('fs');

let totalArchivo='INICIO';

function appendFile(nombreArchivo,contenidoArchivo,callback) {

    //1ero leer si existe el archivo
    //si existe leer el contenido
    //sobre escribir el archivo con el contenido nuevo
    // mas el contenido antiguo

    fs.readFile(nombreArchivo,'utf-8',
        (error,contenidoArchivoLeido)=>{
            if (error){
                fs.writeFile(nombreArchivo,contenidoArchivo,
                    (err)=>{
                       if (err){
                        console.error('Error escribiendo');
                        callback(undefined,err);
                    }else {
                           console.log('Archivo creado');
                            callback(contenidoArchivo,undefined);
                       }
                    }
                );
            }else{
                fs.writeFile(nombreArchivo,contenidoArchivoLeido +contenidoArchivo,
                    (err)=>{
                        if (err){
                            console.error('Error escribiendo');
                            callback(undefined,err);
                        }else {
                            console.log('Archivo creado');
                            callback(contenidoArchivoLeido+contenidoArchivo,undefined);
                        }
                    }
                );
            }
        }
    );
}

 appendFile('06-text.txt',
            '\nAdios mundo',
            (contenidoArchivo,error)=>{
                if (error){
                    console.log('Error:',error)
                }else{
                    //
                }
            }
 );

//['A','B','C']
//0-A.txt 'A'
//0-B.txt 'B'
//0-C.txt 'C'

function ejercicioDeArchivos(arregloString,callback) {
    const arregloRespuestas=[];
    arregloString
        .forEach(
            (string, indice)=>{
                const archivo =`${indice}-${string}.txt`;
                const contenido =`${string}`;
                fs.writeFile(archivo,
                    contenido,
                    (err)=>{
                        const  respuesta = {
                            nombreArchivo: archivo,
                            contenidoArchivo: contenido,
                            error: err
                        };
                        arregloRespuestas.push(respuesta);
                        const tamanoRespuestas = arregloRespuestas.length;
                        if(tamanoRespuestas === arregloString.length){
                            callback(arregloRespuestas);
                        }
                    }
                );
            }
        );

}
const arregloString=['A','B','C'];
ejercicioDeArchivos(arregloString,
    (arregloRespuestas)=>{
    console.log(arregloRespuestas)
});