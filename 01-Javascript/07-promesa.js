//07-promesa.js
const fs = require('fs');
const nuevaPromesaDeLectura = new Promise(
    (resolve )=>{
        fs.readFile('06-text23.txt', 'utf-8',
            (err, contenidoArchivo)=>{
                if (err){
                    resolve('');
                }else{
                    resolve(contenidoArchivo);
                }
            });
    }
);
const nuevaPromesaEscritura = (contenidoLeido)=>{
    return  new Promise(
        (resolve , reject)=>{
            const contenido = contenidoLeido?contenidoLeido+'Otro hola':'Otro hola';
            fs.writeFile('06-text23.txt', contenido,
                (err)=>{
                    if (err){
                        reject(err);
                    }else{
                        resolve(contenido);
                    }
                });
        }
    );
};
console.log(nuevaPromesaDeLectura);
nuevaPromesaDeLectura
    .then(
        (contenidoArchivo)=>{
            console.log('Todo bien',contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)
        }
    ).then(
        (contenidCompleto)=>{
            console.log('Contenidos Completo', contenidCompleto);
        }
    ).catch(
    (resultadoError)=>{
        console.log('Algo malo paso',resultadoError);
    }
    );
const promesaAppFile=(nombreArchivo, contenidoArchivo)=>{
    return new Promise(
        (resolve, reject)=>{
            fs.readFile(nombreArchivo,'utf-8',
                (error,contenidoArchivoLeido)=>{
                    if (error){
                        fs.writeFile(nombreArchivo,contenidoArchivo,
                            (err)=>{
                                if (err){
                                    reject(err)
                                }else {
                                    resolve(contenidoArchivo)
                                }
                            }
                        );
                    }else{
                        fs.writeFile(nombreArchivo,contenidoArchivoLeido +contenidoArchivo,
                            (err)=>{
                                if (err){
                                    reject(err)
                                }else {
                                    resolve(contenidoArchivoLeido+contenidoArchivo)
                                }
                            }
                        );
                    }
                }
            );

        }
    )
};
console.log(promesaAppFile('08-text.txt','hola'));
promesaAppFile('08-text.txt','hola').then(
        (contenidoArchivo)=>{
            console.log('Todo bien',contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)
        }
).catch(
    (resultadoError)=>{
        console.log('Algo malo paso',resultadoError);
    }
);

const promesaForeach = (arregloString)=>{
    const arregloRespuestas=[];
    return new Promise(
        (resolve)=>{
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
                                    resolve (arregloRespuestas);
                                }
                            }
                        );
                    }
                );
    });
};
const arregloString=['A','B','C'];
console.log(promesaForeach(arregloString));
promesaForeach(arregloString).then((contenidArreglo)=>{
        console.log(contenidArreglo);
    });

