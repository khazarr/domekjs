const cheerio = require('cheerio');
const fs = require('fs');

const readed = fs.readFileSync('gumtree1.txt', 'utf8');



let data = JSON.stringify(gumtreeExtractor(readed), null, 2);

fs.writeFile('output.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

function gumtreeExtractor(html) {

  const result = [];
  const $ = cheerio.load(html);

  const titles = [];
  const urls = [];
  const descriptions = [];
  const prices = [];
  const imgs = [];
  const lifespans = [];

  $('.href-link').each(function(i, elem) {
    const title = $(this).text();
    const url = 'https://www.gumtree.pl' + $(this).attr('href');
    const description = $(this).parent().next().text()

    titles.push(title)
    urls.push(url)
    descriptions.push(description)
  });

  $('.amount').each(function(i, elem) {
    const price = $(this).text();
    prices.push(price)
  });

  $('#pht-cnt').each(function(i, elem) {
    const img = $(this).text();
    imgs.push(img)
  });

  $('.creation-date').each(function(i, elem) {
    const dateRead = $(this).children().text()


    if(dateRead.split(' ').length === 1) {
      // console.log(dateRead.split('-'))
      let today = new Date().getDate();
      let hours = (today - Number(dateRead.split('-')[0])) * 24
      // console.log( hours + ' godz')
      lifespans.push(hours + ' godz')
    } else if (dateRead.split(' ').length === 3) {
      // console.log(dateRead.split(' ')[0] + ' ' + dateRead.split(' ')[1])
      lifespans.push(dateRead.split(' ')[0] + ' ' + dateRead.split(' ')[1])
    }
  });


  for (let i = 0; i < titles.length; i++) {
    result.push({
      title: titles[i],
      url: urls[i],
      description: descriptions[i],
      price: prices[i],
      img: imgs[i],
      lifespan: lifespans[i]
    })
  }
  return result
}

module.exports = {
  gumtreeExtractor
};
