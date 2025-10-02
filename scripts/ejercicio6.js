document.addEventListener('DOMContentLoaded', () => {

    const salesData = [
        [5, 16, 10, 12, 24], [40, 55, 10, 11, 18], [15, 41, 78, 14, 51],
        [35, 22, 81, 15, 12], [50, 12, 71, 10, 20], [70, 40, 60, 28, 22],
        [50, 50, 50, 36, 25], [40, 70, 40, 11, 20], [20, 20, 30, 12, 18],
        [10, 40, 32, 13, 16], [50, 3, 24, 15, 82],  [40, 46, 15, 46, 22]
    ];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    const analyzeSalesBtn = document.getElementById('analyzeSalesBtn');
    const resultArea = document.getElementById('resultArea');
    const salesMatrixOutput = document.getElementById('salesMatrixOutput');
    const minSaleResult = document.getElementById('minSaleResult');
    const maxSaleResult = document.getElementById('maxSaleResult');
    const totalSaleResult = document.getElementById('totalSaleResult');
    const dailySalesList = document.getElementById('dailySalesList');

    class SalesAnalyzer {
        constructor(data) {
            this.data = data;
            this.minSale = { value: Infinity, month: -1, day: -1 };
            this.maxSale = { value: -Infinity, month: -1, day: -1 };
            this.totalSale = 0;
            this.dailySales = Array(data[0].length).fill(0);
        }

        analyze() {
            for (let i = 0; i < this.data.length; i++) { // i = month
                for (let j = 0; j < this.data[i].length; j++) { // j = day
                    const sale = this.data[i][j];
                    this.totalSale += sale;
                    this.dailySales[j] += sale;

                    if (sale < this.minSale.value) {
                        this.minSale = { value: sale, month: i, day: j };
                    }
                    if (sale > this.maxSale.value) {
                        this.maxSale = { value: sale, month: i, day: j };
                    }
                }
            }
        }
    }

    
    function formatCurrency(value) {
        return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    }

    analyzeSalesBtn.addEventListener('click', () => {
        const analyzer = new SalesAnalyzer(salesData);
        analyzer.analyze();

        salesMatrixOutput.textContent = salesData.map(row => 
            row.map(cell => String(cell).padStart(5, ' ')).join('')
        ).join('\n');

        minSaleResult.innerHTML = `<strong>Menor venta:</strong> ${formatCurrency(analyzer.minSale.value)} (Mes: ${months[analyzer.minSale.month]}, Día: ${days[analyzer.minSale.day]})`;
        maxSaleResult.innerHTML = `<strong>Mayor venta:</strong> ${formatCurrency(analyzer.maxSale.value)} (Mes: ${months[analyzer.maxSale.month]}, Día: ${days[analyzer.maxSale.day]})`;
        totalSaleResult.innerHTML = `<strong>Venta total anual:</strong> ${formatCurrency(analyzer.totalSale)}`;

        dailySalesList.innerHTML = ''; // Limpiar lista
        analyzer.dailySales.forEach((total, index) => {
            const li = document.createElement('li');
            li.textContent = `${days[index]}: ${formatCurrency(total)}`;
            dailySalesList.appendChild(li);
        });

        resultArea.style.display = 'block';
    });
});