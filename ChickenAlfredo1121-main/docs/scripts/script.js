document.addEventListener("DOMContentLoader", () => {
    console.log("We working")

    document.getElementById('btnClicky').addEventListener('click', btnClicky);

 }
);


function btnClicky (){
    console.log("in btnClicky event");
    document.getElementById("btnClicky".style.transForm = 'rotato(15deg)');
    console.log("after rotate");
}

//const btnClicky = document.getElementById('btnClicky'); btnClicky.addEventListener('click', () => { // ...now do DOM stuff })}