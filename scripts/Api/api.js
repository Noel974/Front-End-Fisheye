// Exporte les classes PhotographerApi et MediaApi pour qu'elles puissent être utilisées dans d'autres fichiers
export { PhotographerApi }
export { MediaApi }

// Définit la classe Api
class Api {
    // Constructeur de la classe
    constructor(url) {
        // Initialise l'URL à partir de laquelle les données seront récupérées
        this._url = url
    }

    // Récupère les données des photographes à partir de l'URL spécifiée
    async getP() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res.photographers)
            .catch((err) => console.log('an error', err))
    }

    // Récupère les données des médias à partir de l'URL spécifiée
    async getM() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res.media)
            .catch((err) => console.log('an error', err))
    }
}

// Définit la classe PhotographerApi qui hérite de la classe Api
class PhotographerApi extends Api {
    // Constructeur de la classe
    constructor(url) {
        // Appelle le constructeur de la classe parente (Api)
        super(url)
    }

    // Récupère les données des photographes en appelant la méthode getP() de la classe parente (Api)
    async getPhotographers() {
        return this.getP()
    }
}

// Définit la classe MediaApi qui hérite de la classe Api
class MediaApi extends Api {
    // Constructeur de la classe
    constructor(url) {
        // Appelle le constructeur de la classe parente (Api)
        super(url)
    }

    // Récupère les données des médias en appelant la méthode getM() de la classe parente (Api)
    async getMedia() {
        return this.getM()
    }
}
