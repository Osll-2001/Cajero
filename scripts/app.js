//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id
let id = urlParams.get("id");

//NaV
let nombreCompleto = document.getElementById("nombreCompleto");
//Cuerpo
let boxInfoAcciones=document.getElementById('info_acciones');

//Objeto para almacenar valores de mi cuenta
let datosCuenta = {
  idCuenta: "",
  nombre: "",
  usuario: "",
  password: "",
  saldo: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  cuentas.forEach((cuenta) => {
    if (localStorage.getItem("cuenta_" + id))
      datosCuenta = JSON.parse(localStorage.getItem("cuenta_" + id));
    else if (cuenta.idCuenta == id) datosCuenta = cuenta;

    nombreCompleto.textContent = datosCuenta.nombre;
  });
});

//Funciones para consultar saldo
function consultaSaldo(){
    const divSaldo=document.createElement('div');
    var btnOK=document.createElement('button');
    divSaldo.classList.add('bg-black','text-white','border-danger','p-4','text-center','w-100','bg-opacity-75');
    divSaldo.textContent="Su saldo es de: "+datosCuenta.saldo;
    divSaldo.style.fontSize=25+"px";
    btnOK.textContent="OK";
    btnOK.classList.add('bg-success','text-white','text-center','border-success','rounded-3','mx-2');
    divSaldo.appendChild(btnOK);
    boxInfoAcciones.appendChild(divSaldo);
    //Cierra el Div Al presionar el boton
    btnOK.onclick=function(){
        if(btnOK.onclick){
            while(boxInfoAcciones.firstChild){
                boxInfoAcciones.firstChild.remove();
            }
        }
    }
}

function ingresar() {
  let salgoIngresado = Number(prompt("Ingreso:"));
  let nuevoSaldo = Number(datosCuenta.saldo + salgoIngresado);
  if (nuevoSaldo > 990) {
    alert("No puede tener mas de 990 pesos");
  } else {
    cuentas.forEach((cuenta) => {
      if (cuenta.idCuenta == datosCuenta.idCuenta) {
        cuenta.saldo = datosCuenta.saldo;
        localStorage.setItem(
          "cuenta_" + cuenta.idCuenta,
          JSON.stringify(cuenta)
        );
      }
    });
  }
}
