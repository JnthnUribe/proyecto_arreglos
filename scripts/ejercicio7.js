// scripts/ejercicio7.js
// Lógica para el ejercicio 7: calificaciones de alumnos y parciales

function mostrarResultadosEj7() {
    // Datos de la tabla (10 alumnos x 3 parciales)
    const calificaciones = [
        [5.5, 8.6, 10],
        [8.0, 5.5, 10],
        [9.0, 4.1, 7.8],
        [10, 2.2, 8.1],
        [7.0, 9.2, 7.1],
        [9.0, 4.0, 4.0],
        [6.5, 5.0, 5.0],
        [4.0, 7.0, 4.0],
        [8.0, 8.0, 9.0],
        [10, 9.0, 9.2],
        [5.0, 10.0, 8.4],
        [9.0, 4.6, 7.5]
    ];
    const nAlumnos = calificaciones.length;
    const nParciales = calificaciones[0].length;

    // a) Promedio de cada alumno
    let promedios = calificaciones.map(arr => {
        let sum = arr.reduce((a, b) => a + b, 0);
        return +(sum / nParciales).toFixed(2);
    });

    // b) Promedio más alto
    let maxProm = Math.max(...promedios);
    let idxMax = promedios.indexOf(maxProm);
    // c) Promedio más bajo
    let minProm = Math.min(...promedios);
    let idxMin = promedios.indexOf(minProm);

    // d) Cuantos parciales fueron reprobados (menores a 7.0)
    let reprobados = 0;
    for (let i = 0; i < nAlumnos; i++) {
        for (let j = 0; j < nParciales; j++) {
            if (calificaciones[i][j] < 7.0) reprobados++;
        }
    }

    // e) Distribución de promedios
    let distribucion = {
        '0 - 4.9': 0,
        '5.0 - 5.9': 0,
        '6.0 - 6.9': 0,
        '7.0 - 7.9': 0,
        '8.0 - 8.9': 0,
        '9.0 - 10': 0
    };
    for (let prom of promedios) {
        if (prom < 5) distribucion['0 - 4.9']++;
        else if (prom < 6) distribucion['5.0 - 5.9']++;
        else if (prom < 7) distribucion['6.0 - 6.9']++;
        else if (prom < 8) distribucion['7.0 - 7.9']++;
        else if (prom < 9) distribucion['8.0 - 8.9']++;
        else distribucion['9.0 - 10']++;
    }

    // Construir tabla de calificaciones
    let html = '<h3>Tabla de Calificaciones</h3>';
    html += '<table class="result-table"><thead><tr><th>Alumno</th>';
    for (let p = 1; p <= nParciales; p++) html += `<th>Parcial ${p}</th>`;
    html += '<th>Promedio</th></tr></thead><tbody>';
    for (let i = 0; i < nAlumnos; i++) {
        html += `<tr><td>${i+1}</td>`;
        for (let j = 0; j < nParciales; j++) {
            html += `<td>${calificaciones[i][j]}</td>`;
        }
        html += `<td><b>${promedios[i]}</b></td></tr>`;
    }
    html += '</tbody></table>';

    html += `<p><b>Promedio más alto:</b> ${maxProm} (Alumno ${idxMax+1})</p>`;
    html += `<p><b>Promedio más bajo:</b> ${minProm} (Alumno ${idxMin+1})</p>`;
    html += `<p><b>Parciales reprobados (menores a 7.0):</b> ${reprobados}</p>`;

    html += '<h4>Distribución de calificaciones finales (promedio):</h4><ul>';
    for (let rango in distribucion) {
        html += `<li><b>${rango}:</b> ${distribucion[rango]} Alumnos</li>`;
    }
    html += '</ul>';

    document.getElementById('output7').innerHTML = html;
}
