let inputUsuario=document.getElementById('inputUsuario');
let inputPass=document.getElementById('inputPass');
let formularioLogin=document.getElementById('formLogin');
 
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

function peticionLogin(usuario,pass){
    cuentas.forEach(cuenta => {
        if(cuenta.usuario==usuario){
            if(cuenta.password==pass) window.location.href = "../ventanas/inicio.html?id="+cuenta.idCuenta;
        }
    });
}



