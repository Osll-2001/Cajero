//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id
let id = urlParams.get("id");

//NaV
let nombreCompleto = document.getElementById("nombreCompleto");
let fotoPerfil=document.getElementById('foto');
//Cuerpo
let boxInfoAcciones=document.getElementById('info_acciones');

//Objeto para almacenar valores de mi cuenta
let datosCuenta = {
  idCuenta: "",
  nombre: "",
  usuario: "",
  password: "",
  saldo: 0,
  foto:''
};

document.addEventListener("DOMContentLoaded", () => {
  cuentas.forEach((cuenta) => {
    if (localStorage.getItem("cuenta_" + id))
      datosCuenta = JSON.parse(localStorage.getItem("cuenta_" + id));
    else if (cuenta.idCuenta == id) datosCuenta = cuenta;

    nombreCompleto.textContent = datosCuenta.nombre;
    fotoPerfil.setAttribute("src",datosCuenta.foto);
  });
});

//BORRAR TODO DE DIV INFO
function borrarElementosInfo(){
  while(boxInfoAcciones.firstChild){
    boxInfoAcciones.firstChild.remove();
  }
}

//Funciones para consultar saldo
function consultaSaldo(){
    const divSaldo=document.createElement('div');
    var btnOK=document.createElement('button');
    divSaldo.classList.add('bg-black','text-white','border-danger','p-4','text-center','mx-auto','col-xl-3','col-10','col-sm-6','col-md-5','col-lg-3','bg-opacity-75');
    divSaldo.textContent="Su saldo es de: $"+datosCuenta.saldo;
    divSaldo.style.fontSize=25+"px";
    btnOK.textContent="OK!";
    btnOK.classList.add('bg-success','text-white','text-center','border-success','rounded-3','mx-2');
    divSaldo.appendChild(btnOK);
    boxInfoAcciones.appendChild(divSaldo);
    //Cierra el Div Al presionar el boton
    btnOK.onclick=function(){
        if(btnOK.onclick){
           borrarElementosInfo();
        }
    }
}

//No negativos
function noNegativos(input){
  input.onkeydown = function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 || e.keyCode==190)) {
        return false;
    }
}
}

//FUNCIONES PARA INGREGAR Y RETIRAR MONTO

//CREA UN DIV PARA INGRESAR EL MONTO A RETIRAR O INGRESAR
function crearDivAccion(tipo){
  const divIngreso=document.createElement('div');
  divIngreso.classList.add('bg-black','text-white','p-4','text-center','bg-opacity-75','mx-auto','col-xl-3','col-6','col-sm-6','col-md-5','col-lg-4');
  //CAMBIA EL TEXTO DEPENDIENDO DE EL TIPO DE ACCION
  if(tipo==1)divIngreso.textContent="Monto a ingresar:";
  else divIngreso.textContent="Monto a retirar: ";
  divIngreso.style.fontSize=25+"px";
  var inputMonto=document.createElement('input');
  inputMonto.classList.add('mx-2','rounded-3');
  inputMonto.style.width=100+"px";
  inputMonto.type='Number';
  inputMonto.placeholder='0.00';
  inputMonto.min=0;
  //No permite que existan montos negativos
  noNegativos(inputMonto);
  var btnIngresar=document.createElement('button');
  btnIngresar.classList.add('bg-success','text-white','text-center','border-success','rounded-3','my-3','bi','bi-check-lg');
  var btnCancelar=document.createElement('button');
  btnCancelar.classList.add('bg-danger','text-white','text-center','border-danger','rounded-3','my-3','ms-2','bi', 'bi-x');
  divIngreso.appendChild(inputMonto);
  divIngreso.appendChild(btnIngresar);
  divIngreso.appendChild(btnCancelar);
  boxInfoAcciones.appendChild(divIngreso);
  btnIngresar.onclick=function(){
      if(tipo==1) ingresar(Number(inputMonto.value));
      else if(tipo==2) retirar(Number(inputMonto.value));
  }
  btnCancelar.onclick=function(){
    borrarElementosInfo();
}
}

