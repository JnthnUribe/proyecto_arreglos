document.addEventListener('DOMContentLoaded', () => {
    // Clase responsable de la lógica del ejercicio 1
    class ContadorCeros {
        constructor(matriz) {
            this.matriz = matriz;
        }

        // Método que cuenta los ceros en cada fila
        contar() {
            return this.matriz.map(fila => 
                fila.filter(numero => numero === 0).length
            );
        }
    }

    // --- Lógica de Interacción con la Página ---
    const matrizEj1 = [
        [0, 2, 5, 7, 6],
        [0, 0, 0, 3, 8],
        [2, 9, 6, 3, 4],
        [1, 5, 6, 1, 4],
        [0, 9, 2, 5, 0]
    ];

    // Mostrar la matriz original en el elemento <pre>
    document.getElementById('matriz-original-1').textContent = JSON.stringify(matrizEj1, null, 2).replace(/],/g, '],\n');

    // Asignar el evento al botón
    document.getElementById('btn-ejercicio1').addEventListener('click', () => {
        const contador = new ContadorCeros(matrizEj1);
        const resultado = contador.contar();
        document.getElementById('resultado-ejercicio1').textContent = `Total de ceros por fila: [${resultado.join(', ')}]`;
    });
});