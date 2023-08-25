import { PhotographerApi, MediaApi } from '../Api/api.js'
import { Media } from '../factories/Media.js'
import { Photographer } from '../models/index.js'
import { PhotographerCard } from '../templates/index.js'
import { VideoCard } from '../templates/VideoCard.js'
import { PictureCard } from '../templates/PictureCard.js'
import { PriceAndLikesCard } from '../templates/priceandlike.js'
import { SorterForm } from '../templates/SorterForm.js'
import { Sorter } from '../utils/Sorter.js'
import { Lightbox } from '../utils/Lightbox.js'

export class PhotographerPage {
    constructor() {
        // Initialisation des éléments du DOM
        this.main = document.getElementById('main')
        this.mediaSection = document.querySelector('.media')

        // Initialisation des API
        this.photographerApi = new PhotographerApi('/data/photographers.json')
        this.mediaApi = new MediaApi('/data/photographers.json')

        // Récupération de l'URL de la page
        this.url = new URL(window.location)

        // Récupération de l'ID du photographe depuis l'URL
        this.id = this.getPhotographerIdFromUrl()
    }

    // Méthode pour obtenir l'ID du photographe depuis l'URL
    getPhotographerIdFromUrl() {
        const params = new URLSearchParams(this.url.search)
        return parseInt(params.get('photographerId'), 10)
    }

    // Méthode pour obtenir le paramètre 'sorter' de l'URL
    getSorterFromURL() {
        const params = this.url.searchParams
        return params.get('sorter')
    }

    // Méthode pour récupérer les données du photographe filtré
    async fetchPhotographerFiltered() {
        const photographersData = await this.photographerApi.getPhotographers()
        const photographerDataFiltered = this.findPhotographer(
            photographersData,
            this.id
        )
        return new Photographer(photographerDataFiltered)
    }

    // Méthode pour trouver le photographe dans la liste des photographes
    findPhotographer(photographers, photographerId) {
        return photographers.find(
            (photographer) => photographer.id === photographerId
        )
    }

    // Méthode pour récupérer les médias filtrés
    async fetchMediaFiltered() {
        const mediaData = await this.mediaApi.getMedia()
        const mediaDataFiltered = this.filterMedia(mediaData, this.id)
        const videoData = mediaDataFiltered
            .filter((media) => media.video)
            .map((video) => new Media(video, 'video'))
        const pictureData = mediaDataFiltered
            .filter((media) => media.image)
            .map((picture) => new Media(picture, 'picture'))

        return videoData.concat(pictureData)
    }

    // Méthode pour filtrer les médias du photographe
    filterMedia(media, photographerId) {
        return media.filter((media) => media.photographerId === photographerId)
    }

    // Méthode pour afficher l'en-tête du photographe
    displayPhotographerHeader(photographer) {
        const photographercard = new PhotographerCard(photographer)
        photographercard.getPhotographerHeader()
    }

    // Méthode pour afficher le prix et les likes des médias
    displayPriceAndLikesOfMedia(likes, price) {
        const priceAndLikesCard = new PriceAndLikesCard(likes, price)
        const divItem = priceAndLikesCard.getPriceAndLikesDom()
        this.main.appendChild(divItem)
    }

    // Méthode pour obtenir les likes à partir des données des médias
    getLikes(data) {
        let array = []
        for (const element of data) {
            array.push(element.likes)
        }
        return array
    }

    // Méthode pour calculer la somme des likes
    getSumLikes(array) {
        return array.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        )
    }

    // Méthode pour afficher les médias triés par likes
    displayMediaByLike(media, photographer) {
        const mediaSorted = new Sorter(media, 'like').mediaSorted()

        mediaSorted.forEach((media) => {
            if (media.video) {
                const videoCard = new VideoCard(media, photographer)
                this.mediaSection.appendChild(videoCard.getVideoCardDom())
                this.main.appendChild(this.mediaSection)
            } else if (media.image) {
                const pictureCard = new PictureCard(media, photographer)
                this.mediaSection.appendChild(pictureCard.getPictureCardDom())
                this.main.appendChild(this.mediaSection)
            } else {
                throw new Error('Unknown type format')
            }
        })

        Lightbox.init()
    }

   // Méthode d'initialisation
async init() {
    this.photographerFiltered = await this.fetchPhotographerFiltered();

    // Afficher l'en-tête du photographe
    this.displayPhotographerHeader(this.photographerFiltered);

    this.mediaFiltered = await this.fetchMediaFiltered();
    const likes = this.getLikes(this.mediaFiltered);
    const sumLikes = this.getSumLikes(likes);

    // Afficher le prix et les likes des médias et mettre à jour le total des likes
    this.displayPriceAndLikesOfMedia(
        sumLikes,
        this.photographerFiltered.price
    );

        let sorter = this.getSorterFromURL()

        if (!['like', 'date', 'title'].includes(sorter)) {
            this.url.searchParams.set('sorter', 'like')
            window.history.pushState({}, '', this.url)
            sorter = 'like'
        }

        const sorterForm = new SorterForm(
            this.mediaFiltered,
            this.photographerFiltered,
            sorter
        )

        sorterForm.init()

        const photographerNameContactForm = document.querySelector(
            '.modal__header__photographer_name'
        )
        photographerNameContactForm.textContent = `${this.photographerFiltered.name}`
    }
}

const photographerPage = new PhotographerPage()
photographerPage.init()
