const cheerio = require('cheerio');
const fs = require('fs');





function gumtreeExtractor(html) {

  // const readed = fs.readFileSync(html, 'utf8');
  const result = [];
  const $ = cheerio.load(html);
  // const $ = cheerio.load(readed);

  const titles = [];
  const urls = [];
  const descriptions = [];
  const prices = [];
  const pricesFiltered = [];
  const imgs = [];
  const lifespans = [];
  const imagesAvailible = []

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

    const priceFilered = price.split(' ').slice(0,-1).join('')
    pricesFiltered.push(priceFilered)
  });

  $('#pht-cnt').each(function(i, elem) {
    const img = $(this).text();
    imgs.push(img)
  });

  $('.result').each(function(i, elem) {
    const hasImg = $(this).hasClass('pictures');
    imagesAvailible.push(hasImg)
  });

  $('.creation-date').each(function(i, elem) {
    const dateRead = $(this).children().text()


    // NEED FIX
    // if(dateRead.split(' ').length === 1) {
    //   // console.log(dateRead.split('-'))
    //   let today = new Date().getDate();
    //   let hours = (today - Number(dateRead.split('-')[0])) * 24
    //   // console.log( hours + ' godz')
    //   lifespans.push(hours + ' godz')
    // } else if (dateRead.split(' ').length === 3) {
    //   // console.log(dateRead.split(' ')[0] + ' ' + dateRead.split(' ')[1])
    //   lifespans.push(dateRead.split(' ')[0] + ' ' + dateRead.split(' ')[1])
    // }
    lifespans.push(dateRead)

  });

  for (let i = 0; i < titles.length; i++) {
    const flat = {
      title: titles[i],
      url: urls[i],
      description: descriptions[i],
      price: prices[i],
      priceFiltered: pricesFiltered[i],
      lifespan: lifespans[i]
    }

    if(imagesAvailible[i]) {
      flat.img = imgs[i]
    } else {
      flat.img = "Brak zdjęć"
    }

    result.push(flat)


  }

  return result

}

function olxExtractor(html) {
    const $ = cheerio.load(html);

    const titles = [];
    const urls = [];
    const urlsNoHash = [];
    const prices = [];
    const pricesFiltered = [];
    const lifespans = [];


    $('.detailsLink.link').each(function (i, elem) {
      const title = $(this).children().text();
      titles.push(title)

      const url = $(this).attr('href')
      const urlWithoutHash = url.split('#')[0]
      urls.push(url)
      urlsNoHash.push(urlWithoutHash)
    });

    $('p.price').each(function (i, elem) {
      const price = $(this).children().text();
      const priceFiltered = price.split(' ').slice(0, -1).join('');

      prices.push(price)
      pricesFiltered.push(priceFiltered)


    });

    $('p.color-9.lheight16.marginbott5.x-normal').each(function (i, elem) {
      const lifespan = $(this).text();

      function extractLifespan(lifespan) {
        let firstFilter = lifespan.slice(lifespan.search(/\S/));
        let reg = /\S+\s+\S+/g;
        let arr = reg.exec(firstFilter);
        return arr[0];
      }

      lifespans.push(extractLifespan(lifespan))



    });

    const result = [];
    for (let i = 0; i < titles.length; i++) {
      const flat = {
        title: titles[i],
        url: urls[i],
        urlNoHash: urlsNoHash[i],
        price: prices[i],
        priceFiltered: pricesFiltered[i],
        lifespan: lifespans[i]
      }
      result.push(flat)
    }

    return result
}

module.exports = {
  gumtreeExtractor,
  olxExtractor
};
