
const personal = JSON.parse(localStorage.getItem('personal')) || [];

// envío del formulario
document.getElementById('form-personal').addEventListener('submit', function(event) {
    event.preventDefault();

    const nuevoPersonal = {
        nombre: document.getElementById('nombre').value,
        identificacion: document.getElementById('identificacion').value,
        cargo: document.getElementById('cargo').value,
        foto: document.getElementById('foto').files[0]
    };

    // verificador campos están completos
    if (!nuevoPersonal.nombre || !nuevoPersonal.identificacion || !nuevoPersonal.cargo) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
    }

    // fotoss
    const reader = new FileReader();
    reader.onloadend = function() {
        nuevoPersonal.foto = reader.result; 
        
        // edita personal 
        const indexPersonal = document.getElementById('indexPersonal').value;
        if (indexPersonal) {
            personal[indexPersonal] = nuevoPersonal;
        } else {
            personal.push(nuevoPersonal); 
        }

        localStorage.setItem('personal', JSON.stringify(personal));
        mostrarPersonal();
        document.getElementById('form-personal').reset();
        document.getElementById('indexPersonal').value = ''; 
    };

    if (nuevoPersonal.foto) {
        reader.readAsDataURL(nuevoPersonal.foto);
    } else {
        alert("Por favor, agrega una foto.");
    }
});

//  mostrar personal
function mostrarPersonal() {
    const personalList = document.getElementById('personalList');
    personalList.innerHTML = '';

    personal.forEach((persona, index) => {
        personalList.innerHTML += `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${persona.foto}" class="card-img" alt="${persona.nombre}" onerror="this.onerror=null; this.src='default.jpg';">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${persona.nombre}</h5>
                            <p class="card-text">ID: ${persona.identificacion}</p>
                            <p class="card-text">Cargo: ${persona.cargo}</p>
                            <button class="btn btn-warning btn-sm" onclick="editarPersonal(${index})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarPersonal(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

//editar un personal
function editarPersonal(index) {
    const persona = personal[index];
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('identificacion').value = persona.identificacion;
    document.getElementById('cargo').value = persona.cargo;
    document.getElementById('indexPersonal').value = index; 
}

// eliminar un personal
function eliminarPersonal(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este personal?')) {
        personal.splice(index, 1); 
        localStorage.setItem('personal', JSON.stringify(personal));
        mostrarPersonal();
    }
}


mostrarPersonal();
