// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// Création d'objets venant de librairies
const { ipcRenderer } = require('electron')
const mysql = require('mysql2');

// Récupération des elements de l'index.html
const mainApp = document.getElementById("app")
const mois_precedent = document.getElementById("mois-precedent")
const mois_actuel = document.getElementById("mois-actuel")
const mois_suivant = document.getElementById("mois-suivant")
const bt_creer_evenement = document.getElementById("bt-creer-evenement")


// Si on clique sur la fleche à droite du mois
mois_suivant.addEventListener("click", () => {
    maDate.setMonth(maDate.getMonth()+1)
    afficheMoisAnnee(maDate)
    afficheCalendrier(maDate)
})

// Si on clique sur la fleche à gauche du mois
mois_precedent.addEventListener("click", () => {
    maDate.setMonth(maDate.getMonth()-1)
    afficheMoisAnnee(maDate)
    afficheCalendrier(maDate)
})

// Si on clique sur le bouton pour créer un évènement
bt_creer_evenement.addEventListener("click", () => {
    ipcRenderer.invoke("event-add")
})

// Si on clique sur un évènement dans le calendrier
mainApp.addEventListener("click", function(e){
    getEventById(e.target.dataset.id, function(err, rows, fields){
        if(err){
            console.log("An error ocurred performing the query.")
        }
        else{
            if(rows.length > 0) {
                ipcRenderer.invoke("event-view", rows[0])
            }
        }
    })
})

/*
** Fonction afficheCalendrier
** Affiche les cases du calendrier et les évènements correspondant à chaque jour
** Paramètres d'entrés: d => objet Date
** Retourne : rien
*/
function afficheCalendrier(d) {
    // déclaration des variables et vide du calendrier
    mainApp.innerHTML = "";
    let premierJourDuMois = null;
    let numPremierJourDuMois = null;
    let month = null;
    let nombreDeJourMois = null;
    let numNombreJourDuMois = null;
    let numDernierJourDuMois = null;
    let res = null;

    // premierJourDuMois vaut le premier jour du mois de la date entré
    premierJourDuMois = new Date(d)
    premierJourDuMois.setDate(1)

    // numPremierJourDuMois est le jour précis en chiffre (lundi = 1, mardi = 2 etc) du premier jour du mois
    numPremierJourDuMois = premierJourDuMois.getDay()

    // On passe le dimanche en fin de semaine
    if (numPremierJourDuMois == 0) numPremierJourDuMois = 7

    // month est le mois-1 de la date entrée
    month = d.getMonth();

    // nombreDeJourMois est le nombre de jour dans le mois d'une année
    nombreDeJourMois = new Date(d.getFullYear(), month + 1, 0);

    // numNombreJourDuMois = le numéro du jour des jours qui font parti d'un mois
    numNombreJourDuMois = nombreDeJourMois.getDate()

    // numDernierJourDuMois = dernier jour du mois
    numDernierJourDuMois = nombreDeJourMois.getDay()

    // On passe le dimanche en fin de semaine
    if (numDernierJourDuMois == 0) numDernierJourDuMois = 7

    // récupère les évènements d'un mois entré en paramètre
    getAllEvents(d, function(err, rows, fields){  

        // si la requete échoue, on affiche l'erreur en console.log
        if(err){
            console.log("An error ocurred performing the query.");
            console.log(err);
        }
        // si la requete réussi, on affiche un message de réussite en console.log
        else{
            console.log("Query succesfully executed");
            res = rows

            // Pour chaque jour ne faisant pas parti de la semaine d'un mois (exemple: le mois commencer un mercredi, on grise lundi et mardi)
            for (let i = 1; i < numPremierJourDuMois; i++) {
                ajouteCaseGrise()
            }

            // Pour chaque jour faisant parti du mois
            for (let i_jdm = 1; i_jdm <= numNombreJourDuMois; i_jdm++) {
                ajouteCaseActive(i_jdm)

                // Pour chaque evenement
                for(let i in res){

                    // Si la date de l'evenement correspond à la date du calendrier
                    if(res[i]["date_deb"].getDate() == i_jdm)
                    {
                        // On affiche l'evenement
                        afficheEvent(res[i],i_jdm)
                    }
                }
            }
            // Pour chaque jour ne faisant pas parti de la semaine d'un mois (exemple: le mois commencer un mercredi, on grise lundi et mardi)
            for (let i = numDernierJourDuMois; i < 7; i++) {
                ajouteCaseGrise()
            }
        }
    })

}

/*
** Fonction ajouteCaseGrise
** Crée et affiche une case crise pour les jours qui n'existent pas dans le mois
** Paramètres d'entrés: rien
** Retourne : rien
*/
function ajouteCaseGrise() {
    let elem = document.createElement("div")
    elem.className = "caseInactive"
    mainApp.appendChild(elem)
}

/*
** Fonction ajouteCaseActive
** Crée et affiche une case pour les jours qui existent dans le mois
** Paramètres d'entrés: num => le numéro de la data du jour
** Retourne : rien
*/
function ajouteCaseActive(num) {
    let elem = document.createElement("div")
    elem.className = "caseActive"
    elem.setAttribute("id", "caseActive" + num)
    elem.innerHTML = num
    mainApp.appendChild(elem)
}

/*
** Fonction afficheEvent
** Crée et affiche un évènement
** Paramètres d'entrés: event => l'evenement, caseCalendrier => la case du calendrier
** Retourne : rien
*/
function afficheEvent(event, caseCalendrier){
    let elem = document.createElement("div")
    elem.className = "event"
    elem.setAttribute("id", "event")
    elem.setAttribute("data-id", event["id"])
    elem.innerHTML = event["titre"]
    document.getElementById("caseActive"+caseCalendrier).appendChild(elem)
    
}

/*
** Fonction afficheMoisAnnee
** Transforme l'affichage du mois par une version explicite en français
** Paramètres d'entrés: date => objet Date
** Retourne : rien
*/
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

/*
** Fonction ConnexionBdd
** Se connecte à la base de données
** Paramètres d'entrés: rien
** Retourne : connection => objet mysql connecté
*/
function ConnexionBdd(){
    return connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: null,
        database: 'electron_projet'
        });
}

/*
** Fonction getAllEvents
** Récupère tous les évènements dans un mois
** Paramètres d'entrés: date => objet date, cb => une fonction de callback
** Retourne : rien
*/
function getAllEvents(date, cb){
    ConnexionBdd()
    let month = date.getMonth()+1
    if(month<10){month = "0"+month}
    let fullDatePurcent = date.getFullYear()+"-"+month+"%";
    let query = 'SELECT * FROM event WHERE date_deb LIKE ?';
        connection.query(query,[fullDatePurcent], cb)
}

/*
** Fonction getEventById
** Récupère un evenement pour un id donné
** Paramètres d'entrés: id => l'id d'un evenement, cb => une fonction de callback
** Retourne : rien
*/
function getEventById(id, cb){
    ConnexionBdd()
    let query = 'SELECT * FROM event WHERE id = ?';
        connection.query(query,[id], cb)
}

// App
let maDate = new Date()
maDate.setMonth(maDate.getMonth())
afficheCalendrier(maDate)
afficheMoisAnnee(maDate)