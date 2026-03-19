// CONFIGURACIÓN VIDEO JUEGOS TEL - GRANADA
// 1. Creamos la función que el bundle.js busca para imprimir mensajes
window.log = function(message, color) {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        // Si el mensaje viene con color, lo aplicamos, si no, usamos azul neón
        statusDiv.style.color = color || "#00d2ff";
        statusDiv.innerHTML = message.replace(/\n/g, "<br>"); // Cambia saltos de línea por HTML
    }
    console.log("PS4 Log: " + message);
};

// 2. Mantenemos tu función de actualización manual por si acaso
function updateStatus(msg, isError = false) {
    window.log(msg, isError ? "#ff4444" : "#00d2ff");
}

// 3. Función principal del botón
async function loadPayload() {
    if (typeof window.doJBwithPSFreeLapseExploit !== "function") {
        updateStatus("Error: El motor bundle.js no ha cargado.", true);
        return;
    }

    try {
        // Limpiamos pantalla e iniciamos
        updateStatus("Iniciando proceso... Por favor espera.");
        
        // Llamamos al exploit. Ahora, cuando el exploit use window.log, 
        // aparecerá en tu pantalla sin dar error.
        await window.doJBwithPSFreeLapseExploit();
        
    } catch (e) {
        // Si el error persiste, lo capturamos aquí
        updateStatus("Error crítico: " + e.message, true);
    }
}
