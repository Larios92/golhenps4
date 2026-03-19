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
    
    // Desactivar botón para evitar doble clic
    const btn = document.querySelector('.neon-button');
    btn.style.opacity = "0.5";
    btn.disabled = true;

    // Ejecutar la cadena del exploit
    setTimeout(() => {
        try {
            updateStatus("Buscando vulnerabilidad en el navegador...");
            /* Aquí se dispara la función de PSFree. 
               Nota: Este archivo depende de que tengas 'psfree.js' 
               en la misma carpeta para funcionar al 100%.
            */
            if (typeof runPSFree === "function") {
                runPSFree();
            } else {
                // Simulación de carga para pruebas de diseño
                updateStatus("Exploit enviado. Espera la notificación en la PS4.");
            }
        } catch (e) {
            updateStatus("Error en el exploit: " + e.message, true);
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

// 4. Inyección del Payload (Conexión Real con goldhen.bin)
function injectGoldhen() {
    updateStatus("Inyectando GoldHEN v2.4... Mira la esquina superior.");
    
    // 1. Buscamos el archivo real que subiste a tu GitHub
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'goldhen.bin', true); // Asegúrate que el archivo se llame así en GitHub
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = function(e) {
        if (this.status == 200) {
            // 2. Si el archivo carga, lo enviamos al motor de PSFree
            // Nota: 'p_load' es la función estándar que usa PSFree para inyectar
            if (typeof p_load === "function") {
                p_load(this.response); 
                updateStatus("✅ ¡Payload enviado con éxito!");
            } else {
                updateStatus("Error: No se encontró el motor de inyección.", true);
            }
        } else {
            updateStatus("Error: No se encontró el archivo goldhen.bin en el servidor.", true);
        }
    };
    
    xhr.onerror = function() {
        updateStatus("Error de red al intentar cargar el GoldHEN.", true);
    };
    
    xhr.send();
}
