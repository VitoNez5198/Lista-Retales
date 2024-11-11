document.addEventListener("DOMContentLoaded", () => {
    const lineaSelect = document.getElementById("linea");
    const tipoSelect = document.getElementById("tipo");
    const colorSelect = document.getElementById("color");

    // Inicializar arreglo de materiales
    let materiales = [];

    // Cargar las opciones de los selectores desde materials.json
    fetch('materials.json')
        .then(response => response.json())
        .then(data => {
            // Llenar el select de líneas
            data.lineas.forEach(linea => {
                const option = document.createElement("option");
                option.value = linea;
                option.textContent = linea;
                lineaSelect.appendChild(option);
            });

            // Llenar el select de colores
            data.colores.forEach(color => {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                colorSelect.appendChild(option);
            });

            // Llenar el select de tipos
            data.tipos.forEach(tipo => {
                const option = document.createElement("option");
                option.value = tipo;
                option.textContent = tipo;
                tipoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    // Manejo del formulario
    document.getElementById("materialForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const linea = document.getElementById("linea").value;
        const tipo = document.getElementById("tipo").value;
        const color = document.getElementById("color").value;
        const cantidad = document.getElementById("cantidad").value;
        const longitud = document.getElementById("longitud").value;

        if (!linea || !tipo || !color || !cantidad || !longitud) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Agregar material al arreglo y actualizar la tabla
        agregarMaterial(linea, tipo, color, cantidad, longitud);
    });

    function agregarMaterial(linea, tipo, color, cantidad, longitud) {
        // Crear el objeto material
        const material = {
            linea: linea,
            tipo: tipo,
            color: color,
            cantidad: cantidad,
            longitud: longitud
        };

        // Agregar el material al arreglo
        materiales.push(material);

        // Actualizar la tabla
        actualizarTabla();

        // Limpiar el formulario después de agregar el material
        document.getElementById("materialForm").reset();
    }

    // Función para actualizar la tabla con los materiales
    function actualizarTabla() {
        const materialList = document.getElementById("materialList");
        materialList.innerHTML = '';  // Limpiar la tabla

        materiales.forEach(material => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${material.linea}</td>
                <td>${material.tipo}</td>
                <td>${material.color}</td>
                <td>${material.cantidad}</td>
                <td>${material.longitud} cm</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarMaterial(this)">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarMaterial(this)">Eliminar</button>
                </td>
            `;
            materialList.appendChild(row);
        });
    }

    // Función para eliminar material
    window.eliminarMaterial = function(button) {
        const row = button.closest("tr");
        const index = Array.from(row.parentNode.children).indexOf(row);
        materiales.splice(index, 1);  // Eliminar material del arreglo
        actualizarTabla();  // Actualizar la tabla
    }

    // Función para editar material (aquí podrías mejorar para permitir la edición)
    window.editarMaterial = function(button) {
        const row = button.closest("tr");
        const cells = row.getElementsByTagName("td");

        // Rellenar el formulario con los valores para editar
        document.getElementById("linea").value = cells[0].textContent;
        document.getElementById("tipo").value = cells[1].textContent;
        document.getElementById("color").value = cells[2].textContent;
        document.getElementById("cantidad").value = cells[3].textContent;
        document.getElementById("longitud").value = cells[4].textContent.replace(' cm', '');

        // Eliminar la fila de la tabla para editarla
        row.remove();
        materiales.splice(index, 1);  // Eliminar material del arreglo para permitir edición
    }

    // Funciones de ordenación
    document.getElementById('sortByColor').addEventListener('click', function() {
        materiales.sort((a, b) => a.color.localeCompare(b.color));
        actualizarTabla();
    });

    document.getElementById('sortByTipo').addEventListener('click', function() {
        materiales.sort((a, b) => a.tipo.localeCompare(b.tipo));
        actualizarTabla();
    });

    document.getElementById('sortByLinea').addEventListener('click', function() {
        materiales.sort((a, b) => a.linea.localeCompare(b.linea));
        actualizarTabla();
    });
});
