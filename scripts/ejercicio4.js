document.addEventListener('DOMContentLoaded', () => {

    const generateIdentityBtn = document.getElementById('generateIdentityBtn');
    const sizeInput = document.getElementById('identityMatrixSize');
    const resultArea = document.getElementById('resultArea');
    const identityMatrixOutput = document.getElementById('identityMatrixOutput');

    const MAX_SIZE = 20;

    class MatrixGenerator {
        static createIdentity(size) {
            const matrix = [];
            for (let i = 0; i < size; i++) {
                const row = [];
                for (let j = 0; j < size; j++) {
                    row.push(i === j ? 1 : 0);
                }
                matrix.push(row);
            }
            return matrix;
        }
    }

    generateIdentityBtn.addEventListener('click', () => {
        const size = parseInt(sizeInput.value);

        if (isNaN(size) || size < 1) {
            alert('Por favor, introduce un tamaño válido (número mayor o igual a 1).');
            return;
        }

        if (size > MAX_SIZE) {
            alert(`El tamaño es demasiado grande. Por favor, introduce un número menor o igual a ${MAX_SIZE} para evitar problemas de rendimiento.`);
            return; 
        }

        const identityMatrix = MatrixGenerator.createIdentity(size);
        
        identityMatrixOutput.textContent = identityMatrix.map(row => row.join('  ')).join('\n');
        resultArea.style.display = 'block';
    });
});