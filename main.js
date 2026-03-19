// CONFIGURACIÓN DE VIDEO JUEGOS TEL
const PAYLOAD_NAME = "GoldHEN v2.4b16";

// 1. Funciones de Interfaz
function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    statusDiv.innerHTML = msg;
    if (isError) statusDiv.style.color = "#ff4444";
    console.log("[VJ-TEL] " + msg);
}

// 2. Lógica del Botón Principal
function loadPayload() {
    updateStatus("Iniciando PSFree para " + PAYLOAD_NAME + "...");
    
    const btn = document.querySelector('.neon-button');
    btn.style.opacity = "0.5";
    btn.disabled = true;

    setTimeout(() => {
        try {
            updateStatus("Buscando vulnerabilidad...");
            if (typeof runPSFree === "function") {
                runPSFree(); // Esto inicia el exploit
                
                // --- AGREGA ESTO AQUÍ ---
                setTimeout(() => {
                    injectGoldhen(); // Esto inicia la inyección del .bin
                }, 5000); // Esperamos 5 segundos a que el exploit prepare la memoria
                // -------------------------
                
            } else {
                updateStatus("Error: psfree.js no cargado.", true);
            }
        } catch (e) {
            updateStatus("Error: " + e.message, true);
        }
    }, 1500);
}


// 3. Control de Cache Offline (AppCache)
if (window.applicationCache) {
    window.applicationCache.oncached = function() {
        updateStatus("✅ Host guardado en la PS4. Ya puedes desconectar el Internet.");
    };
    window.applicationCache.onupdateready = function() {
        updateStatus("Actualización encontrada. Aplicando cambios...");
        window.location.reload();
    };
    window.applicationCache.onerror = function() {
        console.log("Aviso: El cache ya está listo o hubo un salto de red.");
    };
}

// 4. Inyección del Payload Real para Video Juegos TEL
function injectGoldhen() {
    updateStatus("Inyectando GoldHEN v2.4... Mira la esquina superior.");
    
    var xhr = new XMLHttpRequest();
    // RECUERDA: En GitHub el archivo debe llamarse exactamente goldhen.bin
    xhr.open('GET', 'goldhen.bin', true); 
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function(e) {
        if (this.status == 200) {
            // Intentamos con las 3 funciones más comunes de los motores PSFree
            if (typeof p_load === "function") {
                p_load(this.response);
            } else if (window.postPayload) {
                window.postPayload(this.response);
            } else if (typeof PL_load === "function") {
                PL_load(this.response);
            }
            updateStatus("✅ ¡Enviado! Espera la notificación en la PS4.");
        } else {
            updateStatus("Error: No se encontró goldhen.bin en el servidor.", true);
        }
    };
    xhr.send();
}
