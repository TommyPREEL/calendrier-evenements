// Création d'objets venant de librairies
const { ipcRenderer } = require('electron')
const mysql = require('mysql2');
const querystring = require('querystring');

// Récupération des elements de edit.html
const edit_bouton_modifier = document.getElementById("edit-modifier")
const titre = document.getElementById("edit-titre")
const date_debut = document.getElementById("edit-date-debut")
const date_fin = document.getElementById("edit-date-fin")
const lieu = document.getElementById("edit-lieu")
const categorie = document.getElementById("edit-categorie")
const statut = document.getElementById("edit-statut")
const description = document.getElementById("edit-description")
const transparence = document.getElementById("edit-transparence")

// Récupère les infos passées dans l'url
let query = querystring.parse(global.location.search);

// Transforme la query des données en objet JSON
let data = JSON.parse(query['?data'])

// Sépare la date du début pour chaque tiret (-)
let makeDateDeb = data["date_deb"].split("-")

// Créer la date du début en objet Date
let maNewDateDeb = new Date(parseInt(makeDateDeb[0]), parseInt(makeDateDeb[1]), parseInt(makeDateDeb[2])+1)

// Transforme la date du début en date voulue
let maNewDateDebFormatValue = maNewDateDeb.getFullYear()+"-"+checkInferieur10(maNewDateDeb.getMonth())+"-"+checkInferieur10(maNewDateDeb.getDate())

// Sépare la date de fin pour chaque tiret (-)
let makeDateFin = data["date_fin"].split("-")

// Créer la date de fin en objet Date
let maNewDateFin = new Date(parseInt(makeDateFin[0]), parseInt(makeDateFin[1]), parseInt(makeDateFin[2])+1)

// Transforme la date de fin en date voulue
let maNewDateFinFormatValue = maNewDateFin.getFullYear()+"-"+checkInferieur10(maNewDateFin.getMonth())+"-"+checkInferieur10(maNewDateFin.getDate())

// Récupération de l'id
let id = data["id"]

//Récupération du nombre de mise à jour
let nbMaj = data["nbMaj"]

// Affichage des données à propos de l'evenement
titre.setAttribute("value",data["titre"])
date_debut.setAttribute("value",maNewDateDebFormatValue)
date_fin.setAttribute("value",maNewDateFinFormatValue)
lieu.setAttribute("value",data["location"])
categorie.setAttribute("value",data["categorie"])
statut.setAttribute("value",data["statut"])
description.innerHTML = data["description"]
transparence.setAttribute("value",data["transparence"])
 
// Si on clique sur le bouton modifier
edit_bouton_modifier.addEventListener("click", () =>{
    if(confirm("Etes-vous sûr de vouloir modifier l\'evenement ?")){
        updateEvent(date_debut.value, date_fin.value, titre.value, lieu.value, categorie.value, statut.value, description.value, transparence.value, nbMaj, id, function(err,result,fields){
            if(err) throw err;
            ipcRenderer.invoke("event-edit-close")
        })
    }
})

/*
** Fonction checkInferieur10
** Ajoute un 0 si le mois ou le jour entré est inférieur à 10
** Paramètres d'entrés: mois_ou_jour => int
** Retourne : mois_ou_jour => string
*/
function checkInferieur10(mois_ou_jour){
    if(mois_ou_jour < 10){
        mois_ou_jour = "0"+mois_ou_jour
    }
    return mois_ou_jour;
}

/*
** Fonction ConnexionBdd
** Se connecte à la base de données
** Paramètres d'entrés: rien
** Retourne : connection => objet mysql connecté
*/
function ConnexionBdd(){
    // create the connection to database
    return connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: null,
        database: 'electron_projet'
        });
}

/*
** Fonction updateEvent
** Modifie un evenement et ajoute 1 à NbMaj
** Paramètres d'entrés:
*** date_debut => date du début de l'evenement
*** date_fin => date de fin de l'evenement
*** titre => titre de l'evenement
*** lieu => lieu de l'evenement
*** categorie => categorie de l'evenement
*** statut => statut de l'evenement
*** description => description de l'evenement
*** transparence => transparence de l'evenement
*** nbMaj => nb de maj de l'event
*** id => id de l'event
*** cb => fonction de callback
** Retourne : rien
*/
function updateEvent(date_debut, date_fin, titre, lieu, categorie, statut, description, transparence, nbMaj, id, cb){
    ConnexionBdd()
    nbMaj += 1
    let query = "UPDATE event SET `date_deb` = ?, `date_fin` = ?, `titre` = ?, `location` = ?, `categorie` = ?, `statut` = ?, `description` = ?, `transparence` = ?, `nbMaj` = ? WHERE id = ?"
    connection.query(query, [date_debut, date_fin, titre, lieu, categorie, statut, description, transparence, nbMaj, id], cb)
}