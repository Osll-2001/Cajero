//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id
let id = urlParams.get('id');

//NaV
let nombreCompleto=document.getElementById('nombreCompleto');

let datosCuenta={
    idCuenta:'',
    nombre:'',
    usuario:'',
    password:'',
    saldo:0
};

document.addEventListener('DOMContentLoaded',()=>{
    cuentas.forEach(cuenta => {
        if(localStorage.getItem("cuenta_"+id)) datosCuenta=JSON.parse(localStorage.getItem('cuenta_'+id));
        else if(cuenta.idCuenta==id)datosCuenta=cuenta;

        nombreCompleto.textContent=datosCuenta.nombre;
    });
});


function consultaSaldo(){
    alert("Su saldo es de: "+datosCuenta.saldo);
}

function ingresar(){
    let salgoIngresado=Number(prompt("Ingreso:"));
    let nuevoSaldo=Number(datosCuenta.saldo+salgoIngresado);
    if(nuevoSaldo>990){
        alert("No puede tener mas de 990 pesos");
    }else{
    cuentas.forEach(cuenta => {
        if(cuenta.idCuenta==datosCuenta.idCuenta)
        {   
            cuenta.saldo=datosCuenta.saldo;
            localStorage.setItem("cuenta_"+cuenta.idCuenta,JSON.stringify(cuenta));
        }
    });
}
}