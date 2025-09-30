document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const matrixSizeInput = document.getElementById('rotationMatrixSize');
    const generateBtn = document.getElementById('generateRotationMatrixBtn');
    const rotationControls = document.getElementById('rotationControls');
    const originalMatrixDisplay = document.getElementById('originalMatrixDisplay');
    const rotatedMatrixDisplay = document.getElementById('rotatedMatrixDisplay');
    const originalMatrixOutput = document.getElementById('originalMatrixOutput');
    const rotatedMatrixOutput = document.getElementById('rotatedMatrixOutput');

    let currentMatrix = null;
    let originalMatrixState = null;

    // --- CLASE PARA MANEJAR LA MATRIZ ---
    class Matrix {
        constructor(size) {
            this.size = size;
            this.data = [];
        }

        // Llena la matriz con números aleatorios entre 1 y 100
        fillRandom() {
            this.data = [];
            for (let i = 0; i < this.size; i++) {
                const row = [];
                for (let j = 0; j < this.size; j++) {
                    row.push(Math.floor(Math.random() * 99) + 1);
                }
                this.data.push(row);
            }
        }
        
        // Rota la matriz 90 grados en sentido horario
        rotate90() {
            const newMatrixData = Array.from({ length: this.size }, () => Array(this.size).fill(0));
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    newMatrixData[j][this.size - 1 - i] = this.data[i][j];
                }
            }
            this.data = newMatrixData;
        }
        
        // Formatea la matriz como un string para mostrarla
        toString() {
            return this.data.map(row => 
                row.map(cell => String(cell).padStart(3, ' ')).join(' ')
            ).join('\n');
        }
    }

    // --- LÓGICA DE LA INTERFAZ ---

    generateBtn.addEventListener('click', () => {
        const size = parseInt(matrixSizeInput.value);
        if (isNaN(size) || size < 2) {
            alert('Por favor, introduce un tamaño válido (número mayor o igual a 2).');
            return;
        }

        currentMatrix = new Matrix(size);
        currentMatrix.fillRandom();
        originalMatrixState = JSON.parse(JSON.stringify(currentMatrix.data)); // Guardar estado original

        originalMatrixOutput.textContent = currentMatrix.toString();
        originalMatrixDisplay.style.display = 'block';
        rotatedMatrixDisplay.style.display = 'none';
        rotationControls.style.display = 'block';
    });

    // Función genérica para manejar las rotaciones
    function handleRotation(rotations) {
        if (!currentMatrix) return;
        
        // Restaurar al estado original antes de rotar
        currentMatrix.data = JSON.parse(JSON.stringify(originalMatrixState));

        for (let i = 0; i < rotations; i++) {
            currentMatrix.rotate90();
        }
        rotatedMatrixOutput.textContent = currentMatrix.toString();
        rotatedMatrixDisplay.style.display = 'block';
    }

    document.getElementById('rotate90Btn').addEventListener('click', () => handleRotation(1));
    document.getElementById('rotate180Btn').addEventListener('click', () => handleRotation(2));
    document.getElementById('rotate270Btn').addEventListener('click', () => handleRotation(3));

    document.getElementById('resetBtn').addEventListener('click', () => {
        if (!currentMatrix) return;
        currentMatrix.data = JSON.parse(JSON.stringify(originalMatrixState));
        originalMatrixOutput.textContent = currentMatrix.toString();
        rotatedMatrixDisplay.style.display = 'none';
    });
});