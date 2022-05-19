//tomamos los parametros pasados
const parametros = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(parametros);
//Accedemos a el id
let id = urlParams.get("id");

//Nav Elementos
let nombreCompleto = document.getElementById("nombreCompleto");
let fotoPerfil=document.getElementById('foto');
//Cuerpo Elemento
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


//RELLENA EL OBJETO DATOS CUENTA 
function rellenarDatos(){
  for (const cuenta of cuentas) {
    if(cuenta.idCuenta==id){
      if (localStorage.getItem("cuenta_" + id)) datosCuenta = JSON.parse(localStorage.getItem("cuenta_" + id));
      else if (cuenta.idCuenta == id) datosCuenta = cuenta;
      //CUANDO ENCUENTRE LA CUENTA ROMPE EL FOR
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  rellenarDatos();
  nombreCompleto.textContent = datosCuenta.nombre;
  fotoPerfil.setAttribute("src",datosCuenta.foto);

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
    const btnVerMov=document.createElement('button');
    divSaldo.classList.add('bg-black','text-white','border-danger','p-4','text-center','mx-auto','col-xl-3','col-10','col-sm-6','col-md-5','col-lg-3','bg-opacity-75');
    divSaldo.textContent="Su saldo es de: $"+datosCuenta.saldo;
    divSaldo.style.fontSize=25+"px";
    btnOK.textContent="OK!";
    btnOK.classList.add('bg-success','text-white','text-center','border-success','rounded-3','mx-2');
    btnVerMov.textContent="Movimientos";
    btnVerMov.classList.add('bg-primary','text-white','text-center','border-primary','rounded-3','mx-2','my-3');
    divSaldo.appendChild(btnOK);
    divSaldo.appendChild(btnVerMov);
    boxInfoAcciones.appendChild(divSaldo);
    //Borra lo que esta en el div Info al presionar el boton
    btnOK.onclick=function(){
      if(btnOK.onclick){
           borrarElementosInfo();
      }
    }
    btnVerMov.onclick=function(){
      //SE MUESTRA LA TABLA DE LOS MOVIMIENTOS Y SE PASA COMO PARAMETRO EL BOTON VER
      verMovimientos(btnVerMov);
    }
}

//AGREGAR DATOS A LAS FILAS DE LA TABLA MOVIMIENTOS
function agregarFilasMov(tbody){
  if(localStorage.getItem('Movimientos_'+'c'+datosCuenta.idCuenta)){
    let movimientos=JSON.parse(localStorage.getItem('Movimientos_'+'c'+datosCuenta.idCuenta));
    movimientos.forEach(movimiento=> {
      let filaCuerpo = document.createElement('tr');
      filaCuerpo.style.backgroundColor="#212121";
      filaCuerpo.style.color="#fafafa";
      let elemFilaTipo = document.createElement('td');
      elemFilaTipo.innerHTML = movimiento.tipo;
      let elemFilaMonto = document.createElement('td');
      elemFilaMonto.innerHTML =movimiento.cantidad;
      let elemFilaFecha = document.createElement('td');
      elemFilaFecha.innerHTML =movimiento.fecha;
      let elemFilaHora = document.createElement('td');
      elemFilaHora.innerHTML =movimiento.hora;
      filaCuerpo.appendChild(elemFilaTipo);
      filaCuerpo.appendChild(elemFilaMonto);
      filaCuerpo.appendChild(elemFilaFecha);
      filaCuerpo.appendChild(elemFilaHora);
      tbody.appendChild(filaCuerpo);
    });
  }
  else{
    menAdvertencia("No Existen Movimientos");
  }
}

//VER MOVIMIENTOS
function verMovimientos(btnVerMov){
    const tblMovimientos=document.createElement('table');
    tblMovimientos.classList.add('bg-black','text-white','border-danger','p-4','text-center','mx-auto','col-xl-3','col-10','col-sm-6','col-md-5','col-lg-3','bg-opacity-75','mb-2');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    tblMovimientos.appendChild(thead);
    tblMovimientos.appendChild(tbody);
    let cabezera=document.createElement('tr');
    cabezera.style.backgroundColor="#fafafa";
    cabezera.style.color="#212121";
    let thTipo = document.createElement('th');
    thTipo.innerHTML = "Tipo";
    let thMonto = document.createElement('th');
    thMonto.innerHTML = "Monto";
    let thFecha = document.createElement('th');
    thFecha.innerHTML = "Fecha";
    let thHora = document.createElement('th');
    thHora.innerHTML = "Hora";
    cabezera.appendChild(thTipo);
    cabezera.appendChild(thMonto);
    cabezera.appendChild(thFecha);
    cabezera.appendChild(thHora);
    thead.appendChild(cabezera);
    boxInfoAcciones.appendChild(tblMovimientos);
    //RECOPILAMOS LOS MOVIMIENTOS HECHOS
    agregarFilasMov(tbody);
    //CAMBIA EL TEXTO DEL BOTON
    btnVerMov.textContent="Ocultar Movimientos";
    btnVerMov.classList.add('bg-danger','border-danger');
    //EVENTO DEL BOTON VER MOVIMIENTOS
    btnVerMov.onclick=function(){
      //BORRA LA TABLA Y CAMBIA EL TEXTO
         tblMovimientos.style.display='none';
         btnVerMov.textContent="Movimientos";
         btnVerMov.classList.remove('bg-danger','border-danger');
         //PARA QUE SE PUEDE VER DE NUEVO LOS MOVIMIENTOS
         btnVerMov.onclick=function(){
          verMovimientos(btnVerMov);
        }
    }
}

//No negativos
function noNegativos(input){
  input.onkeydown = function(e) {
    alert(e.keyCode);
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8 || e.keyCode==190 || e.keyCode==109)) {
        return false;
    }
}
}

