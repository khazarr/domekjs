
const { gumtreeExtractor } = require('./scrape');
const { readFile, writeFile} = require('./fileOperations')
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
  }
]

let temp = [
  'gumtree1.txt',
  'gumtree2.txt',
  'zabiniec.txt'
];

 async function getGumtreeRequest(input) {
   console.log('pytam: ' + input.url);
   const pageData = await request(input.url)
   const res = await writeFile("../mockup/" + input.shortkey + '.txt', pageData.data)
   return res
 }

// async function scrapeGumtreePageRequest(filename) {
//   const scraped = await gumtreeExtractor(pageDataFolder + filename)
//   console.log(scraped)
//   return scraped
//   // console.log(scraped)
// }

// function scrapeGumtreePageRequest(filename) {
//   console.log(filename + ' done')
//   return new Promise(function(resolve, reject) {
//       resolve(gumtreeExtractor(pageDataFolder + filename))
//     })
// }

// scrapeGumtreePageRequest(temp[0])

 // getGumtreeRequest(gumtreeData[1])

// temp array




var q = async.queue(function(task, callback) {
    console.log('plik:  ' + task.fileName);
    callback();
}, 1);


// add request to queue

// gumtreeData.map(flat => {
//     q.push({fileName: flat.shortkey}, function(err) {
//         getGumtreeRequest(flat)
//     });
// })

const arrayOfArrays = []

// add scraping to queue
fs.readdir(pageDataFolder, (err, files) => {
  files.map(file => {
    q.push({fileName: file}, function(err) {
            arrayOfArrays.push(gumtreeExtractor(pageDataFolder + file))
        });
      })
})

q.drain = function() {
    let merged = [].concat.apply([], arrayOfArrays);


    let data = JSON.stringify(merged, null, 2);


    fs.writeFile('../scraped/'+ String(new Date()).substr(0,24) + '.json', data, (err) => {
        if (err) {
          // reject(err);
        } else {
          console.log('Data written to file');
          // resolve(result)
        }
      })
      console.log('all files have been processed');

};


// TO DO
// - rozbicie tego na 2 osobne kolejki
// najpierw requesty, pozniej skrobanie
// dodatkowo pierwsza kolejka na koniec wywołuje drugą
