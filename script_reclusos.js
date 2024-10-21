

const reclusos = JSON.parse(localStorage.getItem('reclusos')) || [];
// Evento para manejar el envío del formulario
document.getElementById('form-recluso').addEventListener('submit', function(event) {
    event.preventDefault();

    const nuevoRecluso = {
        nombre: document.getElementById('nombre').value,
        identificacion: document.getElementById('identificacion').value,
        delito: document.getElementById('delito').value,
        condena: document.getElementById('condena').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        foto: document.getElementById('foto').files[0]
    };

    // footooss
    const reader = new FileReader();
    reader.onloadend = function() {
        nuevoRecluso.foto = reader.result; 
        
        
        const indexRecluso = document.getElementById('indexRecluso').value;
        if (indexRecluso) {
            reclusos[indexRecluso] = nuevoRecluso;
        } else {
            reclusos.push(nuevoRecluso); 
        }

        localStorage.setItem('reclusos', JSON.stringify(reclusos));
        mostrarReclusos();
        document.getElementById('form-recluso').reset();
        document.getElementById('indexRecluso').value = ''; 
    };

    if (nuevoRecluso.foto) {
        reader.readAsDataURL(nuevoRecluso.foto);
    } else {
        alert("Por favor, agrega una foto.");
    }
});

// Función para mostrar reclusos
function mostrarReclusos() {
    const reclusosList = document.getElementById('reclusosList');
    reclusosList.innerHTML = '';

    reclusos.forEach((recluso, index) => {
        reclusosList.innerHTML += `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${recluso.foto}" class="card-img" alt="${recluso.nombre}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${recluso.nombre}</h5>
                            <p class="card-text">ID: ${recluso.identificacion}</p>
                            <p class="card-text">Delito: ${recluso.delito}</p>
                            <p class="card-text">Condena: ${recluso.condena}</p>
                            <p class="card-text">Fecha de Ingreso: ${recluso.fechaIngreso}</p>
                            <button class="btn btn-warning btn-sm" onclick="editarRecluso(${index})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarRecluso(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Función para editar un recluso
function editarRecluso(index) {
    const recluso = reclusos[index];
    document.getElementById('nombre').value = recluso.nombre;
    document.getElementById('identificacion').value = recluso.identificacion;
    document.getElementById('delito').value = recluso.delito;
    document.getElementById('condena').value = recluso.condena;
    document.getElementById('fechaIngreso').value = recluso.fechaIngreso;
    document.getElementById('indexRecluso').value = index; 
}

// eliminar un recluso
function eliminarRecluso(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este recluso?')) {
        reclusos.splice(index, 1); 
        localStorage.setItem('reclusos', JSON.stringify(reclusos));
        mostrarReclusos();
    }
}


mostrarReclusos();
