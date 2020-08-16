// création de la classe Reservation qui crée des instances d'objets reservation
class Reservation {
    constructor() {
        if (sessionStorage.endTime) {
            // on vérifie au démarrage si une réservation est en cours
            var now = new Date()
            var currentTimestamp = now.getTime()
            var remainingTime = Math.floor((sessionStorage.endTime - currentTimestamp) / 1000)
            if (remainingTime > 0) {
                // et s'il reste du temps
                this.endTime = sessionStorage.endTime;
                document.getElementById("availableTime").style.display = "block";
                document.getElementById("bookingInformations").style.display = "block";
                this.resume()
            }
        }
    }

    start(endTime = null) {
        this.now = new Date()
        this.currentTimestamp = this.now.getTime(); // On obtient le timestamp actuel
        this.maxTime = 20 * 60 * 1000; //20 minutes + tard en millisecondes
        this.endTime = this.currentTimestamp + this.maxTime //timestamp maximal de réservation
        sessionStorage.setItem("endTime", this.endTime)
        document.getElementById("availableTime").style.display = "block";
        document.getElementById("bookingInformations").style.display = "block";
        this.resume()
    };

    formatDate(date) {
        var jour = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear()
        return jour;
    }

    formatTime(date) {
        var heure = date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0")
        return heure;
    }

    resume() {
        this.timer = window.setInterval(() => {
            // compte à rebours, toutes les secondes
            var now = new Date()
            document.getElementById("currentDay").innerHTML = this.formatDate(now);
            document.getElementById("currentTime").innerHTML = this.formatTime(now);
            var station = JSON.parse(sessionStorage.getItem("station"))
            document.getElementById("nameStation").innerHTML = station.address;

            var currentTimestamp = now.getTime()
            var remainingTime = Math.floor((this.endTime - currentTimestamp) / 1000)
            var end = new Date(now)
            end.setSeconds(end.getSeconds() + remainingTime) // on définit en secondes l'heure maximale de réservation
            document.getElementById("maxTime").innerHTML = this.formatTime(end);
            if (remainingTime > 0) {
                var minutes = Math.floor(remainingTime / 60)
                var seconds = remainingTime % 60

                document.getElementById("nameResa").innerHTML = form1.firstNameUser.value + " " + form1.nameUser.value
                document.getElementById("countdown").innerHTML = minutes + " minutes et " + seconds + " secondes"
            } else {
                document.getElementById("countdownTime").innerHTML = "Votre réservation au nom de " + form1.firstNameUser.value + " " + form1.nameUser.value + " a expiré car le délai de 20 minutes a été dépassé."
                document.getElementById("countdown").innerHTML = "0 minutes et 0 secondes "
                window.clearInterval(this.timer)
            }

        }, 1000)
    }

    save(endTime = null) {
        window.localStorage.setItem("user", JSON.stringify({
            name: form1.nameUser.value,
            firstName: form1.firstNameUser.value
        }))
        window.sessionStorage.setItem("station", JSON.stringify(
            map1.currentStation))
    }
}

const reservation1 = new Reservation()