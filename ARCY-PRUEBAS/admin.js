const server = "https://ollin-backend-production.up.railway.app"

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const res = await fetch(`${server}/api/authenticator/usuarioLogueado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // ¡ESTA ES LA LÍNEA MÁGICA! Hace que el navegador envíe la cookie solo.
      credentials: 'include' 
      // Borramos el "body" porque ya no necesitamos mandarlo como texto.
    });

    // Si el servidor responde que no estamos logueados (401), mandamos al login
    if (!res.ok) {
      window.location.href = "/";
      return;
    }

    const usuario = await res.json();
    
    // Si por alguna razón el usuario viene vacío
    if (!usuario || usuario === false) {
      window.location.href = "/";
      return;
    }

    // Si todo salió bien, guardamos los datos
    window.usuarioLogueado = usuario;
    const nombreUsuario = document.getElementById("nombreUsuario");
    
    if (nombreUsuario) { // Siempre es bueno verificar que el elemento existe en el HTML
      nombreUsuario.innerHTML = usuario.Nombre;
      nombreUsuario.dataset.idTurista = usuario.id;
    }

  } catch (error) {
    console.error("Error verificando sesión:", error);
    window.location.href = "/";
  }
})

document.addEventListener('DOMContentLoaded', async function () {
  document.getElementById('cerrarSesion').addEventListener('click', async (e) => {
    e.preventDefault()

    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

    window.location.href = "/"
  })
})