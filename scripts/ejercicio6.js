// scripts/ejercicio6.js
// Lógica para el ejercicio 6: ventas por mes y día de la semana

function mostrarResultadosEj6() {
    // Datos de la tabla (12 meses x 5 días)
    const ventas = [
        [5, 16, 10, 12, 24],
        [40, 55, 10, 11, 18],
        [15, 41, 78, 14, 51],
        [35, 22, 81, 15, 12],
        [50, 12, 71, 10, 20],
        [70, 40, 60, 28, 22],
        [50, 50, 50, 36, 25],
        [40, 70, 40, 11, 20],
        [20, 20, 30, 12, 18],
        [10, 40, 32, 13, 16],
        [3, 24, 24, 15, 82],
        [40, 46, 15, 46, 22]
    ];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    // a) Declarar e inicializar el arreglo (ya hecho arriba)

    // b) Menor venta y su posición
    let min = ventas[0][0], minMes = 0, minDia = 0;
    let max = ventas[0][0], maxMes = 0, maxDia = 0;
    let total = 0;
    let ventaPorDia = Array(dias.length).fill(0);

    for (let i = 0; i < ventas.length; i++) {
        for (let j = 0; j < ventas[i].length; j++) {
            let v = ventas[i][j];
            total += v;
            ventaPorDia[j] += v;
            if (v < min) {
                min = v;
                minMes = i;
                minDia = j;
            }
            if (v > max) {
                max = v;
                maxMes = i;
                maxDia = j;
            }
        }
    }

    // Construir tabla de ventas
    let html = '<h3>Tabla de Ventas</h3>';
    html += '<table class="result-table"><thead><tr><th>Mes/Día</th>';
    for (let d of dias) html += `<th>${d}</th>`;
    html += '</tr></thead><tbody>';
    for (let i = 0; i < ventas.length; i++) {
        html += `<tr><td>${meses[i]}</td>`;
        for (let j = 0; j < dias.length; j++) {
            html += `<td>${ventas[i][j]}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';

    // b) Menor venta
    html += `<p><b>Menor venta:</b> $${min}.00 en <b>${meses[minMes]}</b>, <b>${dias[minDia]}</b></p>`;
    // c) Mayor venta
    html += `<p><b>Mayor venta:</b> $${max}.00 en <b>${meses[maxMes]}</b>, <b>${dias[maxDia]}</b></p>`;
    // d) Venta total
    html += `<p><b>Venta total del año:</b> $${total}.00</p>`;
    // e) Venta por día
    html += '<h4>Venta por día de la semana:</h4><ul>';
    for (let j = 0; j < dias.length; j++) {
        html += `<li><b>${dias[j]}:</b> $${ventaPorDia[j]}.00</li>`;
    }
    html += '</ul>';

    document.getElementById('output6').innerHTML = html;
}
