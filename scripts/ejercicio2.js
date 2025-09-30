// Espera a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const matrixSizeInput = document.getElementById('matrixSize');
    const generateGridBtn = document.getElementById('generateGridBtn');
    const matrixGrid = document.getElementById('matrixGrid');
    const actionContainer = document.getElementById('actionContainer');
    const validateBtn = document.getElementById('validateBtn');
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');

    // --- CLASE PARA VALIDAR EL CUADRADO MÁGICO ---
    class MagicSquareValidator {
        constructor(matrix) {
            this.matrix = matrix;
            this.size = matrix.length;
            this.magicConstant = this.size * (this.size * this.size + 1) / 2;
        }

        // Valida la suma de una fila
        validateRow(rowIndex) {
            const sum = this.matrix[rowIndex].reduce((acc, val) => acc + val, 0);
            return sum === this.magicConstant;
        }

        // Valida la suma de una columna
        validateColumn(colIndex) {
            let sum = 0;
            for (let i = 0; i < this.size; i++) {
                sum += this.matrix[i][colIndex];
            }
            return sum === this.magicConstant;
        }

        // Valida la suma de la diagonal principal (top-left a bottom-right)
        validateMainDiagonal() {
            let sum = 0;
            for (let i = 0; i < this.size; i++) {
                sum += this.matrix[i][i];
            }
            return sum === this.magicConstant;
        }

        // Valida la suma de la diagonal secundaria (top-right a bottom-left)
        validateAntiDiagonal() {
            let sum = 0;
            for (let i = 0; i < this.size; i++) {
                sum += this.matrix[i][this.size - 1 - i];
            }
            return sum === this.magicConstant;
        }

        // Método principal que ejecuta todas las validaciones
        isMagic() {
            // Validar filas y columnas
            for (let i = 0; i < this.size; i++) {
                if (!this.validateRow(i) || !this.validateColumn(i)) {
                    return false;
                }
            }

            // Validar diagonales
            if (!this.validateMainDiagonal() || !this.validateAntiDiagonal()) {
                return false;
            }

            return true;
        }
    }

    // --- LÓGICA DE LA INTERFAZ ---

    // Genera el grid de inputs basado en el tamaño N
    generateGridBtn.addEventListener('click', () => {
        const size = parseInt(matrixSizeInput.value);
        if (isNaN(size) || size < 2) {
            alert('Por favor, introduce un tamaño válido (número mayor o igual a 2).');
            return;
        }

        matrixGrid.innerHTML = ''; // Limpiar grid anterior
        matrixGrid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
        
        for (let i = 0; i < size * size; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('matrix-cell');
            matrixGrid.appendChild(input);
        }

        actionContainer.style.display = 'block';
        resultArea.style.display = 'none';
    });

    // Valida la matriz cuando se presiona el botón
    validateBtn.addEventListener('click', () => {
        const size = parseInt(matrixSizeInput.value);
        const inputs = document.querySelectorAll('#matrixGrid input');
        const matrix = [];

        // Convertir los inputs del DOM a una matriz 2D
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const value = parseInt(inputs[i * size + j].value);
                if (isNaN(value)) {
                    alert('Por favor, llena todas las casillas con números.');
                    return;
                }
                row.push(value);
            }
            matrix.push(row);
        }

        // Usar la clase para validar
        const validator = new MagicSquareValidator(matrix);
        const isMagic = validator.isMagic();
        
        // Mostrar el resultado
        resultArea.style.display = 'block';
        if (isMagic) {
            resultText.textContent = `¡Es un cuadrado mágico! La constante mágica es ${validator.magicConstant}.`;
            resultText.style.color = 'green';
        } else {
            resultText.textContent = 'No es un cuadrado mágico. Las sumas no coinciden.';
            resultText.style.color = 'red';
        }
    });
});