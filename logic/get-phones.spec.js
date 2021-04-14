const getPhones = require('./get-phones')
const { models: { Phone } } = require('../data')

describe('getPhones', () => {
    beforeEach(() => {
        Phone.find = jest.fn(() => ["phone1", "phone2"])
    })

    it('should not fail', async () => {
        let error

        try {
            const phones = await getPhones() 
        } catch (_error) {
            error = _error
        }

        expect(error).not.toBeDefined()
    })

    it('should retrieve all phones from database', async () => {
        await getPhones()

        expect(Phone.find).toHaveBeenCalled()
    })
})