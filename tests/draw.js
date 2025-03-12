document.addEventListener('DOMContentLoaded', function() {
    var currencyNames = [];
    var currencyValues = [];

    document.querySelectorAll('.currencies_grafs li').forEach(function(item) {
        // Получаем первый и второй элемент h6 в каждом li
        var h6Elements = item.querySelectorAll('h6');
        if (h6Elements.length < 2) {
            console.error('Not enough h6 elements found in li.');
            return;
        }

        var name = h6Elements[0].textContent.split('/')[0]; // Извлекаем название
        var value = parseFloat(h6Elements[1].textContent); // Извлекаем числовое значение

        currencyNames.push(name);
        currencyValues.push(value);
    });

    var ctx = document.getElementById('myChart');
    if (!ctx) {
        console.error('Canvas element not found.');
        return;
    }

    var myChart = new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: currencyNames,
            datasets: [{
                label: 'Значение валюты',
                data: currencyValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(199, 199, 199, 0.2)',
                    'rgba(83, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
});
