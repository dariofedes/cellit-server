const { getPhones } = require('../logic')

module.exports = async (req, res) => {
    try {
        const phones = await getPhones()

        res.status(200).json(phones)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}