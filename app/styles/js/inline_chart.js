const ctx = document.getElementById('inlineChart');
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
    datasets: [{
        label: 'Monthly Earnings',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#127528',
        backgroundColor:'#002F0A',
        tension: 0.1
    }]
};
const config = {
    type: 'line',
    data: data,
};
Chart.defaults.color = '#9ea79f';
new Chart(ctx, config);