//FUNCIONES PARA INGREGAR Y RETIRAR MONTO

//CREA UN DIV PARA INGRESAR EL MONTO A RETIRAR O INGRESAR
function crearDivAccion(tipo){
  const divIngreso=document.createElement('div');
  divIngreso.classList.add('bg-black','text-white','p-4','text-center','bg-opacity-75','mx-auto','col-xl-3','col-9','col-sm-6','col-md-5','col-lg-4');
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
  //EVENTO DEL BOTON INGRESAR(ACEPTAR)
  btnIngresar.onclick=function(){
    if(tipo==1) ingresar(Number(inputMonto.value));
    else if(tipo==2) retirar(Number(inputMonto.value));
  }
  //EVENTO DEL BOTON CANCELAR
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
  divMenAdvertencia.classList.add('bg-danger','text-white','border-danger','p-2','text-center','col-xl-3','col-9','col-sm-6','col-md-5','col-lg-4','mx-auto');
  divMenAdvertencia.textContent=mensaje;
  boxInfoAcciones.appendChild(divMenAdvertencia);
  setTimeout(() => {
    divMenAdvertencia.style.display="none";
  }, 3000);
}

//REGISTRA EL MOVIMIENTO
function registMov(tipoMov,cantidadMov){
  let Fecha = new Date();
  let movimientoHechos=[];
  //COMPRUEBA SI HAY MOVIMIENTOS PARA QUE SE LE ASIGNEN A EL ARRAY CREADO
  if(localStorage.getItem('Movimientos_'+'c'+datosCuenta.idCuenta)){
    movimientoHechos=JSON.parse(localStorage.getItem('Movimientos_'+'c'+datosCuenta.idCuenta));
  }
  let nuevoMov={tipo:tipoMov,cantidad:"$"+cantidadMov,fecha:Fecha.toLocaleDateString(), hora: Fecha.toLocaleTimeString()};
  movimientoHechos.push(nuevoMov);
  localStorage.setItem('Movimientos_'+'c'+datosCuenta.idCuenta,JSON.stringify(movimientoHechos));
}

//FUNCION PARA HACER EL PROCESO DE INGRESO A EL SALDO
function ingresar(ingreso) {
  if(!ingreso>0){
    menAdvertencia("No se pueden hacer depositos menores o iguales a $0");
  }else{
    let saldoNuevo=datosCuenta.saldo+ingreso;
    if (saldoNuevo > 990) {
      menAdvertencia("No se puede tener mas de $990 en esta cuenta!");
    }else{
      cambioSaldo(datosCuenta.idCuenta,saldoNuevo);
      borrarElementosInfo();
      mostrarNSaldo(ingreso,saldoNuevo,1);
      registMov('Ingreso',ingreso);
    }
  }
}

//FUNCION PARA RETIRAR DINERO
function retirar(retiro){
  if(!retiro>0){
    menAdvertencia("No se pueden hacer retiros menores o iguales a $0");
  }else{
    let saldoNuevo=datosCuenta.saldo-retiro;
    if(saldoNuevo<10){
      menAdvertencia("No se puede tener menos de $10 en esta cuenta!");
    }
    else{
      cambioSaldo(datosCuenta.idCuenta,saldoNuevo);
      borrarElementosInfo();
      mostrarNSaldo(retiro,saldoNuevo,2);
      registMov('Retiro',retiro);
    }
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
    //EVENTO
    btnOK.onclick=function(){
      borrarElementosInfo();
    } 
}

