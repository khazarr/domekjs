/**
* This call sends an email to one recipient, using a validated sender address
* Do not forget to update the sender address used in the sample
*/

const secrets = require('../secret/keys');
const mailjet = require ('node-mailjet')
    .connect(secrets.MJ_PUBLIC, secrets.MJ_SECRET)
const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
                {
                        "From": {
                                "Email": "k.swieca1@gmail.com",
                                "Name": "Mieszkanko"
                        },
                        "To": [
                                {
                                        "Email": "k.swieca1@gmail.com",
                                        "Name": "Kari"
                                }
                        ],
                        "Subject": "Your email flight plan!",
                        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": ``
                }
        ]
    })
request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err)
    })
