// CONFIGURACIÓN DE VIDEO JUEGOS TEL
const PAYLOAD_NAME = "GoldHEN v2.4b16";

// 1. Funciones de Interfaz
function updateStatus(msg, isError = false) {
    const statusDiv = document.getElementById("status");
    statusDiv.innerHTML = msg;
    if (isError) statusDiv.style.color = "#ff4444";
    console.log("[VJ-TEL] " + msg);
}

// 2. Lógica del Botón Principal - VIDEO JUEGOS TEL
function loadPayload() {
    updateStatus("Iniciando PSFree para " + PAYLOAD_NAME + "...");
    
    // Desactivar botón para evitar errores por doble clic
    const btn = document.querySelector('.neon-button');
    if (btn) {
        btn.style.opacity = "0.5";
        btn.disabled = true;
    }

    // Ejecutar la cadena del exploit con tiempo de espera
    setTimeout(() => {
        try {
            updateStatus("Buscando vulnerabilidad en el navegador...");
            
            if (typeof runPSFree === "function") {
                // 1. Lanzamos el motor del exploit
                runPSFree(); 
                
                // 2. Esperamos 4 segundos a que la memoria esté lista
                updateStatus("Exploit listo. Preparando inyección...");
                setTimeout(() => {
                    injectGoldhen(); // Llamamos a la función de la Sección 4
                }, 4000);

            } else {
                updateStatus("Error: No se encontró el motor psfree.js", true);
                if (btn) btn.disabled = false;
            }
        } catch (e) {
            updateStatus("Error en el proceso: " + e.message, true);
            if (btn) btn.disabled = false;
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
