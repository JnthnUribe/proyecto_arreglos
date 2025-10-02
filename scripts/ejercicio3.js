document.addEventListener('DOMContentLoaded', () => {
    
    const calculateOpsBtn = document.getElementById('calculateOpsBtn');
    const matrixA_inputs = document.querySelectorAll('#matrixA_inputs input');
    const matrixB_inputs = document.querySelectorAll('#matrixB_inputs input');
    const resultArea = document.getElementById('resultArea');
    const sumResult = document.getElementById('sumResult');
    const subtractionResult = document.getElementById('subtractionResult');
    const productResult = document.getElementById('productResult');
    const divisionResult = document.getElementById('divisionResult');

    class MatrixCalculator {
        constructor(matrixA, matrixB) {
            this.a = matrixA;
            this.b = matrixB;
            this.size = 2; // Para matrices 2x2
        }
        
        _performOperation(operation) {
            const result = [[0, 0], [0, 0]];
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    result[i][j] = operation(this.a[i][j], this.b[i][j]);
                }
            }
            return result;
        }

        add() { return this._performOperation((a, b) => a + b); }
        subtract() { return this._performOperation((a, b) => a - b); }
        multiply() { return this._performOperation((a, b) => a * b); }
        divide() {
            return this._performOperation((a, b) => {
                
                if (b === 0) {
                    return 'Error'; 
                }
                return (a / b).toFixed(2);
            });
        }
    }


    function getMatrixFromInputs(inputs) {
        const values = Array.from(inputs).map(input => parseFloat(input.value));
        
        if (values.some(isNaN) || values.some(v => v <= 0)) {
            return null;
        }
        return [[values[0], values[1]], [values[2], values[3]]];
    }

    function formatMatrix(matrix) {
        return matrix.map(row => row.join('\t')).join('\n');
    }

    calculateOpsBtn.addEventListener('click', () => {
        const matrixA = getMatrixFromInputs(matrixA_inputs);
        const matrixB = getMatrixFromInputs(matrixB_inputs);

        if (!matrixA || !matrixB) {
            alert('Por favor, llena todos los campos y asegúrate de que todos los números sean mayores que cero.');
            return;
        }

        const calculator = new MatrixCalculator(matrixA, matrixB);
        
        sumResult.textContent = formatMatrix(calculator.add());
        subtractionResult.textContent = formatMatrix(calculator.subtract());
        productResult.textContent = formatMatrix(calculator.multiply());
        divisionResult.textContent = formatMatrix(calculator.divide());

        resultArea.style.display = 'block';
    });
});