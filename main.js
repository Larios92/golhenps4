// VIDEO JUEGOS TEL - CONTROLADOR 9.00
function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = msg;
        statusDiv.style.color = isError ? "#ff4444" : "#00d2ff";
    }
}

async function loadPayload() {
    // 1. Verificamos si el motor cargó
    if (typeof window.doJBwithPSFreeLapseExploit !== "function") {
        updateStatus("Error: bundle.js no detectado. Recarga la página.", true);
        return;
    }

    try {
        updateStatus("Explotando Webkit... (Paso 1/3)");
        
        // 2. Ejecutamos el Jailbreak
        // Este comando buscará automáticamente 900.bin y luego payload.bin
        await window.doJBwithPSFreeLapseExploit();
        
        // Nota: Los mensajes de éxito aparecerán automáticamente 
        // según el código interno del bundle.js
    } catch (e) {
        updateStatus("Error en el proceso: " + e.message, true);
    }
}
