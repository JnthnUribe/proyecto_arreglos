// scripts/ejercicio5.js
// Lógica para el ejercicio 5: matriz 5x10, sumas y promedios por fila y columna

function generarMatrizEj5() {
    const filas = 5;
    const columnas = 10;
    let matriz = [];
    let sumaFilas = [];
    let promedioFilas = [];
    let sumaColumnas = Array(columnas).fill(0);
    let promedioColumnas = Array(columnas).fill(0);

    // Llenar matriz con números aleatorios del 1 al 9
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        let suma = 0;
        for (let j = 0; j < columnas; j++) {
            let num = Math.floor(Math.random() * 9) + 1;
            matriz[i][j] = num;
            suma += num;
            sumaColumnas[j] += num;
        }
        sumaFilas[i] = suma;
        promedioFilas[i] = (suma / columnas).toFixed(2);
    }
    // Calcular promedios de columnas
    for (let j = 0; j < columnas; j++) {
        promedioColumnas[j] = (sumaColumnas[j] / filas).toFixed(2);
    }
    return {
        matriz,
        sumaFilas,
        promedioFilas,
        sumaColumnas,
        promedioColumnas
    };
}

function mostrarResultadosEj5() {
    const datos = generarMatrizEj5();
    const filas = datos.matriz.length;
    const columnas = datos.matriz[0].length;
    let html = '<h3>Matriz</h3>';
    html += '<table class="result-table"><tbody>';
    for (let i = 0; i < filas; i++) {
        html += '<tr>';
        for (let j = 0; j < columnas; j++) {
            html += `<td>${datos.matriz[i][j]}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';

    // Tabla de sumas y promedios por fila (A y B)
    html += '<table class="result-table"><tr><th>A</th><th>B</th></tr>';
    for (let i = 0; i < filas; i++) {
        html += `<tr><td>${datos.sumaFilas[i]}</td><td>${datos.promedioFilas[i]}</td></tr>`;
    }
    html += '</table>';

    // Tabla de sumas y promedios por columna (C y D)
    html += '<table class="result-table"><tr>';
    for (let j = 0; j < columnas; j++) {
        html += `<th>C${j+1}</th>`;
    }
    html += '</tr><tr>';
    for (let j = 0; j < columnas; j++) {
        html += `<td>${datos.sumaColumnas[j]}</td>`;
    }
    html += '</tr><tr>';
    for (let j = 0; j < columnas; j++) {
        html += `<td>${datos.promedioColumnas[j]}</td>`;
    }
    html += '</tr></table>';

    document.getElementById('output').innerHTML = html;
}

// Para usar en el HTML: <button onclick="mostrarResultadosEj5()">Generar matriz y calcular</button>
