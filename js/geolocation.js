function enviarDatosGPS() {
    // Verificar si los datos de usuario y token están en el almacenamiento local
    var usuario = localStorage.getItem("nombre_usuario");
    var token = localStorage.getItem("token");

    if (!usuario || !token) {
        console.log("Error: No se encontraron datos de usuario o token en el almacenamiento local.");
        return;
    }

    // Obtener la ubicación del usuario utilizando la API de geolocalización
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var gps_data = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            // Crear una fecha y hora actual
            var fecha_hora = new Date().toISOString();

            // Crear objeto FormData para enviar los datos
            var formData = new FormData();
            formData.append("usuario", usuario);
            formData.append("token", token);
            formData.append("gps", JSON.stringify(gps_data));
            formData.append("fecha_hora", fecha_hora);

            // Enviar los datos a través de una solicitud POST
            fetch("http://aplicaciongps.lovestoblog.com/server/host/post.php", {
                method: "POST",
                body: formData
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(result) {
                console.log(result);
            })
            .catch(function(error) {
                console.log("Error al enviar los datos:", error);
            });
        }, function(error) {
            console.log("Error en la geolocalización:", error);
        });
    } else {
        console.log("Geolocalización no disponible en este navegador.");
    }
}

// Enviar datos inmediatamente al cargar la página
enviarDatosGPS();

// Repetir la acción cada 5 minutos
setInterval(function() {
    enviarDatosGPS();
}, 5 * 60 * 1000); // 5 minutos en milisegundos

// Enviar datos cada vez que la página se actualiza
window.addEventListener("beforeunload", function() {
    enviarDatosGPS();
});
