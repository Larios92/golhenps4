// CONFIGURACIÓN VIDEO JUEGOS TEL - GRANADA
const PAYLOAD_NAME = "GoldHEN v2.4b16";

function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = msg;
        statusDiv.style.color = isError ? "#ff4444" : "#00d2ff";
    }
}

// 1. Iniciar el Proceso
function loadPayload() {
    updateStatus("Iniciando PSFree... No toques nada.");
    const btn = document.querySelector('.neon-button');
    if (btn) { btn.disabled = true; btn.style.opacity = "0.5"; }

    setTimeout(() => {
        if (typeof runPSFree === "function") {
            runPSFree(); // Lanza el exploit base
            updateStatus("Exploit OK. Preparando memoria (7s)...");
            
            // DAMOS 7 SEGUNDOS PARA QUE LA PS4 ESTÉ LISTA
            setTimeout(injectGoldhen, 7000);
        } else {
            updateStatus("Error: El motor psfree.js no cargó.", true);
        }
    }, 1000);
}

// 2. Función de Inyección Multi-Compatible
function injectGoldhen() {
    updateStatus("Enviando goldhen.bin... Revisa tu TV.");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'goldhen.bin?v=' + Date.now(), true);
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function() {
        if (this.status == 200) {
            const data = this.response;
            try {
                // INTENTO 1: Función estándar de PSFree
                if (window.postPayload) {
                    window.postPayload(data);
                } 
                // INTENTO 2: Función alternativa
                else if (typeof p_load === "function") {
                    p_load(data);
                } 
                // INTENTO 3: Función de versiones antiguas
                else if (typeof PL_load === "function") {
                    PL_load(data);
                }
                // INTENTO 4: Si nada funciona, forzamos la carga
                else {
                    updateStatus("Intentando carga forzada...", true);
                    if(typeof window.loadPayload === "function") window.loadPayload(data);
                }
                
                updateStatus("🚀 ¡Sistema Activado por Video Juegos TEL!");
            } catch (e) {
                updateStatus("Fallo en la inyección: " + e.message, true);
            }
        } else {
            updateStatus("Error: No se encontró el archivo .bin (404)", true);
        }
    };
    xhr.send();
}

// 3. Cache Offline
if (window.applicationCache) {
    window.applicationCache.oncached = () => updateStatus("✅ Host Guardado (Modo Offline Listo)");
    window.applicationCache.onupdateready = () => window.location.reload();
}
