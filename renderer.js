// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
/*
const bt_test = document.getElementById("bt-test")
const test_inner = document.getElementById("test-inner")
const calendar = document.getElementById("calendar")
const line_prev_month_next = document.getElementById("prev-month-next")
let date = new Date()

bt_test.addEventListener("click", () => {
    test_inner.innerHTML += date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
    line_prev_month_next.innerHTML += "actual_month ";
    
  })

// Previous month button
bt_test.addEventListener("click", () => {
    test_inner.innerHTML += date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
  
})*/

/*// Next month button
bt_test.addEventListener("click", () => {
    test_inner.innerHTML += date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
  
})

// Reset the calendar
calendar.innerHTML = "";

// Initialization of each element to create
let prev_month_next = document.createElement("p");
let ligne = document.createElement("tr");
let caseMonday = document.createElement("td");
let caseTuesday = document.createElement("td");
let caseWednesday = document.createElement("td");
let caseThursday = document.createElement("td");
let caseFriday = document.createElement("td");
let caseSaturday = document.createElement("td");
let caseSunday = document.createElement("td");

/*for()
switch(date.getDay()){
    // Sunday
    case 0:

        break;
}
//actual_month = date.getMonth + 1
caseMonday.innerHTML = date.getMonth()+1 //date.getDate()
//caseMonday.innerHTML = date.getDay()//date.getDate()
//ligne.appendChild(caseMonday)
ligne.appendChild(caseMonday)
calendar.appendChild(ligne)

// je recupere le mois actuel
//actual_month = date.getMonth()+1
//
// pour tous les jours du mois (de 0 à 31)
//date.setMonth(actual_month)


var monthStart = new Date(date.getFullYear(), date.getMonth()+1, 1);
var monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth()+2, 1);
var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)

/*for(let i = 1; i<=monthLength;i++){
    switch(la date.getDay()) du jour[0]

}


ligne.appendChild()
caseMonday.innerHTML = monthLength
ligne.appendChild(caseMonday)
calendar.appendChild(ligne)

// récupérer la date du jour
// en extraire le mois
let actual_month = date.getMonth()+1
// extraire l'année
let actual_year = date.getFullYear()
// afficher en haut le mois et l'année (plus les boutons précédent et suivant)
line_prev_month_next.innerHTML = ""
line_prev_month_next.innerHTML += "actual_month "


// line_prev_month_next.appendChild(prev_month_next)


// afficher les jours du mois//
// récupérer le numéro du jour de la semaine du premier jour du mois
// boucle for de 0 à 1er jour du mois, ajout d'une div grisée
// récupère le numéro du dernier jour du mois (28,29,30 ou 31)
// boucle for de 0 à dernier jour du mois et on ajoute une div avec le numéro du jour 
// récupère le numéro de jour dans la semaine du dernier jour du mois
// boucle for de numéro de jour dans la semaine du dernier jour jusqu'a 7 et on ajoute une div grisée
// si on change de mois, on redemande l'affichage du mois pour le nouveau mois 

*/



/*const app = document.getElementById("app")
function displayCalendar(date) {

    let firstDayOfMonth = new Date(date)
    firstDayOfMonth.setDate(1)
    let numFirstDayOfMonth = firstDayOfMonth.getDay()
    if (numFirstDayOfMonth == 0) numFirstDayOfMonth = 7
    let month = d.getMonth();
    let numberOfDaysByMonth = new Date(d.getFullYear(), month + 1, 0);
    let numNumberOfDaysOfMonth = numberOfDaysByMonth.getDate()
    let numLastDayOfMonth = numberOfDaysByMonth.getDay()
    if (numLastDayOfMonth == 0) numLastDayOfMonth = 7

    for (let i = 1; i < numFirstDayOfMonth; i++) {
        ajouteCaseGrise()
    }
    for (let i = 1; i <= numNumberOfDaysOfMonth; i++) {
        ajouteCaseActive(i)
    }
    for (let i = numLastDayOfMonth; i < 7; i++) {
        ajouteCaseGrise()
    }

}
function ajouteCaseGrise() {
    let elem = document.createElement("div")
    elem.className = "caseInactive"
    app.appendChild(elem)
}
function ajouteCaseActive(num) {
    let elem = document.createElement("div")
    elem.className = "caseActive"
    elem.innerHTML = num
    app.appendChild(elem)
}

let myDate = new Date()
myDate.setMonth(7)
displayCalendar(myDate)
*/

let events = {
    "id": "",
    "date_deb": "",
    "date_fin": "",
    "titre": "",
    "location": "",
    "categorie": "",
    "statut": "",
    "description": "",
    "transparence": "",
    "nbMaj": ""
}
const { ipcRenderer } = require('electron')
const mainApp = document.getElementById("app")
const calendrier_mois_actuel = document.getElementById("calendrier-mois-actuel")
const mois_precedent = document.getElementById("mois-precedent")
const mois_actuel = document.getElementById("mois-actuel")
const mois_suivant = document.getElementById("mois-suivant")
const bt_creer_evenement = document.getElementById("bt-creer-evenement")
let mysql = require('mysql2');


mois_suivant.addEventListener("click", () => {

    maDate.setMonth(maDate.getMonth()+1)
    afficheMoisAnnee(maDate)
    afficheCalendrier(maDate)
})

