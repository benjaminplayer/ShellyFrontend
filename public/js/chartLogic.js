const canvas = document.querySelector('#chart');
const ctx = canvas.getContext('2d');
let chart;
let chartTypeButtons = document.getElementsByName('chartType');
let chartDisplay = document.getElementsByName('chartType');
let colorChooser = document.getElementById('lineColor');
let timeSlider = document.querySelector('#timeframe');
let valueSpan = document.querySelector('.refreshValue');
let lineType = 'line';
let refreshRate = 10;
let intervalId;

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();

        console.log(data);
        drawGraph(data);

    } catch (error) {
        console.error(error);
    }
}
function drawGraph(data){
    if(!chart){
        chart = new Chart(ctx, {
            type: lineType,
            data:{
                labels: [data.time], //x os
                datasets:[{
                    label: 'Cost per hour[€]', //ime crte
                    data: [data.costPerHour], //y os
                    borderColor: '#2278ff',
                    backgroundColor: '#2278ff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false

            },
            scales: {
                y:{
                    min: 0,
                }
            }
        });
    }

    else{
        chart.config.type = lineType;
        chart.data.labels.push(data.time);
        chart.data.datasets[0].data.push(data.costPerHour);
        chart.update();
    }
}


function startInterval(){
    if(intervalId) clearInterval(intervalId);
    intervalId = setInterval(fetchData, (refreshRate*1000));
}

fetchData();
startInterval();

timeSlider.addEventListener('input', () =>{
    refreshRate = parseInt(timeSlider.value, 10);
    valueSpan.innerHTML = refreshRate +"s";
    startInterval();
})

chartDisplay.forEach(button => {
    button.addEventListener('input', () =>{
        lineType = button.id;
        console.log(lineType);
    });
});


function checkDataDisplayType(){
    for(let i = 0; i < chartDisplay.length; i++){
        if(chartDisplay[i].checked){
            return chartDisplay[i].id
        }
    }
    return "CPH";
}