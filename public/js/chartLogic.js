const canvas = document.querySelector('#chart');
const ctx = canvas.getContext('2d');
const dataChangeBtns = document.querySelectorAll(".data-change");
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

        //console.log(data);
        drawGraph(data);

    } catch (error) {
        console.error(error);
    }
}

async function fetchDatabaseData(dateLimit) {
    let jsn = JSON.stringify({dateLimit});
    console.log("Jsn:", jsn);
    try {
        const response = await fetch('/api/databaseData',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: jsn
        });

        if(!response.ok)
            throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        return null;
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

dataChangeBtns.forEach(btn =>{
    btn.addEventListener("click", (e)=>{
        console.log(e.target.closest(".data-change"));
        handleGraphChange(e.target.closest(".data-change"))
    });
});

// TODO: Handle graph change -> dej da sta start in end v dateLimit pobrana iz input.value
//       Morda dodaj se time restriction da ne bo lih 1000rows fetchalo

async function handleGraphChange(button){
    let datelimit =[
        '2025-03-12',
        '2025-03-14'
    ];

    console.log(datelimit);
    console.log("Stringify", JSON.stringify({ datelimit }));

    if(button === dataChangeBtns[1]){
        console.log("graphChangeFetch");
        let data = await fetchDatabaseData(datelimit);
        console.log(data);
    }
}