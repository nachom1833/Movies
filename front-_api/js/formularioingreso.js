document.getElementById("formularioingreso").addEventListener('submit', validar);

function validar(evento) {
    evento.preventDefault();
    const EXPREG = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (document.getElementById("email").value.length == 0) {
        document.getElementById("erroremail").innerText = "El campo no puede estar vacio";
        var ima = false 
    } else if (!EXPREG.test (document.getElementById("email").value)) {
        document.getElementById("erroremail").innerText = "El campo requiere un mail valido";
        ima = false;
    } else {
        document.getElementById("erroremail").innerText = "";
    }
    if (document.getElementById("contrasena").value.length == 0) {
        document.getElementById("errorcontrasena").innerText = "El campo no puede estar vacio";
        var con = false;
    } else if (document.getElementById("contrasena").value.length <= 3 || document.getElementById("contrasena").value.length >= 10) {
        document.getElementById("errorcontrasena").innerText = "El campo debe contener entre 3 y 10 caracteres";
        con = false;
    } else {
        document.getElementById("errorcontrasena").innerText = "";
        con = true;
    }
}