document.addEventListener('DOMContentLoaded', () => {

    const gradesData = [
        [5.5, 8.6, 10], [8.0, 5.5, 10], [9.0, 4.1, 7.8], [10, 2.2, 8.1],
        [7.0, 9.2, 7.1], [9.0, 4.0, 6.0], [6.5, 5.0, 5.0], [4.0, 7.0, 4.0],
        [8.0, 8.0, 9.0], [10, 9.0, 9.2],  [5.0, 10, 8.4],  [9.0, 4.6, 7.5]
    ];
    
    const analyzeGradesBtn = document.getElementById('analyzeGradesBtn');
    const resultArea = document.getElementById('resultArea');
    const gradesMatrixOutput = document.getElementById('gradesMatrixOutput');
    const studentAveragesList = document.getElementById('studentAveragesList');
    const highestAverage = document.getElementById('highestAverage');
    const lowestAverage = document.getElementById('lowestAverage');
    const failingGradesCount = document.getElementById('failingGradesCount');
    const gradeDistributionList = document.getElementById('gradeDistributionList');

    class GradesAnalyzer {
        constructor(data) {
            this.data = data;
            this.studentAverages = [];
            this.failingPartialsCount = 0;
            this.gradeDistribution = {
                '0-4.9': 0, '5.0-5.9': 0, '6.0-6.9': 0, '7.0-7.9': 0, '8.0-8.9': 0, '9.0-10': 0
            };
        }

        analyze() {
            this.data.forEach(studentGrades => {
                let sum = 0;
                studentGrades.forEach(grade => {
                    sum += grade;
                    if (grade < 7.0) {
                        this.failingPartialsCount++;
                    }
                });
                const average = sum / studentGrades.length;
                this.studentAverages.push(average);
            });

            this.studentAverages.forEach(avg => {
                if (avg < 5.0) this.gradeDistribution['0-4.9']++;
                else if (avg < 6.0) this.gradeDistribution['5.0-5.9']++;
                else if (avg < 7.0) this.gradeDistribution['6.0-6.9']++;
                else if (avg < 8.0) this.gradeDistribution['7.0-7.9']++;
                else if (avg < 9.0) this.gradeDistribution['8.0-8.9']++;
                else this.gradeDistribution['9.0-10']++;
            });
        }

        getHighestAverage() {
            return Math.max(...this.studentAverages);
        }

        getLowestAverage() {
            return Math.min(...this.studentAverages);
        }
    }

    analyzeGradesBtn.addEventListener('click', () => {
        const analyzer = new GradesAnalyzer(gradesData);
        analyzer.analyze();

        gradesMatrixOutput.textContent = gradesData.map(row =>
            row.map(cell => cell.toFixed(1).padStart(5, ' ')).join('')
        ).join('\n');

        studentAveragesList.innerHTML = '';
        analyzer.studentAverages.forEach((avg, index) => {
            const li = document.createElement('li');
            li.textContent = `Alumno ${index + 1}: Promedio ${avg.toFixed(2)}`;
            studentAveragesList.appendChild(li);
        });

        highestAverage.textContent = `Promedio más alto: ${analyzer.getHighestAverage().toFixed(2)}`;
        lowestAverage.textContent = `Promedio más bajo: ${analyzer.getLowestAverage().toFixed(2)}`;
        failingGradesCount.textContent = `Parciales reprobados (menor a 7.0): ${analyzer.failingPartialsCount}`;
        
        gradeDistributionList.innerHTML = '';
        for (const range in analyzer.gradeDistribution) {
            const li = document.createElement('li');
            const count = analyzer.gradeDistribution[range];
            li.textContent = `Rango ${range}: ${count} alumno(s)`;
            gradeDistributionList.appendChild(li);
        }
        
        resultArea.style.display = 'block';
    });
});