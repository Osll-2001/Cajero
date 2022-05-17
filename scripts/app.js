//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id
let id = urlParams.get('id');
let datosCuenta={
    idCuenta:'',
    nombre:'',
    usuario:'',
    password:'',
    saldo:0
};

document.addEventListener('DOMContentLoaded',()=>{
    cuentas.forEach(cuenta => {
        if(cuenta.idCuenta==id){
            datosCuenta=cuenta;
        }
    });
    console.log(datosCuenta);
});



