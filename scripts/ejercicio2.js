document.addEventListener('DOMContentLoaded', () => {

    const matrixSizeInput = document.getElementById('matrixSize');
    const generateGridBtn = document.getElementById('generateGridBtn');
    const matrixGrid = document.getElementById('matrixGrid');
    const actionContainer = document.getElementById('actionContainer');
    const validateBtn = document.getElementById('validateBtn');
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');

    class MagicSquareValidator {
        constructor(matrix) {
            this.matrix = matrix;
            this.size = matrix.length;
            this.magicConstant = this.size * (this.size * this.size + 1) / 2;
        }

        validateRow(rowIndex) {
            const sum = this.matrix[rowIndex].reduce((acc, val) => acc + val, 0);
            return sum === this.magicConstant;
        }

        validateColumn(colIndex) {
            let sum = 0;
            for (let i = 0; i < this.size; i++) {
                sum += this.matrix[i][colIndex];
            }
            return sum === this.magicConstant;
        }

        validateMainDiagonal() {
            let sum = 0;
            for (let i = 0; i < this.size; i++) {
                sum += this.matrix[i][i];
            }
            return sum === this.magicConstant;
        }

        validateAntiDiagonal() {
            let sum = 0;
            for (let i = 0; i < this.size; i++) {
                sum += this.matrix[i][this.size - 1 - i];
            }
            return sum === this.magicConstant;
        }

        isMagic() {
            for (let i = 0; i < this.size; i++) {
                if (!this.validateRow(i) || !this.validateColumn(i)) {
                    return false;
                }
            }

            if (!this.validateMainDiagonal() || !this.validateAntiDiagonal()) {
                return false;
            }

            return true;
        }
    }

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
            input.min = 1; // Solo números positivos mayores a cero
            matrixGrid.appendChild(input);
        }

        actionContainer.style.display = 'block';
        resultArea.style.display = 'none';
    });

    validateBtn.addEventListener('click', () => {
        const size = parseInt(matrixSizeInput.value);
        const inputs = document.querySelectorAll('#matrixGrid input');
        const matrix = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const value = parseInt(inputs[i * size + j].value);
                if (isNaN(value) || value <= 0) {
                    alert('Por favor, llena todas las casillas con números positivos mayores a cero.');
                    return;
                }
                row.push(value);
            }
            matrix.push(row);
        }

        const validator = new MagicSquareValidator(matrix);
        const isMagic = validator.isMagic();
        
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