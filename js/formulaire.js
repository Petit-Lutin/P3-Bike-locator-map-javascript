// création de la classe Form qui crée des instances d'objets form
class Form {
    constructor(idConteneur) {
        this.idConteneur = idConteneur;
        this.conteneur = document.getElementById(idConteneur);

        var now = new Date()
        document.getElementById("currentDay").innerHTML += now;
    
        this.nameUser = document.getElementById("name");
        this.firstNameUser = document.getElementById("firstName");

        // clic sur le bouton "Réserver"
        document.getElementById("bookButton").addEventListener("click", (e) => {
            e.preventDefault();
            let message = "";
            //On vérifie avec une expression régulière qu'il n'y ait pas de caractères autres que des lettres dans les nom et prénom de l'utilisateur              
            this.regex = /^[a-zâäàéèùêëîïôöçñ\-]{2,}$/i

            if (this.nameUser.value.trim().length === 0) message += "Veuillez saisir votre nom\r\n";
            if (this.firstNameUser.value.trim().length === 0) message += "Veuillez saisir votre prénom\r\n";
            if (!(this.regex.test(this.nameUser.value)) || !(this.regex.test(this.firstNameUser.value))) {
                message += "Veuillez saisir votre nom ou votre prénom avec des lettres uniquement.";
            }

            // il doit y avoir une signature
            if (canvas1.signature === false) message += "Veuillez signer dans le cadre blanc\r\n";

            if (message.length > 0) {
                alert(message);
            }
            if (message.length === 0) {

                reservation1.start(this.endTime) //on démarre le compte à rebours

                map1.currentStation.available_bikes--
                map1.currentStation.available_bike_stands++ //on réserve un vélo, donc il y a un vélo disponible en moins à la station, mais un stand vide de plus
                reservation1.save(this.endTime) // si le compte à rebours est en cours et on garde la réservation 
                var now = new Date()
                document.getElementById("currentDay").innerHTML = reservation1.formatDate(now);
                document.getElementById("currentTime").innerHTML = reservation1.formatTime(now);

                // rappel du fonctionnement du service à l'utilisateur
                alert("Merci pour votre réservation,  " + this.firstNameUser.value + " " + this.nameUser.value + " ! \r\n Pour que votre réservation soit valide, veuillez garder cette page ouverte le temps d'aller récupérer votre vélo.")
            }
        });

        //Clic sur "Annuler"
        document.getElementById("cancelButton").addEventListener("click", (e) => {
            canvas1.drawReset();
        });
    }
}

const form1 = new Form("bookingForm");



