const { ipcRenderer } = require('electron')
const mysql = require('mysql2');
const querystring = require('querystring');
const view_bouton_modifier = document.getElementById("view-modifier")
const titre = document.getElementById("view-titre")
const date_debut = document.getElementById("view-date-debut")
const date_fin = document.getElementById("view-date-fin")
const lieu = document.getElementById("view-lieu")
const categorie = document.getElementById("view-categorie")
const statut = document.getElementById("view-statut")
const description = document.getElementById("view-description")
const transparence = document.getElementById("view-transparence")

let query = querystring.parse(global.location.search);
let data = JSON.parse(query['?data'])

let makeDateDeb = data["date_deb"].split("-")
let maNewDateDeb = new Date(parseInt(makeDateDeb[0]), parseInt(makeDateDeb[1]), parseInt(makeDateDeb[2])+1)
let maNewDateDebFormatValue = maNewDateDeb.getFullYear()+"-"+checkInferieur10(maNewDateDeb.getMonth())+"-"+checkInferieur10(maNewDateDeb.getDate())
let makeDateFin = data["date_fin"].split("-")
let maNewDateFin = new Date(parseInt(makeDateFin[0]), parseInt(makeDateFin[1]), parseInt(makeDateFin[2])+1)
let maNewDateFinFormatValue = maNewDateFin.getFullYear()+"-"+checkInferieur10(maNewDateFin.getMonth())+"-"+checkInferieur10(maNewDateFin.getDate())
let id = data["id"]
let nbMaj = data["nbMaj"]

titre.setAttribute("value",data["titre"])
date_debut.setAttribute("value",maNewDateDebFormatValue)
date_fin.setAttribute("value",maNewDateFinFormatValue)
lieu.setAttribute("value",data["location"])
categorie.setAttribute("value",data["categorie"])
statut.setAttribute("value",data["statut"])
description.innerHTML = data["description"]
transparence.setAttribute("value",data["transparence"])
 

view_bouton_modifier.addEventListener("click", () =>{
    if(confirm("Etes-vous sûr de vouloir modifier l\'evenement ?")){
        updateEvent(date_debut.value, date_fin.value, titre.value, lieu.value, categorie.value, statut.value, description.value, transparence.value, nbMaj, id, function(err,result,fields){
            if(err) throw err;
            ipcRenderer.invoke("event-edit-close")
        })
    }
})

function checkInferieur10(mois_ou_jour){
    if(mois_ou_jour < 10){
        mois_ou_jour = "0"+mois_ou_jour
    }
    return mois_ou_jour;
}

function ConnexionBdd(){
    // create the connection to database
    return connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: null,
        database: 'electron_projet'
        });
}

function updateEvent(date_debut, date_fin, titre, lieu, categorie, statut, description, transparence, nbMaj, id, cb){
    ConnexionBdd()
    nbMaj += 1
    let query = "UPDATE event SET `date_deb` = ?, `date_fin` = ?, `titre` = ?, `location` = ?, `categorie` = ?, `statut` = ?, `description` = ?, `transparence` = ?, `nbMaj` = ? WHERE id = ?"
    connection.query(query, [date_debut, date_fin, titre, lieu, categorie, statut, description, transparence, nbMaj, id], cb)
}