const request = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const testUrl = 'https://www.olx.pl/nieruchomosci/mieszkania/wynajem/krakow/q-mogilska/?search%5Bfilter_float_price%3Ato%5D=1600&search%5Bfilter_enum_rooms%5D%5B0%5D=two';



const olxModule = {
    async getAndSavePageData () {
        const pageData = await request(testUrl)
        fs.writeFile("./olx.txt", pageData.data, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
    },
    scrape() {
        const readed = fs.readFileSync('olx.txt', 'utf8');
        const $ = cheerio.load(readed);

        const titles = [];
        const urls = [];
        const urlsNoHash = [];
        const descriptions = [];
        const prices = [];
        const pricesFiltered = [];
        const imgs = [];
        const lifespans = [];
        const imagesAvailible = []

        
        $('.detailsLink.link').each(function (i, elem) {
            // console.log($(this).text())
            const title = $(this).children().text();
            titles.push(title)
            console.log(title)

            const url = $(this).attr('href')
            const urlWithoutHash = url.split('#')[0]
            urls.push(url)
            urlsNoHash.push(urlWithoutHash)
        });

        $('p.price').each(function (i, elem) {
            // console.log($(this).text())
            const price = $(this).children().text();
            const priceFiltered = price.split(' ').slice(0, -1).join('');

            prices.push(price)
            pricesFiltered.push(priceFiltered)


        });

        $('p.color-9.lheight16.marginbott5.x-normal').each(function (i, elem) {
            // console.log($(this).text())
            const lifespan = $(this).text().split('                                ');
            console.log(lifespan)
            lifespans.push(lifespan)



        });



        // console.log(titles)
        // console.log(urls)
        console.log(prices)
        console.log(pricesFiltered)
        console.log(lifespans)
    }

}

olxModule.scrape()