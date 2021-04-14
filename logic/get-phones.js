const { models: { Phone } } = require('../data')
const { sanitize } = require('../utils')

module.exports = async function getPhones() {
    const phones = await Phone.find()

    return phones.map(phone => sanitize(phone))
}