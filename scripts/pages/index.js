// Importe les classes nécessaires
import { PhotographerApi } from '../Api/api.js';
import { PhotographerCard } from '../templates/index.js'
import { Photographer } from '../models/index.js';

// Définit la classe Accueil
class Accueil {
    constructor() {
        // Sélectionne l'élément du DOM pour afficher les photographes
        this.photographersSection = document.querySelector(
            '.photographer_section'
        )

        // Crée une nouvelle instance de l'API des photographes
        this.photographerApi = new PhotographerApi('/data/photographers.json')

        // Initialise un tableau vide pour stocker les photographes
        this.photographers = []
    }

    // Récupère les données des photographes à partir de l'API
    async fetchPhotographers() {
        const photographers = await this.photographerApi.getPhotographers()
        return photographers.map((photographer) => new Photographer(photographer))   
    }

    // Affiche les données des photographes dans le DOM
    async displayData(photographers) {
        photographers.forEach((photographer) => {
            const photographerCard = new PhotographerCard(photographer)
            const userCardDOM = photographerCard.getUserCardDOM()

            this.photographersSection.appendChild(userCardDOM)
        })
    }

    // Initialise la page d'accueil en récupérant et affichant les données des photographes
    async init() {
        this.photographers = await this.fetchPhotographers()
        this.displayData(this.photographers)
    }
}

// Crée une nouvelle instance de la classe Accueil et initialise la page d'accueil
const accueil = new Accueil();
accueil.init()
