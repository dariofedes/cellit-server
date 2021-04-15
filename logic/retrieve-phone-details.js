const { models: { Phone } } = require('../data')
const { sanitize } = require('../utils')

module.exports = function retrievePhoneDetais(id) {
    if(typeof id !== 'string') throw new TypeError(`id ${id} is not a string`)
    
    return (async () => {
        const phone = await Phone.findById(id).lean()
        
        return sanitize({...phone, href: `phones/${phone._id}`})
    })()
}