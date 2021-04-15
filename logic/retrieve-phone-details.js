const { models: { Phone } } = require('../data')
const { sanitize } = require('../utils')

/**
 * Fetches a device in database and returns all its details
 * 
 * @param {String} id The id of the device is being retrieved
 * @returns {Promise}
 */

module.exports = function retrievePhoneDetais(id) {
    if(typeof id !== 'string') throw new TypeError(`id ${id} is not a string`)
    
    return (async () => {
        const phone = await Phone.findById(id).lean()
        
        return sanitize({...phone, href: `phones/${phone._id}`})
    })()
}