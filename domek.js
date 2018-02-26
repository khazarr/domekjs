
const { gumtreeExtractor } = require('./helpers');
const request = require('axios');
const fs = require('fs');
const jsonfile = require('jsonfile');

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



 async function getGumtreeRequest(input) {
   const pageData = await request(input.url)
   fs.writeFile('gumtree2.txt', pageData.data, 'utf8');
 }


 getGumtreeRequest(gumtreeData[1])
