const retrievePhoneDetails = require('./retrieve-phone-details')
const { models: { Phone } } = require('../data')
const mockId = "an id"
const mockResponse = {
    "description": "Lorem ipsum",
    "name": "iPhone 12",
    "price": 909,
    "manufacturer": "Apple",
    "screen_size": 6.1,
    "image_url": "https://www.yaphone.com/4197-thickbox_default/apple-iphone-12-pro-max.jpg",
    "_id": "6076dacbed1f069df03354ab"
  }

describe('retrievePhoneDetails', () => {
    describe('on valid arguments', () => {
        let lean

        beforeEach(() => {
            lean = jest.fn(() => mockResponse)
            Phone.findById = jest.fn(() => ({ lean }))
        })
    
        it('should not fail', async () => {
            let error
    
            try {
                await retrievePhoneDetails(mockId) 
            } catch (_error) {
                error = _error
            }
    
            expect(error).not.toBeDefined()
        })
    
        it('should retrieve a phone by its id', async () => {
            await retrievePhoneDetails(mockId)
    
            expect(Phone.findById).toHaveBeenCalled()
            expect(Phone.findById).toHaveBeenCalledWith(mockId)
        })
    
        it('should not expose the database', async () => {
            const phone = await retrievePhoneDetails(mockId)
    
            expect(phone._id).not.toBeDefined()
            expect(phone.__v).not.toBeDefined()
        })
    
        it('should inject an "href" value in the document', async () => {
            const phone = await retrievePhoneDetails(mockId)
    
            expect(typeof phone.href).toBe('string')
            expect(phone.href.split('/')[0]).toBe('phones')
            expect(phone.href.split('/')[1]).toBe(phone.id)
        })

        afterEach(() => {
            Phone.findById.mockClear()
            lean.mockClear()
        })
    })

    describe('on not valid arguments', () => {
        it('should fail on non string id', () => {
            expect(() => retrievePhoneDetails(1)).toThrow(TypeError, 'id 1 is not a function')
            expect(() => retrievePhoneDetails(true)).toThrow(TypeError, 'id true is not a function')
            expect(() => retrievePhoneDetails(undefined)).toThrow(TypeError, 'id undefined is not a function')
            expect(() => retrievePhoneDetails(null)).toThrow(TypeError, 'id null is not a function')
        })
    })
})