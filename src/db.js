// Retrieve
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

const gumtreeData = [
    {
        url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/krowodrza+gorka/v1c9008q0p1?nr=2&pr=,1600',
        keyword: 'Krowodrza Górka, max 1600 PLN, 2 pokoje',
        shortkey: 'kgorka'
    },
    {
        url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/zabiniec/v1c9008q0p1?nr=2&pr=,1600',
        keyword: 'Żabiniec, max 1600 PLN, 2 pokoje',
        shortkey: 'zabiniec'
    },
    {
        url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/rondo+mogilskie/v1c9008q0p1?nr=2&pr=,1600',
        keyword: 'Mogilskie, max 1600 PLN, 2 pokoje',
        shortkey: 'mogilskie'
    }
]

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
        client.close();
    });
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('domek');
    // Insert some documents
    collection.insertMany([
        { kari: gumtreeData }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}