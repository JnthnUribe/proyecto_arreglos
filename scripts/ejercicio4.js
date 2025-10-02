document.addEventListener('DOMContentLoaded', () => {
    // Clase dedicada a generar la matriz identidad
    class MatrizIdentidad {
        generar(tamano) {
            // Validación de la entrada
            if (!tamano || tamano <= 0 || !Number.isInteger(tamano)) {
                return "Error: El tamaño debe ser un número entero positivo.";
            }

            const matriz = [];
            for (let i = 0; i < tamano; i++) {
                matriz[i] = [];
                for (let j = 0; j < tamano; j++) {
                    matriz[i][j] = (i === j) ? 1 : 0;
                }
            }
            return matriz;
        }
    }

    // --- Lógica de Interacción con la Página ---
    document.getElementById('btn-ejercicio4').addEventListener('click', () => {
        const tamano = parseInt(document.getElementById('tamano-matriz').value);
        const generador = new MatrizIdentidad();
        const resultado = generador.generar(tamano);

        // Si el resultado es una matriz, la formateamos. Si no, mostramos el error.
        if (Array.isArray(resultado)) {
            const textoMatriz = resultado.map(fila => fila.join('\t')).join('\n');
            document.getElementById('resultado-ejercicio4').textContent = textoMatriz;
        } else {
            document.getElementById('resultado-ejercicio4').textContent = resultado;
        }
    });
});