// ==========================================
// VIDEO JUEGOS TEL - CONTROLADOR DEFINITIVO
// ==========================================

// 1. CREACIÓN DEL "MEGÁFONO" (Log Global)
// Esto debe ejecutarse de inmediato para que el bundle.js lo encuentre
(function() {
    window.log = function(message, color) {
        const statusDiv = document.getElementById("status");
        if (statusDiv) {
            // Aplicamos color (rojo para error, verde para éxito, azul para info)
            if (color === "red") statusDiv.style.color = "#ff4444";
            else if (color === "green") statusDiv.style.color = "#00ff00";
            else statusDiv.style.color = "#00d2ff";

            // Limpiamos el texto y lo mostramos
            statusDiv.innerHTML = message.replace(/\n/g, "<br>");
        }
        console.log("PS4 Status: " + message);
    };
})();

// 2. FUNCIÓN DE ACTIVACIÓN PARA EL BOTÓN
async function loadPayload() {
    // Verificamos si el motor cargó correctamente
    if (typeof window.doJBwithPSFreeLapseExploit !== "function") {
        window.log("Error: El motor bundle.js aún no carga. \nEspera un momento o recarga la página.", "red");
        return;
    }

    try {
        window.log("Iniciando Exploit... \nNo toques el control.", "#00d2ff");
        
        // Llamada al motor PSFree + Lapse que está en tu bundle.js
        await window.doJBwithPSFreeLapseExploit();
        
    } catch (e) {
        window.log("Fallo en el proceso: \n" + e.message, "red");
    }
}
