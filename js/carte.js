//création objet ville, ici Lyon
var city = {
    name: "Lyon",
    latitude: 45.7484600,
    longitude: 4.8467100
};

// création de la classe Map qui crée des instances d'objets carte
class Map { 
    constructor(idConteneur) {
        this.idConteneur = idConteneur;
        this.conteneur = document.getElementById(idConteneur);
        this.customMap = L.map(idConteneur).setView([city.latitude, city.longitude], 13);

        // Insertion OpenStreetMap et MapBox pour l'affichage de la carte
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGV0aXRsdXRpbiIsImEiOiJjanV2MDZ3dnYwaGY1M3lxZWUyY2wwM256In0.1HBytlxhGekI8Qyp7I4vxA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicGV0aXRsdXRpbiIsImEiOiJjanV2MDZ3dnYwaGY1M3lxZWUyY2wwM256In0.1HBytlxhGekI8Qyp7I4vxA'
        }).addTo(this.customMap);
        this.loadStations()
    }

    // récupération des stations de vélos grâce à l'API JCDecaux
    loadStations() {
        ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=1a65ebf23b0482781cbddeaa74a7c535179df94a', (response) => {
            var stations = JSON.parse(response)

            // création des regroupements de markers pour que la carte ne soit pas encombrée
            this.markersCluster = new L.MarkerClusterGroup({
                iconCreateFunction: function (cluster) {
                    return L.divIcon({
                        html: cluster.getChildCount(),
                        className: 'mycluster',
                        iconSize: null
                    });
                }
            });
            this.customMap.addLayer(this.markersCluster);

            for (var i = 0; i < stations.length; i++) {
                var station = stations[i];

                var LeafIcon = L.Icon.extend({
                    options: {
                        iconAnchor: [0, 0],
                    }
                });

                // déclinaisons des markers
                var greenIcon = new LeafIcon({
                        iconUrl: 'images/marqueurs/velo-vert5.png'
                    }),
                    redIcon = new LeafIcon({
                        iconUrl: 'images/marqueurs/velo-rouge5.png'
                    }),
                    orangeIcon = new LeafIcon({
                        iconUrl: 'images/marqueurs/velo-orange5.png'
                    }),
                    stopIcon = new LeafIcon({
                        iconUrl: 'images/marqueurs/closed5.png'
                    });

                let customIcon;
                // on contrôle d'abord que la station soit ouverte
                if (station.status === "CLOSED") {
                    customIcon = stopIcon;
                } else {
                    // puis on regarde le nombre de vélos présents
                    if (station.available_bikes > 5) {
                        customIcon = greenIcon;
                    } else if ((station.available_bikes >= 1) && (station.available_bikes <= 5)) {
                        customIcon = orangeIcon;
                    } else if (station.available_bikes <= 1) {
                        customIcon = redIcon;
                    }
                }

                var marker = L.marker([station.position.lat, station.position.lng], {
                    icon: customIcon
                })
                //crée un marqueur sur chaque station
                marker.info = station;

                this.markersCluster.addLayer(marker); // on regroupe les markers en clusters

                //Quand on clique sur un marker, affiche l'état de la station, le nombre de vélos restants...
                marker.addEventListener("click", (e) => {
                   //informations de la station
                    var station = e.target.info; //pour lier le nom de la variable station au marqueur sinon prend en compte la dernière station affichée
                    this.currentStation = station
                    this.contenuStation = "<b>Station : </b>" + station.address + "<br/><b>Vélos disponibles : </b>" + station.available_bikes + "<br /><b>Stands vides : </b>" + station.available_bike_stands;
                    //on affiche les informations de la station dans l'encart à côté de la carte
                    document.getElementById("stationInformations").innerHTML = contenuStation + "<br />"; 
                    document.getElementById("nameStation").innerHTML = station.address;
                    document.getElementById("displayBeforeClick").style.display = "none";
                    document.getElementById("closedStation").style.display = "none";

                    if (station.available_bikes >= 1) {
                        document.getElementById("bookingForm").style.display = "block";
                        var user = JSON.parse(localStorage.getItem("user"));
                       form1.nameUser.value=user.name;
                       form1.firstNameUser.value=user.firstName;

                        document.getElementById("bookingInformations").style.display = "none";
                        document.getElementById("noBikeAvailable").style.display = "none";
                        document.getElementById("closedStation").style.display = "none";

                    } else if (station.status === "CLOSED") {
                        document.getElementById("bookingForm").style.display = "none";
                        document.getElementById("noBikeAvailable").style.display = "none";
                        document.getElementById("closedStation").style.display = "block";

                    } else {
                        document.getElementById("bookingForm").style.display = "none";
                        document.getElementById("noBikeAvailable").style.display = "block";
                    }
                })

                let contenuStation = "<b>Station : </b>" + station.address + "<br/><b>Vélos disponibles : </b>" + station.available_bikes + "<br /><b>Stands vides : </b>" + station.available_bike_stands;
            }
        });
    }
}

const map1 = new Map("newIdMap");