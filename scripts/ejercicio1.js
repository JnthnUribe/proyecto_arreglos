document.addEventListener('DOMContentLoaded', () => {

    const matrixData = [
        [0, 2, 5, 7, 6],
        [0, 0, 0, 3, 8],
        [2, 9, 6, 3, 4],
        [1, 5, 6, 1, 4],
        [0, 9, 2, 5, 0]
    ];

    const countZerosBtn = document.getElementById('countZerosBtn');
    const resultArea = document.getElementById('resultArea');
    const matrixOutput = document.getElementById('matrixOutput');
    const resultsList = document.getElementById('resultsList');

    class ZeroCounter {
        constructor(matrix) {
            this.matrix = matrix;
        }

        countZerosPerRow() {
            return this.matrix.map(row => {
                return row.filter(element => element === 0).length;
            });
        }
    }

    countZerosBtn.addEventListener('click', () => {
        const counter = new ZeroCounter(matrixData);
        const zeroCounts = counter.countZerosPerRow();

        matrixOutput.textContent = matrixData.map(row => row.join('  ')).join('\n');

        resultsList.innerHTML = '';
        zeroCounts.forEach((count, index) => {
            const li = document.createElement('li');
            li.textContent = `Fila ${index + 1}: ${count} cero(s)`;
            resultsList.appendChild(li);
        });

        resultArea.style.display = 'block';
    });
});