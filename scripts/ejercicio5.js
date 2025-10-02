document.addEventListener('DOMContentLoaded', () => {

    const calculateBtn = document.getElementById('calculateBtn');
    const resultArea = document.getElementById('resultArea');
    const matrixOutput = document.getElementById('matrixOutput');
    const arrayAOutput = document.getElementById('arrayAOutput');
    const arrayBOutput = document.getElementById('arrayBOutput');
    const arrayCOutput = document.getElementById('arrayCOutput');
    const arrayDOutput = document.getElementById('arrayDOutput');

    class MatrixStatistics {
        constructor(rows, cols) {
            this.rows = rows;
            this.cols = cols;
            this.matrix = [];
            this.arrayA = []; 
            this.arrayB = []; 
            this.arrayC = []; 
            this.arrayD = []; 
        }

        generateMatrix() {
            this.matrix = Array.from({ length: this.rows }, () => 
                Array.from({ length: this.cols }, () => Math.floor(Math.random() * 100) + 1)
            );
        }

        calculateRowStats() {
            this.arrayA = [];
            this.arrayB = [];
            this.matrix.forEach(row => {
                const sum = row.reduce((acc, val) => acc + val, 0);
                this.arrayA.push(sum);
                this.arrayB.push(sum / this.cols);
            });
        }

        calculateColumnStats() {
            this.arrayC = [];
            this.arrayD = [];
            for (let j = 0; j < this.cols; j++) {
                let colSum = 0;
                for (let i = 0; i < this.rows; i++) {
                    colSum += this.matrix[i][j];
                }
                this.arrayC.push(colSum);
                this.arrayD.push(colSum / this.rows);
            }
        }
        
        run() {
            this.generateMatrix();
            this.calculateRowStats();
            this.calculateColumnStats();
        }
    }
    

    function formatMatrix(matrix) {
        return matrix.map(row => 
            row.map(cell => String(cell).padStart(4, ' ')).join('')
        ).join('\n');
    }
    
    calculateBtn.addEventListener('click', () => {
        const stats = new MatrixStatistics(5, 10);
        stats.run();

        matrixOutput.textContent = formatMatrix(stats.matrix);
        arrayAOutput.textContent = stats.arrayA.join('\n');
        arrayBOutput.textContent = stats.arrayB.map(avg => avg.toFixed(2)).join('\n');
        arrayCOutput.textContent = stats.arrayC.join('  ');
        arrayDOutput.textContent = stats.arrayD.map(avg => avg.toFixed(2)).join('  ');

        resultArea.style.display = 'block';
    });
});