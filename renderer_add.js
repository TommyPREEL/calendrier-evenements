// Création d'objets venant de librairies
const { ipcRenderer } = require('electron')
const mysql = require('mysql2');

// Récupération des elements de add.html
const add_bouton_ajouter = document.getElementById("add-ajouter")

// Si on clique sur le bouton ajouter
add_bouton_ajouter.addEventListener("click", () => {
    // Récupération des elements de add.html
    let titre = document.getElementById("add-titre")
    let date_debut = document.getElementById("add-date-debut")
    let date_fin = document.getElementById("add-date-fin")
    let categorie = document.getElementById("add-categorie")
    let lieu = document.getElementById("add-lieu")
    let statut = document.getElementById("add-statut")
    let description = document.getElementById("add-description")
    let transparence = document.getElementById("add-transparence")

    // Creation d'un evenement en BDD
    createEvent(date_debut.value, date_fin.value, titre.value, lieu.value, categorie.value, statut.value, description.value, transparence.value, function(err,result,fields){
        if(err) throw err;
        console.log(result);

        // fermeture de la fenetre et reload de la page main
        ipcRenderer.invoke("event-add-close")
    })
})

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
** Fonction createEvent
** Créer un evenement
** Paramètres d'entrés:
*** date_debut => date du début de l'evenement
*** date_fin => date de fin de l'evenement
*** titre => titre de l'evenement
*** lieu => lieu de l'evenement
*** categorie => categorie de l'evenement
*** statut => statut de l'evenement
*** description => description de l'evenement
*** transparence => transparence de l'evenement
*** cb => fonction de callback
** Retourne : rien
*/
function createEvent(date_debut, date_fin, titre, lieu, categorie, statut, description, transparence, cb){
    ConnexionBdd()
    let query = "INSERT INTO event (`date_deb`, `date_fin`, `titre`, `location`, `categorie`, `statut`, `description`, `transparence`, `nbMaj`) VALUES (?,?,?,?,?,?,?,?,1)"
    connection.query(query, [date_debut, date_fin, titre, lieu, categorie, statut, description, transparence], cb)
}
