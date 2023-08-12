// Importe la classe Media depuis le fichier Media.js
import { Media } from './Media.js'

// Exporte la classe Video pour qu'elle puisse être utilisée dans d'autres fichiers
export { Video }

// Définit la classe Video qui hérite de la classe Media
class Video extends Media {
    // Constructeur de la classe Video
    constructor(data) {
        // Appelle le constructeur de la classe parente Media avec l'objet data
        super(data)
        // Initialise la propriété video de l'objet Video avec la valeur de la propriété video de l'objet data
        this.video = data.video // Chemin vers l'video
    }
}
