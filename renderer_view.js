// Création d'objets venant de librairies
const { ipcRenderer } = require('electron')
const mysql = require('mysql2');
const querystring = require('querystring');

// Récupération des elements de view.html
const view_bouton_modifier = document.getElementById("view-modifier")
const view_bouton_supprimer = document.getElementById("view-supprimer")
const titre = document.getElementById("view-titre")
const date_debut = document.getElementById("view-date-debut")
const date_fin = document.getElementById("view-date-fin")
const lieu = document.getElementById("view-lieu")
const categorie = document.getElementById("view-categorie")
const statut = document.getElementById("view-statut")
const description = document.getElementById("view-description")
const transparence = document.getElementById("view-transparence")

// Récupère les infos passées dans l'url
let query = querystring.parse(global.location.search);
// Problème bizarre, au moment de la récupération, je récupère mes dates avec un jour de moins

// Transforme la query des données en objet JSON
let data = JSON.parse(query['?data'])

// Sépare la date du début pour chaque tiret (-)
let makeDateDeb = data["date_deb"].split("-")

// Créer la date du début en objet Date
let maNewDateDeb = new Date(parseInt(makeDateDeb[0]), parseInt(makeDateDeb[1])-1, parseInt(makeDateDeb[2])+1)

// Sépare la date de fin pour chaque tiret (-)
let makeDateFin = data["date_fin"].split("-")

// Créer la date de fin en objet Date
let maNewDateFin = new Date(parseInt(makeDateFin[0]), parseInt(makeDateFin[1])-1, parseInt(makeDateFin[2])+1)

//modif possible: Changer l'affichage de la date avec une fonction qui retourne un tableau jour/mois en français

// Affichage des données à propos de l'evenement
titre.innerText = data["titre"]
date_debut.innerHTML = maNewDateDeb.toString().slice(0,15)
date_fin.innerHTML = maNewDateFin.toString().slice(0,15)
lieu.innerHTML += data["location"]
categorie.innerHTML += data["categorie"]
statut.innerHTML += data["statut"]
description.innerHTML += data["description"]
transparence.innerHTML += data["transparence"]

// Si on clique sur le bouton supprimer
view_bouton_supprimer.addEventListener("click", () =>{
    if(confirm("Etes-vous sûr de vouloir supprimer l\'evenement ?")){
        supprimeEvent(data["id"], function(err,result,fields){
            if(err) throw err;
            ipcRenderer.invoke("event-view-close")
        })
    }
})

// Si on click sur le bouton modifier
view_bouton_modifier.addEventListener("click", () =>{
    ipcRenderer.invoke("event-edit", data)
})

/*
** Fonction supprimeEvent
** Supprime un evenement
** Paramètres d'entrés: id => l'id de l'evenement, cb => fonction de callback
** Retourne : rien
*/
function supprimeEvent(id, cb){
    ConnexionBdd()
    let query = "DELETE FROM event WHERE id=?"
    connection.query(query, [id], cb)
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