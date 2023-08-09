document.addEventListener("DOMContentLoaded", function() {
    const nombre_usuario = localStorage.getItem("nombre_usuario");

    if (nombre_usuario) {
        document.getElementById("nombreUsuario").textContent = "Bienvenido, " + nombre_usuario;
    } else {
        window.location.href = "login.html";
    }
});
