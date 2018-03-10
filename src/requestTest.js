const request = require('axios');

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



var cron = require('node-cron');

cron.schedule('*/10 * * * * *', function () {
    console.log('running a task every 10 sec');

    request.post('http://localhost:3000/domek', {
        gumtreeData
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});