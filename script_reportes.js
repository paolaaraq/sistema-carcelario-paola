

const reportes = JSON.parse(localStorage.getItem('reportes')) || [];

document.getElementById('form-reporte').addEventListener('submit', function (event) {
    event.preventDefault();

    const nuevoReporte = {
        fecha: document.getElementById('fecha').value,
        numeroVisitas: document.getElementById('numeroVisitas').value,
        eventos: document.getElementById('eventos').value,
        actividades: document.getElementById('actividades').value,
    };

    reportes.push(nuevoReporte);
    localStorage.setItem('reportes', JSON.stringify(reportes));
    mostrarReportes();
    this.reset();
});

function mostrarReportes() {
    const reportesList = document.getElementById('reportesList');
    reportesList.innerHTML = '';

    reportes.forEach((reporte, index) => {
        reportesList.innerHTML += `
            <div class="alert alert-info">
                <strong>Fecha:</strong> ${reporte.fecha} <br>
                <strong>Número de Visitas:</strong> ${reporte.numeroVisitas} <br>
                <strong>Eventos:</strong> ${reporte.eventos} <br>
                <strong>Actividades Recreativas:</strong> ${reporte.actividades}
                <button class="btn btn-danger btn-sm" onclick="eliminarReporte(${index})">Eliminar</button>
            </div>
        `;
    });
}

function eliminarReporte(index) {
    reportes.splice(index, 1);
    localStorage.setItem('reportes', JSON.stringify(reportes));
    mostrarReportes();
}


mostrarReportes();
