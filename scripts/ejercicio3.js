document.addEventListener('DOMContentLoaded', () => {
    // Clase para manejar las operaciones de matrices
    class CalculadoraMatrices {
        // Método privado y genérico para realizar cualquier operación
        _realizarOperacion(matrizA, matrizB, operacion) {
            const resultado = [[0, 0], [0, 0]];
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    resultado[i][j] = operacion(matrizA[i][j], matrizB[i][j]);
                }
            }
            return resultado;
        }
        
        // Métodos públicos
        sumar(matrizA, matrizB) { return this._realizarOperacion(matrizA, matrizB, (a, b) => a + b); }
        restar(matrizA, matrizB) { return this._realizarOperacion(matrizA, matrizB, (a, b) => a - b); }
        multiplicar(matrizA, matrizB) { return this._realizarOperacion(matrizA, matrizB, (a, b) => a * b); }
        dividir(matrizA, matrizB) {
            if (matrizB.flat().includes(0)) return "Error: No se puede dividir por cero.";
            return this._realizarOperacion(matrizA, matrizB, (a, b) => parseFloat(a / b).toFixed(2));
        }
    }

    // --- Lógica de Interacción con la Página ---
    const leerMatriz = (prefix) => [
        [parseFloat(document.getElementById(prefix + '00').value) || 0, parseFloat(document.getElementById(prefix + '01').value) || 0],
        [parseFloat(document.getElementById(prefix + '10').value) || 0, parseFloat(document.getElementById(prefix + '11').value) || 0]
    ];

    document.getElementById('btn-ejercicio3').addEventListener('click', () => {
        const matrizA = leerMatriz('a');
        const matrizB = leerMatriz('b');
        const calc = new CalculadoraMatrices();
        
        // Formatear la salida para que se vea bien en la etiqueta <pre>
        const resultadosTexto = 
            `Suma:\n${JSON.stringify(calc.sumar(matrizA, matrizB), null, 2)}\n\n` +
            `Resta:\n${JSON.stringify(calc.restar(matrizA, matrizB), null, 2)}\n\n` +
            `Producto:\n${JSON.stringify(calc.multiplicar(matrizA, matrizB), null, 2)}\n\n` +
            `División:\n${JSON.stringify(calc.dividir(matrizA, matrizB), null, 2)}`;
            
        document.getElementById('resultado-ejercicio3').textContent = resultadosTexto;
    });
});