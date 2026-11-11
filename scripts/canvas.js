function initGraph(id, title) {
    var chrt = document.getElementById(id);
    var graph = new Chart(chrt, {
        type: 'line',
        backgroundColor: 'rgba(29, 78, 216, 0.2)',
        data: {
            labels: [],
            datasets: [{
                tension: 0.4,
                cubicInterpolationMode: 'monotone',
                fill: true
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               title: {
                  display: false,
                  text: title,
                  color: 'navy',
                  position: 'bottom',
                  align: 'center',
                  font: {
                     weight: 'bold'
                  },
                  padding: 8,
                  fullSize: true,
               }
            },
            
        },
    });

    return graph;
}


function updateGraph(chart, data){
    var dataset = chart.data.datasets[0];
    chart.data.labels = [];
    dataset.data = [];
    data.forEach((newData) =>{
        chart.data.labels.push(newData.key);
        dataset.data.push(newData.value);
    });
    dataset.cubicInterpolationMode = 'monotone',
    dataset.tension = 0.4
    dataset.label = "Valószínűségi amplitudó"
    

    chart.update();

}