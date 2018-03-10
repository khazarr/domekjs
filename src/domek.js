
const { gumtreeExtractor } = require('./scrape');
const { writeFile } = require('./fileOperations')
const request = require('axios');
const fs = require('fs');
const jsonfile = require('jsonfile');
const async = require('async');
const pageDataFolder = '../mockup/';
const mailer = require('./mailSender');
const db = require('./db');
const logger = require('./logger')

// const gumtreeData = [
//   {
//     url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/krowodrza+gorka/v1c9008q0p1?nr=2&pr=,1600',
//     keyword: 'Krowodrza Górka, max 1600 PLN, 2 pokoje',
//     shortkey: 'kgorka'
//   },
//   {
//     url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/zabiniec/v1c9008q0p1?nr=2&pr=,1600',
//     keyword: 'Żabiniec, max 1600 PLN, 2 pokoje',
//     shortkey: 'zabiniec'
//   },
//   {
//     url: 'https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/rondo+mogilskie/v1c9008q0p1?nr=2&pr=,1600',
//     keyword: 'Mogilskie, max 1600 PLN, 2 pokoje',
//     shortkey: 'mogilskie'
//   }
// ]

const domek = {
  async getGumtreeRequest(flat) {
    console.log('pytam: ' + flat.url);
    const pageData = await request(flat.url)
    const scraped = gumtreeExtractor(pageData.data)
    logger.info(new Date() + " domek sucessfuly scraped flats from " + flat.url)
    this.storeInDb(scraped,flat)
    return scraped
  },
  storeInDb(scrapedFlats, queryData) {
    scrapedFlats = scrapedFlats.filter((flat) => {
      return !!flat.lifespan.split(' ')[1] && (flat.lifespan.split(' ')[1] == 'min' )
     })
    db.flatsDAO.insertFlats(scrapedFlats,queryData)
  },
  getAllFlats(flatArray) {
    const promises = flatArray.map(async (flat) => {
      return await this.getGumtreeRequest(flat)

    });
    return Promise.all(promises);
  },
  async init(gumtreeData) {
    logger.info(new Date() + " domek started job")
    console.log('tu domczyk module')
    const flatsArray = await this.getAllFlats(gumtreeData)
    logger.info(new Date() + "domek sucessfuly stored flats in db")
    //flatten array
    const merged = [].concat.apply([], flatsArray);
    //extract only fresh data
    const filtered = merged.filter((flat) => {
      return !!flat.lifespan.split(' ')[1] && flat.lifespan.split(' ')[1] == 'min'
    })

    
    var fs = require('fs');
    let data = JSON.stringify(filtered, null, 2);
    fs.writeFile("../scraped/"+ new Date() +".json", data, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
      logger.info(new Date() + "domek saved file")
      logger.info(new Date() + "domek ended job")
      //send mail
      // mailer.mailSender.send(filtered)

      
    });

    return filtered;

  }
}


module.exports = {
  domek
};





/* 
for tests

domek.init()



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

async function domekFunc() {
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
}






*/