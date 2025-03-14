// Lógica de autenticación
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'joel' && password === 'Byjoel123') {
        localStorage.setItem('isLoggedIn', 'true');
        mostrarDashboard();
        M.toast({html: 'Inicio de sesión exitoso', classes: 'green'});
    } else {
        M.toast({html: 'Usuario o contraseña incorrectos', classes: 'red'});
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    mostrarLogin();
    M.toast({html: 'Sesión cerrada', classes: 'blue'});
}

function mostrarLogin() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function mostrarDashboard() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    cargarParticipantes();
}

// Manejo de participantes
let participantes = JSON.parse(localStorage.getItem('participantes')) || [];

function cargarParticipantes() {
    const contenido = document.getElementById('contenido');
    let tabla = '<table class="striped"><thead><tr><th>Nombre</th><th>Monto</th><th>Acciones</th></tr></thead><tbody>';
    participantes.forEach((p, index) => {
        tabla += `<tr>
            <td contenteditable='true' onblur='actualizarNombre(${index}, this.innerText)'>${p.nombre}</td>
            <td contenteditable='true' onblur='actualizarMonto(${index}, this.innerText)'>${p.monto}</td>
            <td><button class="btn red" onclick="eliminarParticipante(${index})">Eliminar</button></td>
        </tr>`;
    });
    tabla += '</tbody></table>';
    contenido.innerHTML = tabla;
}

function actualizarNombre(index, nuevoNombre) {
    participantes[index].nombre = nuevoNombre;
    guardarParticipantes();
}

function actualizarMonto(index, nuevoMonto) {
    participantes[index].monto = parseFloat(nuevoMonto) || 0;
    guardarParticipantes();
}

function eliminarParticipante(index) {
    participantes.splice(index, 1);
    guardarParticipantes();
    cargarParticipantes();
    M.toast({html: 'Participante eliminado', classes: 'red'});
}

function guardarParticipantes() {
    localStorage.setItem('participantes', JSON.stringify(participantes));
}

function inscribirPersona() {
    const nombre = prompt('Nombre del participante:');
    if (nombre) {
        participantes.push({ nombre, monto: 0 });
        guardarParticipantes();
        cargarParticipantes();
        M.toast({html: 'Participante inscrito', classes: 'green'});
    }
}

// Verificar sesión al cargar
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        mostrarDashboard();
    } else {
        mostrarLogin();
    }
});
