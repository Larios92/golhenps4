// CONFIGURACIÓN VIDEO JUEGOS TEL - GRANADA
function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = msg;
        statusDiv.style.color = isError ? "#ff4444" : "#00d2ff";
    }
}

// Esta es la función que activa el botón
async function loadPayload() {
    updateStatus("Iniciando Exploit (PSFree + Lapse)...");
    
    try {
        // Verificamos si la función del bundle existe
        if (typeof window.doJBwithPSFreeLapseExploit === "function") {
            
            // TRUCO TÉCNICO: El bundle busca "payload.bin"
            // Pero como tú tienes "goldhen.bin", vamos a avisarle al sistema.
            // Si puedes, renombra tu goldhen.bin a payload.bin en GitHub.
            
            updateStatus("Ejecutando Jailbreak... No toques nada.");
            await window.doJBwithPSFreeLapseExploit();
            
        } else {
            updateStatus("Error: El motor bundle.js no cargó correctamente.", true);
        }
    } catch (e) {
        updateStatus("Error crítico: " + e.message, true);
    }
}
