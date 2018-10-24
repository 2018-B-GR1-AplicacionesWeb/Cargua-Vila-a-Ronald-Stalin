const fs = require('fs');
const contenidoAAgregar ='Ronald\n';
const  nombreArchivo ='05-texto.txt';
console.log('Inicio');
fs.readFile(nombreArchivo,
    'utf-8',
    (error, contenidoArchivo)=> { //callback
        if (error){
           // console.log(error);
            try{
                throw new Error(error);
            }catch (e){
                console.log(e);
            }
            console.log('Extra')
        }else{
            console.log('Si sirvio', contenidoArchivo);
            fs.writeFile(nombreArchivo,contenidoArchivo+contenidoAAgregar,(error)=>{
                if (error) throw error;
                console.log('Archivo completado!')
            });
        }
});

console.log('Fin');