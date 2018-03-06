
const { gumtreeExtractor } = require('./scrape');
const { writeFile } = require('./fileOperations')
const request = require('axios');
const fs = require('fs');
const jsonfile = require('jsonfile');
const async = require('async');
const pageDataFolder = '../mockup/';
const mailer = require('./mailSender');

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
  const scraped = gumtreeExtractor(pageData.data)
  return scraped
}


const getAllFlats = (myArray) => {
  const promises = myArray.map(async (flat) => {
    return await getGumtreeRequest(flat)

  });
  return Promise.all(promises);
}

(async function domek() {
  console.log('tu domczyk')
  const domek = await getAllFlats(gumtreeData)
  //flatten array
  const merged = [].concat.apply([], domek);
  //extract only fresh data
  const filtered = merged.filter((flat) => {
    return !!flat.lifespan.split(' ')[1] && flat.lifespan.split(' ')[1] == 'min'
  })
  //send mail
  mailer.mailSender.send(filtered)
  //done!

  //file save for test
  // var fs = require('fs');
  // let data = JSON.stringify(filtered, null, 2);
  // fs.writeFile("./domek1.json", data, function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log("The file was saved!");
  // });
})()






