// création de la classe Diaporama qui crée des instances d'objets diaporama
class Diaporama {
    constructor(idConteneur) {
        this.idConteneur = idConteneur;
        this.conteneur = document.getElementById(idConteneur);
        this.slides = this.conteneur.querySelectorAll("figure");
        this.sommaire = 0;
        this.afficher() //on appelle la méthode pour afficher une figure

        // Evénements pour contrôler le diaporama au clic sur les boutons
        this.flecheDroite = this.conteneur.querySelector(".flecheDroite");
        this.flecheDroite.addEventListener("click", () => {
            this.nextImage()
            
        })
        this.flecheGauche = this.conteneur.querySelector(".flecheGauche");

        this.flecheGauche.addEventListener("click", () => {
            this.previousImage()
        })
        this.pauseButton = this.conteneur.querySelector(".pause");
        this.pauseButton.addEventListener("click", () => {
            this.pause()
        })
        this.playButton = this.conteneur.querySelector(".play");
        this.playButton.addEventListener("click", () => {
            this.autoPlay()
        })

        // Evénements pour contrôler le diaporama au clavier
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 37:
                    // <-
                    this.previousImage();
                    break;
                case 39:
                    //->
                    this.nextImage();
                    break;
                case 32:
                    // espace
                    if (this.player === true) {
                        this.pause()
                    } else {
                        this.autoPlay()
                    }
                    break;
                default:
                    break;
            }
        })
        this.autoPlay()
    }

    // le diaporama affiche la figure suivante toutes les 5 secondes
    autoPlay() {
        this.timer = setInterval(() => {
            this.nextImage()
        }, 5000)
        this.playButton.style.display = "none";
        this.pauseButton.style.display = "inline-block";
        this.player = true;
    }

    //méthode pour afficher une figure, qu'elle soit située après (nextImage) ou avant (previousImage) la slide i
    afficher() {
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        }
        this.slides[this.sommaire].style.display = "block";
    }

    nextImage() { //qui se produit quand on clique sur la flèche droite
        // console.log(this.sommaire)
        this.sommaire++;
        if (this.sommaire >= this.slides.length) {
            this.sommaire = 0;
        }
        this.afficher()
    }

    previousImage() { //qui se produit quand on clique sur la flèche gauche
        // console.log(this.sommaire)
        this.sommaire--;
        if (this.sommaire < 0) {
            this.sommaire = this.slides.length - 1;
        }
        this.afficher()
    }

    pause() {
        clearInterval(this.timer)
        this.pauseButton.style.display = "none";
        this.playButton.style.display = "inline-block";
        this.player = false;
    }
}

const diaporama1 = new Diaporama("diaporama");