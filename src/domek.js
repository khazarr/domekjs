
const { gumtreeExtractor, olxExtractor } = require('./scrape');
const { writeFile } = require('./fileOperations')
const gumtreeData  = require('./inputFlatData/gumtreeData')
const olxData  = require('./inputFlatData/olxData')
const request = require('axios');
const fs = require('fs');
const jsonfile = require('jsonfile');
const async = require('async');
const pageDataFolder = '../mockup/';
const mailer = require('./mailSender');
const db = require('./db');
const logger = require('./logger')



const domek = {
  provider: null,
  async getGumtreeRequest(flat) {
    console.log('pytam: ' + flat.url);
    const pageData = await request(flat.url)
    const scraped = gumtreeExtractor(pageData.data)
    logger.info(new Date() + " domek sucessfuly scraped flats from " + flat.url)
    this.storeInDb(scraped,flat)
    return scraped
  },
  async getOlxRequest(flat) {
    console.log('pytam: ' + flat.url);
    const pageData = await request(flat.url)
    const scraped = olxExtractor(pageData.data)
    logger.info(new Date() + " domek sucessfuly scraped  flats from " + flat.url)
    this.storeInDb(scraped, flat)
    return scraped
  },
  gumtreeFilterOnlyLastHourFlats(scrapedFlats) {
     return scrapedFlats.filter((flat) => {
      return !!flat.lifespan.split(' ')[1] && (flat.lifespan.split(' ')[1] == 'min' )
     })
  },
  storeInDb(scrapedFlats, queryData) {
    
    if (this.provider === 'gumtree') {
      scrapedFlats = this.gumtreeFilterOnlyLastHourFlats(scrapedFlats)
    }

    db.flatsDAO.insertFlats(
      scrapedFlats,
      queryData, 
      this.provider
    )
  },
  getAllFlats(flatArray, provider) {
    const promises = flatArray.map(async (flat) => {

      if (provider === 'gumtree') {
        return await this.getGumtreeRequest(flat)
      }

      if (provider === 'olx') {
        return await this.getOlxRequest(flat)
      }

    });
    return Promise.all(promises);
  },
  async init({
    inpuFlatsArray,
    provider
  }) {
    logger.info(new Date() + " domek started job")
    logger.info(new Date() + " data type: " + provider)
    this.provider = provider
    console.log('tu domczyk module ' + provider)
    const flatsArray = await this.getAllFlats(inpuFlatsArray, provider)
    logger.info(new Date() + "domek sucessfuly stored flats in db")
    //flatten array
    const merged = [].concat.apply([], flatsArray);


    //extract only fresh data
    // const filtered = merged.filter((flat) => {
    //   return !!flat.lifespan.split(' ')[1] && flat.lifespan.split(' ')[1] == 'min'
    // })

    
    var fs = require('fs');
    let data = JSON.stringify(merged, null, 2);
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

    // return filtered;

  }
}


module.exports = {
  domek
};


// domek.init({
//   inpuFlatsArray: gumtreeData.gumtreeArray,
//   provider: 'gumtree'
// })

domek.init({
  inpuFlatsArray: olxData.olxArray,
  provider: 'olx'
})


// var cron = require('node-cron');

// cron.schedule('0 * * * *', function () {
//   console.log('running a task every 10 sec');
//   domek.init(gumtreeData)
// });
// module.exports = {
//   domek
// };

// domek.init(gumtreeData.gumtreeArray)
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