const { ipcRenderer } = require('electron')
const mysql = require('mysql2');
const add_bouton_valider = document.getElementById("add-valider")

add_bouton_valider.addEventListener("click", () => {
    let titre = document.getElementById("add-titre")
    let date_debut = document.getElementById("add-date-debut")
    let date_fin = document.getElementById("add-date-fin")
    let categorie = document.getElementById("add-categorie")
    let lieu = document.getElementById("add-lieu")
    let statut = document.getElementById("add-statut")
    let description = document.getElementById("add-description")
    let transparence = document.getElementById("add-transparence")
    createEvent(date_debut.value, date_fin.value, titre.value, lieu.value, categorie.value, statut.value, description.value, transparence.value, function(err,result,fields){
        if(err) throw err;
        console.log(result);
        ipcRenderer.invoke("event-add-close")
    })
})

function ConnexionBdd(){
    // create the connection to database
    return connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: null,
        database: 'electron_projet'
        });
}

function createEvent(date_debut, date_fin, titre, lieu, categorie, statut, description, transparence, cb){
    ConnexionBdd()
    let query = "INSERT INTO event (`date_deb`, `date_fin`, `titre`, `location`, `categorie`, `statut`, `description`, `transparence`, `nbMaj`) VALUES (?,?,?,?,?,?,?,?,1)"
    connection.query(query, [date_debut, date_fin, titre, lieu, categorie, statut, description, transparence], cb)
}
