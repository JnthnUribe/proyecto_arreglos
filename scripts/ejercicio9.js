document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const sudokuGrid = document.getElementById('sudokuGrid');
    const validateBtn = document.getElementById('validateSudokuBtn');
    const clearBtn = document.getElementById('clearSudokuBtn');
    const resultArea = document.getElementById('sudokuResult');
    const resultText = document.getElementById('sudokuResultText');

    // --- CLASE PARA VALIDAR EL SUDOKU ---
    class SudokuValidator {
        constructor(grid) {
            this.grid = grid;
        }

        // Valida un set de 9 números (fila, columna o subgrid)
        isValidSet(set) {
            const numbers = set.filter(num => num >= 1 && num <= 9); // Ignorar ceros
            const uniqueNumbers = new Set(numbers);
            return numbers.length === uniqueNumbers.size; // No debe haber duplicados
        }

        // Valida todas las filas
        validateRows() {
            for (let i = 0; i < 9; i++) {
                if (!this.isValidSet(this.grid[i])) {
                    return { valid: false, message: `Error: Número repetido en la fila ${i + 1}.` };
                }
            }
            return { valid: true };
        }

        // Valida todas las columnas
        validateColumns() {
            for (let j = 0; j < 9; j++) {
                const column = [];
                for (let i = 0; i < 9; i++) {
                    column.push(this.grid[i][j]);
                }
                if (!this.isValidSet(column)) {
                    return { valid: false, message: `Error: Número repetido en la columna ${j + 1}.` };
                }
            }
            return { valid: true };
        }

        // Valida todas las sub-cuadrículas de 3x3
        validateSubgrids() {
            for (let startRow = 0; startRow < 9; startRow += 3) {
                for (let startCol = 0; startCol < 9; startCol += 3) {
                    const subgrid = [];
                    for (let i = startRow; i < startRow + 3; i++) {
                        for (let j = startCol; j < startCol + 3; j++) {
                            subgrid.push(this.grid[i][j]);
                        }
                    }
                    if (!this.isValidSet(subgrid)) {
                        const gridNum = (startRow / 3) * 3 + (startCol / 3) + 1;
                        return { valid: false, message: `Error: Número repetido en la sub-cuadrícula #${gridNum}.` };
                    }
                }
            }
            return { valid: true };
        }

        // Método principal que ejecuta todas las validaciones
        validate() {
            const rowResult = this.validateRows();
            if (!rowResult.valid) return rowResult;

            const colResult = this.validateColumns();
            if (!colResult.valid) return colResult;
            
            const subgridResult = this.validateSubgrids();
            if (!subgridResult.valid) return subgridResult;

            return { valid: true, message: '¡El Sudoku es correcto! Todas las reglas se cumplen.' };
        }
    }

    // --- LÓGICA DE LA INTERFAZ ---

    // Generar el tablero de 81 inputs
    function createSudokuGrid() {
        sudokuGrid.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            
            // Lógica para añadir bordes gruesos
            const row = Math.floor(i / 9);
            const col = i % 9;
            if ((row + 1) % 3 === 0 && row < 8) input.style.borderBottom = '3px solid #343a40';
            if ((col + 1) % 3 === 0 && col < 8) input.style.borderRight = '3px solid #343a40';

            sudokuGrid.appendChild(input);
        }
    }

    validateBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('#sudokuGrid input');
        const grid = [];
        let row = [];

        inputs.forEach((input, index) => {
            // Un valor vacío o inválido se considera como 0
            const value = parseInt(input.value) || 0;
            row.push(value);
            if ((index + 1) % 9 === 0) {
                grid.push(row);
                row = [];
            }
        });

        const validator = new SudokuValidator(grid);
        const result = validator.validate();

        resultArea.style.display = 'block';
        resultText.textContent = result.message;
        resultText.style.color = result.valid ? 'green' : 'red';
    });

    clearBtn.addEventListener('click', () => {
        document.querySelectorAll('#sudokuGrid input').forEach(input => input.value = '');
        resultArea.style.display = 'none';
    });

    // Iniciar la creación del grid al cargar la página
    createSudokuGrid();
});