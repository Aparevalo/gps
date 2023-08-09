document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombre_usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    const data = {
        usuario: nombreUsuario,
        contrasena: contrasena
    };

    fetch('http://aplicaciongps.lovestoblog.com/server/host/generarToken.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.text())
    .then(result => {
        if (result.trim() !== "null") {
            // Guardar el token y el nombre de usuario en localStorage
            localStorage.setItem("nombre_usuario", nombreUsuario);
            localStorage.setItem("token", result);
            // Redirigir a la página segura
            window.location.href = "secure_page.html";
        } else {
            console.error('Credenciales inválidas');
            alert('Credenciales inválidas');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud');
    });
});
