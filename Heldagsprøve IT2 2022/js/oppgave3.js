const seatsContainerEl = document.getElementById("seats");
const outputEl = document.getElementById("output")
const errorEl = document.getElementById("error");
const formEl = document.forms[0];
const alleReservasjonerEl = document.getElementById("alleReservasjoner")

const navn = formEl.name;
const seteLedig = "vedlegg/seteLedig.png"
const seteReservert = "vedlegg/seteReservert.png"
const seteTatt = "vedlegg/seteTatt.png"

const seats = [
    ["ledig", "ledig", "ledig", "ledig", "ledig", "ledig"],
    ["ledig", "ledig", "ledig", "ledig", "ledig", "ledig"],
    ["ledig", "ledig", "ledig", "ledig", "ledig", "ledig"],
    ["ledig", "ledig", "ledig", "ledig", "ledig", "ledig"],
    ["ledig", "ledig", "ledig", "ledig", "ledig", "ledig"],
];

const bestillinger = [];

//init
let reserverte = 0;
let row = 0
let nr = 0
seatDraw();


formEl.addEventListener('submit', function(e){
    e.preventDefault(); 
    if(navn.value == "") {
        errorEl.innerHTML = "Mangler navn"
    }else {
        errorEl.innerHTML = "Bestilling fullført!"
        bestill()
    }
});
alleReservasjonerEl.addEventListener("click", reservasjoner);

function reservasjoner() {
    outputEl.innerHTML = ""
    for (var i=0; i < bestillinger.length; i++) {
        var pTag = document.createElement("p");
        var textNode = document.createTextNode("Bestilling "+i+": er under "+bestillinger[i].navn+" og reserverte "+ bestillinger[i].reserverte + " seter");
        pTag.appendChild(textNode);
        outputEl.appendChild(pTag);
    }
}




function seatDraw(){       
    seatsContainerEl.innerHTML = ""
    for (var i=0; i<seats.length;i++) {
        let rowDivTag = document.createElement("div");
        for(var z=0;z<seats[i].length; z++) {

            let imgTag = document.createElement("img");
            if (seats[i][z] == "ledig") {
                imgTag.setAttribute("src", seteLedig);
            } else if (seats[i][z] == "reservert"){
                imgTag.setAttribute("src", seteReservert);
            } else {
                imgTag.setAttribute("src", seteTatt);
            }
            imgTag.setAttribute("value", "rad: " + (i) + " nr: " + z);
            imgTag.setAttribute("class", "stol");
            imgTag.setAttribute("id", "rad:"+i+"nr:"+z);

            rowDivTag.appendChild(imgTag);
        }
        seatsContainerEl.appendChild(rowDivTag);
    }
    var stoler = document.getElementsByClassName("stol");
    for (var i=0; i<stoler.length; i++) {
        stoler[i].addEventListener("click", reserver);
    }
}

function reserver(e) {
    var row = e.target.id[4];
    var nr = e.target.id[8]
    if (seats[row][nr] == "ledig") {
        seats[row][nr] = "reservert"
    } else if (seats[row][nr] == "reservert") {
        seats[row][nr] = "ledig"
    }
    seatDraw();
}

function bestill() {
    let reserverte = 0;
    for (var i=0; i<seats.length; i++) {
        for (var z=0; z<seats[i].length; z++) {
            if (seats[i][z] == "reservert") {
                reserverte++;
                seats[i][z] = "tatt";
            }
        }
    }
    if (reserverte != 0) {
        bestilling = {navn: navn.value, reserverte: reserverte}
        bestillinger.push(bestilling)
    } else {
        errorEl.innerHTML = "Mangler reservationer!"
    }
    seatDraw();
}

