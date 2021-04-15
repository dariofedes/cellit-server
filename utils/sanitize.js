/**
 * It takes in a document from MongoDB and parses it to a plain JS object and deletes all metadata and password fields (if exist)
 * 
 * @param {Object} document The document from MongoDB to be sanitized
 * @returns  {Object} The sanitized object
 */

module.exports = function(document) {
    document = document.toObject ? document.toObject() : document
    document.id = document._id ? document._id.toString() : document.id
    delete document._id
    document.__v !== undefined && delete document.__v
    document.password && delete document.password

    return document
}