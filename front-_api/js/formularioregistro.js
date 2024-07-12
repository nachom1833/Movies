document.getElementById("formularioregistro").addEventListener('submit', validar);

function validar(evento) {
    evento.preventDefault();
    if (document.getElementById("nombre").value.length == 0) {
        document.getElementById("errornombre").innerText = "El campo no puede estar vacio";
        var nom = false;
    } else if (document.getElementById("nombre").value.length <= 3 || document.getElementById("nombre").value.length >= 10) {
        document.getElementById("errornombre").innerText = "El campo debe contener entre 3 y 10 caracteres";
        nom = false;
    } else {
        document.getElementById("errornombre").innerText = "";
        nom = true;
    }
    if (document.getElementById("apellido").value.length == 0) {
        document.getElementById("errorapellido").innerText = "El campo no puede estar vacio";
        var ape = false;
    } else if (document.getElementById("apellido").value.length <= 3 || document.getElementById("apellido").value.length >= 10) {
        document.getElementById("errorapellido").innerText = "El campo debe contener entre 3 y 10 caracteres";
        ape = false;
    } else {
        document.getElementById("errorapellido").innerText = "";
        ape = true;
    }

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
    if (document.getElementById("date").value.length == 0) {
        document.getElementById("errorfecha").innerText = "Debe elegir una fecha";
        var dat = false
    } else {
        document.getElementById("errorfecha").innerText = "";
        dat = true
    }
    if (document.getElementById("pais").value == "") {
        document.getElementById("errorpais").innerText = "Debe elegir un pais";
        var pai = false;
    } else {
        document.getElementById("errorpais").innerText = "";
        pai = true
    }
    if (!document.getElementById("checkbox").checked) {
        document.getElementById("errorcheck").innerText = "Debe aceptar los terminos y condiciones";
        var che = false;
    } else {
        document.getElementById("errorcheck").innerText = "";
        che = true
    }
    if (nom == true && ape == true && ima == true && con == true && dat == true && pai == true && che == true) {
        evento.submit();
    }
    }
