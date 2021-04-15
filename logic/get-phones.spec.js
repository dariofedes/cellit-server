const getPhones = require('./get-phones')
const { models: { Phone } } = require('../data')
const mockResponse = [
    {
        "name": "iPhone 12",
        "price": 909,
        "manufacturer": "Apple",
        "image_url": "https://www.yaphone.com/4197-thickbox_default/apple-iphone-12-pro-max.jpg",
        "_id": "6076dacbed1f069df03354ab"
      },
      {
        "name": "iPhone 12",
        "price": 909,
        "manufacturer": "Apple",
        "image_url": "https://www.yaphone.com/4197-thickbox_default/apple-iphone-12-pro-max.jpg",
        "_id": "607739b88a869c9aaf5587f8"
      }
]

describe('getPhones', () => {
    let lean, select

    beforeEach(() => {
        lean = jest.fn(() => mockResponse)
        select = jest.fn(() => ({ lean }))
        Phone.find = jest.fn(() => ({ select }))
    })

    it('should not fail', async () => {
        let error

        try {
            await getPhones() 
        } catch (_error) {
            error = _error
        }

        expect(error).not.toBeDefined()
    })

    it('should retrieve all phones from database', async () => {
        await getPhones()

        expect(Phone.find).toHaveBeenCalled()
    })

    it('should return an array', async () => {
        const phones = await getPhones()

        expect(phones).toBeInstanceOf(Array)
    })

    it('should not expose the database', async () => {
        const phones = await getPhones()

        phones.forEach(phone => {
            expect(phone._id).not.toBeDefined()
            expect(phone.__v).not.toBeDefined()
        })
    })

    it('should inject an "href" value in the documents', async () => {
        const phones = await getPhones()

        phones.forEach(phone => {
            expect(typeof phone.href).toBe('string')
            expect(phone.href.split('/')[0]).toBe('phones')
            expect(phone.href.split('/')[1]).toBe(phone.id)
        })        
    })

    afterEach(() => {
        Phone.find.mockClear()
        select.mockClear()
        lean.mockClear()
    })
})