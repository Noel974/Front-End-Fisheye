import { Picture } from '../models/Picture.js'
import { Video } from '../models/Video.js'

export { Media }

class Media {
    constructor(data, type) {
        // Si le type est picture retourne une image
        if (type === 'picture') {
            return new Picture(data)
        } else if (type === 'video') {
            // Si le type est video retourne une video
            return new Video(data)
        } else {
            // Sinon retourne une erreur
            throw new Error('Unknown type format')
        }
    }
}