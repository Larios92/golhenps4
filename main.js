// VIDEO JUEGOS TEL - Lógica de conexión
function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = msg;
        statusDiv.style.color = isError ? "#ff4444" : "#00d2ff";
    }
}

async function loadPayload() {
    updateStatus("Iniciando motor PSFree...");
    
    // Intentamos llamar a la función que está dentro del bundle.js
    try {
        if (typeof runPSFree === "function") {
            await runPSFree(); 
            // El bundle.js se encarga de explotar y buscar el 900.bin
        } else {
            updateStatus("Error: El motor bundle.js no está listo.", true);
        }
    } catch (e) {
        updateStatus("Fallo en ejecución: " + e.message, true);
    }
}
