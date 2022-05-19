let inputUsuario=document.getElementById('inputUsuario');
let inputPass=document.getElementById('inputPass');
let formularioLogin=document.getElementById('formLogin');
let boxLogin=document.getElementById('boxLogin');
 
let datosLogin={
    usuario:'',
    pass:''
}

formularioLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    datosLogin.usuario=inputUsuario.value;
    datosLogin.pass=inputPass.value;
    peticionLogin(datosLogin.usuario,datosLogin.pass);
    formularioLogin.reset();
});

function menDIncorrectos(mensaje){
    const divMenAdvertencia=document.createElement('div');
    divMenAdvertencia.classList.add('bg-danger','text-white','border-danger','p-2','text-center','col-xl-9','col-9','col-sm-9','col-md-9','col-lg-9','mx-auto');
    divMenAdvertencia.textContent=mensaje;
    boxLogin.appendChild(divMenAdvertencia);
    setTimeout(() => {
        divMenAdvertencia.style.display="none";
    }, 3000);
  }

function peticionLogin(usuario,pass){
    for (const cuenta of cuentas) {
        if(cuenta.usuario==usuario){
            if(cuenta.password==pass) window.location.href = "./ventanas/inicio.html?id="+cuenta.idCuenta;
            else menDIncorrectos("La contraseña esta incorrecta!");
            break;
        }
        else{
            menDIncorrectos("EL Usuario No Existe!");
            break;
        }
    }
}



