
const { gumtreeExtractor } = require('./scrape');
const { writeFile } = require('./fileOperations') 
const request = require('axios');
const fs = require('fs');
const jsonfile = require('jsonfile');
const async = require('async');
const pageDataFolder = '../mockup/';

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


 async function getGumtreeRequest(input) {
   console.log('pytam: ' + input.url);
   const pageData = await request(input.url)
   const res = await writeFile("../mockup/" + input.shortkey + '.txt', pageData.data)
   return res
 }


var q = async.queue(function(task, callback) {
    console.log('plik:  ' + task.fileName);
    callback();
}, 1);


// TO DO
// - rozbicie tego na 2 osobne kolejki
// najpierw requesty, pozniej skrobanie
// dodatkowo pierwsza kolejka na koniec wywołuje drugą




// Web Scrape Queue
var requestQueue = async.queue(function(task, callback) {
  console.log('plik:  ' + task.fileName);
  callback();
}, 1);

gumtreeData.map(flat => {
    requestQueue.push({fileName: flat.shortkey}, function(err) {
        getGumtreeRequest(flat)
    });
})

requestQueue.drain = () => {
  console.log('all URLS have been scraped')
};



const arrayOfArrays = []

// add scraping to queue
// fs.readdir(pageDataFolder, (err, files) => {
//   files.map(file => {
//     q.push({fileName: file}, function(err) {
//             arrayOfArrays.push(gumtreeExtractor(pageDataFolder + file))
//         });
//       })
// })

// q.drain = function() {

//     let merged = [].concat.apply([], arrayOfArrays);
//     let data = JSON.stringify(merged, null, 2);

//     fs.writeFile('../scraped/'+ String(new Date()).substr(0,24) + '.json', data, (err) => {
//         if (err) {
//           // reject(err);
//         } else {
//           console.log('Data written to file');
//           // resolve(result)
//         }
//       })
//       console.log('all files have been processed');

// };
