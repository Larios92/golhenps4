// CONFIGURACIÓN DE VIDEO JUEGOS TEL
const PAYLOAD_NAME = "GoldHEN v2.4b16";

// 1. Funciones de Interfaz
function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = msg;
        if (isError) statusDiv.style.color = "#ff4444";
        else statusDiv.style.color = "#00d2ff"; // Color cian neón
    }
    console.log("[VJ-TEL] " + msg);
}

// 2. Lógica del Botón Principal
function loadPayload() {
    updateStatus("Iniciando PSFree para " + PAYLOAD_NAME + "...");
    
    const btn = document.querySelector('.neon-button');
    if (btn) {
        btn.style.opacity = "0.5";
        btn.disabled = true;
    }

    setTimeout(() => {
        try {
            updateStatus("Buscando vulnerabilidad en el navegador...");
            
            if (typeof runPSFree === "function") {
                runPSFree(); // Lanza el motor del exploit
                
                updateStatus("Exploit listo. Preparando inyección...");
                
                // Esperamos 4 segundos para que la memoria se estabilice
                setTimeout(() => {
                    injectGoldhen(); 
                }, 4000);

            } else {
                updateStatus("Error: psfree.js no cargado.", true);
                if (btn) btn.disabled = false;
            }
        } catch (e) {
            updateStatus("Error en el proceso: " + e.message, true);
            if (btn) btn.disabled = false;
        }
    }, 1500);
}

// 4. Inyección del Payload Real
function injectGoldhen() {
    updateStatus("Inyectando GoldHEN v2.4... Mira la esquina superior.");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'goldhen.bin', true); // Nombre exacto de tu archivo
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function(e) {
        if (this.status == 200) {
            // Intentamos las funciones de inyección más comunes
            if (typeof p_load === "function") {
                p_load(this.response);
            } else if (window.postPayload) {
                window.postPayload(this.response);
            } else if (typeof PL_load === "function") {
                PL_load(this.response);
            }
            updateStatus("✅ ¡Enviado! Espera la notificación en la PS4.");
        } else {
            updateStatus("Error: No se encontró goldhen.bin (404)", true);
        }
    };
    
    xhr.onerror = function() {
        updateStatus("Error de red al cargar el binario.", true);
    };
    
    xhr.send();
}

// 3. Control de Cache Offline (AppCache)
if (window.applicationCache) {
    window.applicationCache.oncached = function() {
        updateStatus("✅ Host guardado. Ya puedes usarlo sin Internet.");
    };
    window.applicationCache.onupdateready = function() {
        updateStatus("Actualización encontrada. Aplicando...");
        window.location.reload();
    };
}
