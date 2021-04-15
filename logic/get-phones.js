const { models: { Phone } } = require('../data')
const { sanitize } = require('../utils')

/**
 * Fetches the database for all stored devices and returns its main info
 * 
 * @returns {Promise}
 */

module.exports = async function getPhones() {
    const phones = await Phone.find().select('name price manufacturer image_url').lean()

    return phones.map(phone =>  sanitize({...phone, href: `phones/${phone._id}`}))
}