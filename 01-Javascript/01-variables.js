
// Tipados Int edad= 1;
var edad =1;//number
var sueldo = 1.01;//number
var nombre="Ronald";//string
var nombre='Ronald';//string
var nombre = `Ronald`;//string
var casado = false;//boolean
var hijos = null;//object
var cuatroBrazos;//undefined
var fecha = new Date();// object
console.log('cuatroBrazos', fecha);//undefined
console.log(typeof fecha);//undefined
var ronaldJSON={
    "nombre": "Ronald",
    "edad": 12,
    "sueldo": 12.2,
    "casado": false,
    "hijos": null,
    "mascotas":{
        "nombre":"Cachetes"
    }
};//object
var ronald = {
    'nombre': 'Ronald',
    edad:29,
    sueldo: 12.2,
    casado: false,
    hijos: null,
    deberes: undefined,
    mascota:{
        nombre: 'Cachetes'
    },
};//object
console.log(ronald.nombre);//'Ronald'

if (true){
    console.log("Si");
}else {
    console.log("No");
}
//truty
//falsy
if (null){
    console.log("Si");
}else{
    console.log("No");//falsy
}