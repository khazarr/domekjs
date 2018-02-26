const cheerio = require('cheerio');

function gumtreeExtractor(html) {

  const result = [];
  const $ = cheerio.load(html);

  const titles = [];
  const urls = [];
  const descriptions = [];

  $('.href-link').each(function(i, elem) {
    const title = $(this).text();
    const url = $(this).attr('href');
    const description = $(this).parent().next().text()

    console.log($(this).text())
    console.log($(this).attr('href'))
    console.log($(this).parent().next().text())

    titles.push(title)
    urls.push(url)
    descriptions.push(description)
  });
  return result
}

module.exports = {
  gumtreeExtractor
};