//MODIFICA EL SALDO
function cambioSaldo(idCuenta,saldoNuevo){
  cuentas.forEach((cuenta) => {
    if (cuenta.idCuenta == idCuenta) {
        cuenta.saldo = saldoNuevo;
        datosCuenta.saldo=saldoNuevo;
        localStorage.setItem(
        "cuenta_" + cuenta.idCuenta,
        JSON.stringify(cuenta)
      );
    }
  });
}

//MENSAJE DE ADVERTENCIA
function menAdvertencia(mensaje){
  const divMenAdvertencia=document.createElement('div');
  divMenAdvertencia.classList.add('bg-danger','text-white','border-danger','p-2','text-center','col-xl-3','col-6','col-sm-6','col-md-5','col-lg-4','mx-auto');
  divMenAdvertencia.textContent=mensaje;
  boxInfoAcciones.appendChild(divMenAdvertencia);
  setTimeout(() => {
    divMenAdvertencia.style.display="none";
  }, 3000);
}

//FUNCION PARA HACER EL PROCESO DE INGRESO A EL SALDO
function ingresar(ingreso) {
  let saldoNuevo=datosCuenta.saldo+ingreso;
  if (saldoNuevo > 990) {
    menAdvertencia("No se puede tener mas de $990 en esta cuenta!");
  } else {
      cambioSaldo(datosCuenta.idCuenta,saldoNuevo);
      borrarElementosInfo();
      mostrarNSaldo(ingreso,saldoNuevo,1);
  }
}

//FUNCION PARA RETIRAR DINERO
function retirar(retiro){
  let saldoNuevo=datosCuenta.saldo-retiro;
  if(saldoNuevo<10){
    menAdvertencia("No se puede tener menos de $10 en esta cuenta!");
  }
  else{
      cambioSaldo(datosCuenta.idCuenta,saldoNuevo);
      borrarElementosInfo();
      mostrarNSaldo(retiro,saldoNuevo,2);
  }
}

//MUESTRA EL MONTO INGRESADO O RETIRADO Y EL SALDO ACTUAL
function mostrarNSaldo(cantidad,nSaldo,tipo){
    const divNSaldo=document.createElement('div');
    const pMenMonto=document.createElement('p');
    const pMonto=document.createElement('span');
    const pNSaldo=document.createElement('p');
    const btnOK=document.createElement('button');
    divNSaldo.classList.add('bg-black','text-white','border-danger','p-4','text-center','mx-auto','col-xl-3','col-10','col-sm-6','col-md-5','col-lg-4','bg-opacity-75');
    //DEPENDIENDO DE EL TIPO CAMBIA EL TEXTO
    if(tipo==1){
      pMenMonto.textContent="El Monto Ingresado Fue De: ";
      pMonto.textContent="$"+cantidad;
      pMonto.classList.add('text-success');
    }
    else if(tipo==2){
      pMenMonto.textContent="El Monto Retirado Fue De: ";
      pMonto.textContent="$"+cantidad;
      pMonto.classList.add('text-danger');
    }
    pMenMonto.style.fontSize=20+"px";
    pMonto.style.fontSize=25+"px";
    pNSaldo.style.fontSize=20+"px";
    pNSaldo.textContent="El nuevo Saldo Es De: $"+nSaldo;
    btnOK.textContent="OK!";
    btnOK.classList.add('bg-success','text-white','text-center','border-success','rounded-3','mx-2');
    divNSaldo.appendChild(pMenMonto);
    divNSaldo.appendChild(pMonto);
    divNSaldo.appendChild(pNSaldo);
    divNSaldo.appendChild(btnOK);
    boxInfoAcciones.appendChild(divNSaldo);
    btnOK.onclick=function(){
      if(btnOK.onclick){
         borrarElementosInfo();
      }
  }
}

