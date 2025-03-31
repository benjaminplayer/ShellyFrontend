const menuBtns = document.querySelectorAll('.menu-toggle');
const startEndInp = document.querySelectorAll('.data-dates');
const dropDownButton = document.querySelector('.select-btn');
const dropDownOptions = document.querySelectorAll('.option');
const dropDownTitleSpan = dropDownButton.children[0];
const lightDarkModeSwitch = document.querySelector('.light-dark-toggle');
const dropdownToggle = document.querySelector('.options-toggle-container').children[0];
const githubImageContainer = document.querySelector('.github-icon-holder');
const githubDark = `<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>`;
const githubLight = `<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/></svg>`;
const nodeImage = document.querySelector('.node-logo');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
const html = document.querySelector('html');
const chart = document.querySelector('#chart');
let selectedOption = '';

console.log(menuBtns);

overlay.addEventListener("click", ()=>{
    if(dropDownButton.classList.contains('toggled')){
        dropDownButton.classList.toggle('toggled');
        dropDownButton.parentNode.children[1].classList.toggle('active');
    }

    if(dropdownToggle.closest('.options-toggle-container').classList.contains('active')){
        dropdownToggle.closest('.options-toggle-container').children[1].classList.toggle('active');
        dropdownToggle.closest('.options-toggle-container').classList.toggle('active');
    }

});

lightDarkModeSwitch.addEventListener("click", ()=>{
    body.classList.toggle('darkmode');

    if(body.classList.contains('darkmode')){
        nodeImage.setAttribute('src','icons/nodejsLight.svg');
        githubImageContainer.innerHTML = githubLight;

    }else{
        nodeImage.setAttribute('src','icons/nodejsDark.svg');
        githubImageContainer.innerHTML = githubDark;
    }
});

dropdownToggle.addEventListener("click", (e) =>{
    e.target.closest('.options-toggle-container').children[1].classList.toggle('active');
    e.target.closest('.options-toggle-container').classList.toggle('active');
});

dropDownButton.addEventListener("click", () =>{
    dropDownButton.classList.toggle('toggled');
    dropDownButton.parentNode.children[1].classList.toggle('active');
});

dropDownOptions.forEach(option => {
    option.addEventListener("click", (e) =>{
        console.log(e.target.closest('.option'));
        let opt = e.target.closest('.option');
        if(opt.classList.contains('cph')){
            selectedOption = 'cph';
            dropDownTitleSpan.innerHTML = opt.children[0].innerHTML;
        }   
        else if(opt.classList.contains('apower')){
            selectedOption = 'apower';
            dropDownTitleSpan.innerHTML = opt.children[0].innerHTML;
        }
        else if(opt.classList.contains('tarrif')){
            selectedOption = 'tarrif'
            dropDownTitleSpan.innerHTML = opt.children[0].innerHTML;
        }
        else
            selectedOption = '';

        dropDownButton.classList.toggle('toggled');
        dropDownButton.parentNode.children[1].classList.toggle('active');

        console.log(selectedOption);

    });
});

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
    isMobile();
}

function validate(){
    let startDate = new Date(startEndInp[0].value);
    let endDate = new Date(startEndInp[1].value);
    console.log(startDate < endDate);
    
    if(startDate > endDate){
        startEndInp[1].value = "";
    }

}

var lineType = "line";
const lineTypes = ["line","step","bar"];

const slider = document.getElementById("slider");
const buttons = document.querySelectorAll(".toggle-btn");

function moveSlider(index){
    const offset = index * 50;
    const offset2 = index * -10 +5;

    slider.style.left = `calc(`+offset+"% + "+offset2+"px)";

    buttons.forEach((btn, idx) => {
        btn.classList.toggle("active", idx === index);
    });

    lineType = lineTypes[index];
}

// TODO: Naredi graph switch verification

//bar, line
const icons = [`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z"/></svg>`,`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z"/></svg>`];
//spremeni na 1 k izbrises step
const toggleBtnText = [buttons[0].innerHTML,buttons[1]];
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isMobile()) {
    console.log("User is on a phone!");
    body.classList.toggle('phone');
    html.classList.toggle('phone');
    chart.setAttribute('width',350)
    chart.setAttribute('height', 400);

    buttons[0].innerHTML = icons[1];
    buttons[1].innerHTML = icons[0];

} else {
    console.log("User is on a desktop or tablet.");
}