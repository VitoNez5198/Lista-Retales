// Función para ordenar la lista de materiales por color
document.getElementById('sortByColor').addEventListener('click', function() {
    materiales.sort((a, b) => a.color.localeCompare(b.color));
    actualizarTabla();
});

// Función para ordenar la lista de materiales por tipo
document.getElementById('sortByTipo').addEventListener('click', function() {
    materiales.sort((a, b) => a.tipo.localeCompare(b.tipo));
    actualizarTabla();
});

// Función para ordenar la lista de materiales por línea
document.getElementById('sortByLinea').addEventListener('click', function() {
    materiales.sort((a, b) => a.linea.localeCompare(b.linea));
    actualizarTabla();
});