mois_precedent.addEventListener("click", () => {

    maDate.setMonth(maDate.getMonth()-1)
    afficheMoisAnnee(maDate)
    afficheCalendrier(maDate)
})

bt_creer_evenement.addEventListener("click", () => {
    ipcRenderer.invoke("event-add").then(res => {
        console.log(res);
    })
})

function afficheCalendrier(d) {
    mainApp.innerHTML = "";
    let premierJourDuMois = new Date(d)
    premierJourDuMois.setDate(1)
    let numPremierJourDuMois = premierJourDuMois.getDay()
    if (numPremierJourDuMois == 0) numPremierJourDuMois = 7
    let month = d.getMonth();
    let nombreDeJourMois = new Date(d.getFullYear(), month + 1, 0);
    console.log(nombreDeJourMois);
    let numNombreJourDuMois = nombreDeJourMois.getDate()
    let numDernierJourDuMois = nombreDeJourMois.getDay()
    if (numDernierJourDuMois == 0) numDernierJourDuMois = 7
    let res;
    getAllEvents(d, function(err, rows, fields){   
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
        }
        else{
            console.log("Query succesfully executed", rows);
            res = rows
            for (let i = 1; i < numPremierJourDuMois; i++) {
                ajouteCaseGrise()
            }
            for (let i_jdm = 1; i_jdm <= numNombreJourDuMois; i_jdm++) {
                ajouteCaseActive(i_jdm)
                console.log(res)
                for(let i in res){
                    if(res[i]["date_deb"].getDate() == i_jdm)
                    {
                        afficheEvent(res[i],i_jdm)
                    }
                }
            }
            for (let i = numDernierJourDuMois; i < 7; i++) {
                ajouteCaseGrise()
            }
        }
    })

}
function ajouteCaseGrise() {
    let elem = document.createElement("div")
    elem.className = "caseInactive"
    mainApp.appendChild(elem)
}
function ajouteCaseActive(num) {
    let elem = document.createElement("div")
    elem.className = "caseActive"
    elem.setAttribute("id", "caseActive" + num)
    elem.innerHTML = num
    mainApp.appendChild(elem)
}
function afficheEvent(event, caseCalendrier){
    let elem = document.createElement("div")
    elem.className = "event"
    elem.setAttribute("id", "event")
    elem.innerHTML = event["titre"]
    console.log(elem)
    document.getElementById("caseActive"+caseCalendrier).appendChild(elem)
    
}

function afficheMoisAnnee(date){
    let mois = date.getMonth()+1
    
    switch(mois){
        case 1: mois_actuel.innerHTML = "Janvier " + date.getFullYear()
        break;

        case 2: mois_actuel.innerHTML = "Février " + date.getFullYear()
        break;

        case 3: mois_actuel.innerHTML = "Mars " + date.getFullYear()
        break;

        case 4: mois_actuel.innerHTML = "Avril " + date.getFullYear()
        break;

        case 5: mois_actuel.innerHTML = "Mai " + date.getFullYear()
        break;

        case 6: mois_actuel.innerHTML = "Juin " + date.getFullYear()
        break;

        case 7: mois_actuel.innerHTML = "Juillet " + date.getFullYear()
        break;

        case 8: mois_actuel.innerHTML = "Aout " + date.getFullYear()
        break;

        case 9: mois_actuel.innerHTML = "Septembre " + date.getFullYear()
        break;

        case 10: mois_actuel.innerHTML = "Octobre " + date.getFullYear()
        break;

        case 11: mois_actuel.innerHTML = "Novembre " + date.getFullYear()
        break;

        case 12: mois_actuel.innerHTML = "Decembre " + date.getFullYear()
        break;
    }
}




//connexion bdd
// get the client


function ConnexionBdd(){
    // create the connection to database
    return connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: null,
        database: 'electron_projet'
        });
}



function getAllEvents(date, cb){
    ConnexionBdd()
    let month = date.getMonth()+1
    if(month<10){month = "0"+month}
    let fullDatePurcent = date.getFullYear()+"-"+month+"%";
    let query = 'SELECT * FROM event WHERE date_deb LIKE ?';
    let res = {};
        connection.query(query,[fullDatePurcent], cb)


    //return rows;
}



/*for(let i = 0; i<rows.length; i++)
{
    rows[i]["date_deb"].getFullYear()
}*/



function defineDate(date){
    return dateBdd.getMonth()
    /*tabDate = dateBdd.split(' ');
    let mois;
    switch(tabDate[1]){
        case "Jan": mois = 1
        break;

        case "Feb": mois = 2
        break;

        case "Mar": mois = 3
        break;

        case "Apr": mois = 4
        break;

        case "May": mois = 5
        break;

        case "Jun": mois = 6
        break;

        case "Jul": mois = 7
        break;

        case "Aug": mois = 8
        break;

        case "Sep": mois = 9
        break;

        case "Oct": mois = 10
        break;

        case "Nov": mois = 11
        break;

        case "Dec": mois = 12
        break;
    }
    return {
        "jour": tabDate[2],
        "mois": mois,
        "annee": tabDate[3]
    }*/
}









let maDate = new Date()
maDate.setMonth(maDate.getMonth())
afficheCalendrier(maDate)
afficheMoisAnnee(maDate)
console.log(getAllEvents(maDate))