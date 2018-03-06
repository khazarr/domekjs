const mailSender = {
    send(flatsArray) {
        const mailGenerator = require('./mailGenerator');
        const secrets = require('../secret/keys');
        const HTML = mailGenerator.EmailGeneratorModule.generateWholeEmailHTML(flatsArray)
        const mailjet = require('node-mailjet').connect(secrets.MJ_PUBLIC, secrets.MJ_SECRET)
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "k.swieca1@gmail.com",
                            "Name": "Domek JS"
                        },
                        "To": [
                            {
                                "Email": "k.swieca1@gmail.com",
                                "Name": "Kari"
                            }
                        ],
                        "Subject": "Mieszkanka " + String(new Date()).substr(4, 20),
                        "HTMLPart": HTML
                    }
                ]
            })
        request
            .then((result) => {
                console.log('mail sent')
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}


module.exports = {
    mailSender
};

// tests

// var fs = require('fs');
// let dataArr;
// fs.readFile('/home/kari/aws-node-projects/domekNode/scraped/flats.json', 'utf8', function (err, data) {
//     if (err) throw err;
//     dataArr = JSON.parse(data);
//     mailSender.send(dataArr)

// });