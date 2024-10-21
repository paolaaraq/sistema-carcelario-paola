
const visitas = JSON.parse(localStorage.getItem('visitas')) || [];

document.getElementById('form-visita').addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevaVisita = {
        visitante: document.getElementById('visitante').value,
        fechaVisita: document.getElementById('fechaVisita').value,
        reclusoVisita: document.getElementById('reclusoVisita').value,
    };

    visitas.push(nuevaVisita);
    localStorage.setItem('visitas', JSON.stringify(visitas));
    mostrarVisitas();
    this.reset();
});

function mostrarVisitas() {
    const visitasList = document.getElementById('visitasList');
    visitasList.innerHTML = '';

    visitas.forEach((visita, index) => {
        visitasList.innerHTML += `
            <div class="alert alert-info">
                <strong>${visita.visitante}</strong> - ${visita.fechaVisita} - ${visita.reclusoVisita}
                <button class="btn btn-danger btn-sm" onclick="eliminarVisita(${index})">Eliminar</button>
            </div>
        `;
    });
}

function eliminarVisita(index) {
    visitas.splice(index, 1);
    localStorage.setItem('visitas', JSON.stringify(visitas));
    mostrarVisitas();
}


mostrarVisitas();
