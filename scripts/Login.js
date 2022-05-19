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

    const usuarioEncontrado = cuentas.filter(cuenta => cuenta.usuario == usuario).filter(cuenta=>cuenta.password==pass);
    
    if(usuarioEncontrado.length) window.location.href = "./ventanas/inicio.html?id="+usuarioEncontrado[0].idCuenta;
    else menDIncorrectos("El Usuario o la contraseña estan incorrectas");
}



