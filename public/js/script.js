const menuBtns = document.querySelectorAll('.menu-toggle');
const startEndInp = document.querySelectorAll('.data-dates')
console.log(menuBtns);

menuBtns.forEach(btn =>{
    if(btn === menuBtns[menuBtns.length-2]){}
    else{
        btn.addEventListener("click", (e) => {
            openMenu(e);
        });
    }
});

startEndInp.forEach(input => {
    input.addEventListener("input", (e) =>{
        handleDateInput(e);
    })
});

function openMenu(e){
    let button = e.target.closest(".menu-toggle");
    button.classList.toggle("active");
    button.parentNode.children[1].classList.toggle("active");
}

function handleDateInput(e){
    let input = e.target
    console.log(input.id);
    if(input.id == "data-start-date"){
        limitDate(input);
    }
    console.log(input.value); //retruns a string
}

function limitDate(input){
    if(input.value.length === 0){
        startEndInp[1].removeAttribute("min");
        return;
    };
    let date = new Date(input.value);
    console.log(date.toLocaleDateString());
    if(input.value !== null)
    {
        date = incDay(date);
    }else
        return;

    console.log(date.toLocaleDateString());

    let dateStr = date.toISOString();

    if(input.value.length === 0)
        if(startEndInp[1].hasAttribute("min"))
            startEndInp[1].removeAttribute("min");

    startEndInp[1].setAttribute("min",dateStr.substring(0,10));

    function incDay(date){
        let day = date.toLocaleDateString();
        day = parseInt(day.substring(0,2)) + 1;
        console.log(day);
        let month = date.getMonth() +1;

        console.log(month);

        let year = date.getFullYear();

        return new Date(year+"-"+month+"-"+day);
    }
    validate();
}

window.onload = () =>{
    limitDate(startEndInp[0]);
}

function validate(){
    let startDate = new Date(startEndInp[0].value);
    let endDate = new Date(startEndInp[1].value);
    console.log(startDate < endDate);
    
    if(startDate > endDate){
        startEndInp[1].value = "";
    }

}

// TODO: Naredi graph switch verification