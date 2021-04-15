const { retrievePhoneDetails } = require('../logic')

module.exports = async (req, res) => {
    const { params: { id } } = req
    try {
        debugger
        const phone = await retrievePhoneDetails(id)

        res.status(200).json(phone)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}