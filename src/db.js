// Retrieve
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name

// const domki = [
//     {
//         "title": "50 M2 ^^^ UL. KONECZNEGO ^^^ ŻABINIEC ^^^ 2 POKOJE",
//         "url": "https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/krakow/50-m2-ul-konecznego-%C5%BCabiniec-2-pokoje/1002250847740911021047909",
//         "description": "ŻABINIEC *** Śliczne w pełni umeblowane i wyposażone (nowa pralka, nowa kuchenka \nelektryczna, nowa zmywarka, naczynia, garnki, odkurzacz, żelazko, deska \ndo prasowania itp) mieszkanie na Osiedlu Żabiniec w Krakowie (ul. \nFrycza-Modrzewskiego). Mieszkanie o powierzchni 50 m2 składa się z dwóch poziomów. Na \npierwszym znajduje się przedpokój, kuchnia, toaleta oraz przestronny \npokój dzienny z  ...",
//         "price": "1 600 zł",
//         "lifespan": "38 min temu",
//         "img": "Zdjęć: 6"
//     },
//     {
//         "title": "2 POKOJE *** 50 M2 *** UL. FRYCZA MODRZEWSKIEGO *** ŻABINIEC",
//         "url": "https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/krakow/2-pokoje-50-m2-ul-frycza-modrzewskiego-%C5%BCabiniec/1002250855420911208184909",
//         "description": "Śliczne w pełni umeblowane i wyposażone (nowa pralka, nowa kuchenka \nelektryczna, nowa zmywarka, naczynia, garnki, odkurzacz, żelazko, deska \ndo prasowania itp) mieszkanie na Osiedlu Żabiniec w Krakowie (ul. \nFrycza-Modrzewskiego). Mieszkanie o powierzchni 50 m2 składa się z dwóch poziomów. Na \npierwszym znajduje się przedpokój, kuchnia, toaleta oraz przestronny \npokój dzienny z balkonem (z m ...",
//         "price": "1 600 zł",
//         "lifespan": "40 min temu",
//         "img": "Zdjęć: 7"
//     }
// ]

// const sercz = {
//     url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/krowodrza+gorka/v1c9008q0p1?nr=2&pr=,1600',
//     keyword: 'Krowodrza Górka, max 1600 PLN, 2 pokoje',
//     shortkey: 'kgorka'
//   }

// Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db('domekjs');
//     const collection = db.collection('flats');

//     flatsArr.map(flat => {
//         flat.timestamp = new Date()
//         collection.insertOne(flat, ()=> {
//             console.log('inserted')
//         })
       
//     })

//     client.close().then((res) => {
//         console.log('closed connection:')
//     })

// });


const flatsDAO = {
    insertFlats(flatsArr, searchData) {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db('domekjs');
            const collection = db.collection('flats');

            flatsArr.map(flat => {
                flat.timestamp = new Date()
                flat.keyword = searchData.keyword
                flat.shortkey = searchData.shortkey
                collection.insertOne(flat, () => {
                    console.log('inserted')
                })

            })

            client.close().then((res) => {
                console.log('closed connection:')
            })

        });
    }
}

// flatsDAO.insertFlats(domki, sercz)

module.exports = {
    flatsDAO
};