//form and inputs
const formEl = document.forms[0];
const selectEl = document.getElementById("konsertSelect");
const antallBilletter = document.getElementById("antallBilletter");
const typeBillet = document.getElementById("typeBillet");

const infoEl = document.getElementById("informationTable");
const outputEl = document.getElementById("output");


const oslo = {by: "Oslo",arena: "Oslo Spektrum",dato: "20.07.2022",ledigePlasserSittende: 45,ledigePlasserStående: 1500,prisStående: 800,prisSittende:750};
const berlin = {by: "Berlin", arena: "Mercedes Benz", dato: "16.02.2023", ledigePlasserSittende: 8500, ledigePlasserStående: 30000, prisStående: 600, prisSittende:500};
const newYork = {by: "New York", arena: "Madison Cube Garden", dato: "13.10.2023", ledigePlasserSittende: 12000, ledigePlasserStående: 3852, prisStående: 950, prisSittende:800}

const konserter = [oslo,berlin,newYork];
 

formEl.addEventListener('submit', function(e) {
    e.preventDefault();

    bestilling()
    //Viser all information om valgt konsert i en tabbel
    infoEl.innerHTML = "<table><tr><th>By</th><th>dato:</th><th>Ledige plasser, sittende</th><th>Ledige plasser, stående</th><th>Pris, sittende</th><th>Pris, stående</th></tr><tr><th>" + konserter[valg].by + "</th><th>" +konserter[valg].dato + "</th><th>"+konserter[valg].ledigePlasserSittende+"</th><th>"+konserter[valg].ledigePlasserStående+"</th><th>"+konserter[valg].prisSittende+"</th><th>"+konserter[valg].prisStående+"</th></tr></table>";

})

//Viser all information om valgt konsert i en tabbel
selectEl.addEventListener('change', function(){
    valg = selectEl.value
    if (valg == "") {
        infoEl.innerHTML = ""
    } else {
        infoEl.innerHTML = "<table><tr><th>By</th><th>dato:</th><th>Ledige plasser, sittende</th><th>Ledige plasser, stående</th><th>Pris, sittende</th><th>Pris, stående</th></tr><tr><th>" + konserter[valg].by + "</th><th>" +konserter[valg].dato + "</th><th>"+konserter[valg].ledigePlasserSittende+"</th><th>"+konserter[valg].ledigePlasserStående+"</th><th>"+konserter[valg].prisSittende+"</th><th>"+konserter[valg].prisStående+"</th></tr></table>";
    }   
});

function bestilling() {
    var billetter = antallBilletter.value
    let msg = "Ugyldig valg av billetter"

    if(selectEl.value != "") { 
        if(typeBillet.value == "sitte") {
            // tester om konserten har nokk billetter
            if (konserter[selectEl.value].ledigePlasserSittende >= billetter) {

                pris = prisCalc(billetter, 0, selectEl.value);
                //lagrer en kvitering
                msg = "Du har kjøpt " + billetter + " billeter for sitte plasser i " + konserter[selectEl.value].arena + " for " + pris + " -,kr"
                konserter[selectEl.value].ledigePlasserSittende -= billetter;
            } else {
                msg = "Sitte billetter er utsolgt";
            }
        }else {
            // tester om konserten har nokk billetter
            if (konserter[selectEl.value].ledigePlasserStående >= billetter) {
                pris = prisCalc(billetter, 1, selectEl.value);
                //lagrer en kvitering
                msg = "Du har kjøpt " + billetter + " billeter for stå plasser i " + konserter[selectEl.value].arena + " for " + pris + " -,kr"
                konserter[selectEl.value].ledigePlasserStående -= billetter;
            } else {
                msg = "Stå billetter er utsolgt";
            }
        }
    }   
    //skriver ut kvitering / error melding
    outputEl.innerHTML = msg;
}

// regner ut pris
function prisCalc(billetter, type, sted) {
    if (type=="0") {
        pris = billetter * konserter[sted].prisSittende;
    } else {
        pris = billetter * konserter[sted].prisStående;
    }
    return pris; 
}