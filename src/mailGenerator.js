// reminder
// const a = '%FLAT_URL%';
// const b = '%FLAT_TITLE%'
// const c = '%FLAT_DESCRIPTION%'
// const d = '%FLAT_LIFESPAN%'
// const e = '%FLAT_PRICE%'
// const f = '%FLAT_PHOTO_INFO%'


const EmailGeneratorModule = {
    generateSingleFlatHTML({
        flatUrl,
        flatTitle,
        flatDescription,
        flatLifespan,
        flatPrice,
        flatPhotoInfo
    } = {}) {
        const emailTemplate = `<table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #FFFFFF;width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"><div style="background-color:transparent;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div class=""><div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> <div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center"><hr><strong>${flatTitle}</strong></p></div></div></div><div class=""><div style="color:#AAAAAA;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> <div style="font-size:12px;line-height:14px;color:#AAAAAA;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px">${flatDescription}</p></div></div></div></div></div></div></div></div></div><div style="background-color:transparent;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid two-up "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num6" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div class=""><div style="color:#444444;line-height:120%;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> <div style="font-size:12px;line-height:14px;font-family:Roboto, Tahoma, Verdana, Segoe, sans-serif;color:#444444;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 12px; line-height: 14px;">${flatLifespan}</span></p></div></div></div><div class=""><div style="color:#555555;line-height:120%;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> <div style="font-size:12px;line-height:14px;font-family:Roboto, Tahoma, Verdana, Segoe, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 12px; line-height: 14px;">${flatPrice}</span></p></div></div></div><div class=""><div style="color:#555555;line-height:120%;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"> <div style="font-size:12px;line-height:14px;font-family:Roboto, Tahoma, Verdana, Segoe, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 12px; line-height: 14px;">${flatPhotoInfo}</span></p></div></div></div></div></div></div><div class="col num6" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div align="center" class="button-container center " style="padding-right: 30px; padding-left: 30px; padding-top:30px; padding-bottom:30px;"><a href="${flatUrl}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #3AAEE0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 110px; width: 20px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 10px; padding-right: 45px; padding-bottom: 10px; padding-left: 45px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;mso-border-alt: none"> <span style="font-size:16px;line-height:32px;">Przejdź</span></a></div></div></div></div></div></div></div></td></tr></tbody></table>`
        return emailTemplate
    },
    generateHeader() {
        const timestamp = String(new Date()).substr(4, 20);
        return ` <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #FFFFFF;width: 100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align: top"><td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <div style="background-color:#AAAAAA;"> <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid "> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;"> <div style="background-color: transparent; width: 100% !important;"> <div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <div class=""><div style="color:#444444;line-height:120%;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><div style="font-size:12px;line-height:14px;font-family:Roboto, Tahoma, Verdana, Segoe, sans-serif;color:#444444;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center"><span style="font-size: 24px; line-height: 28px;">Mieszkanka<br>${timestamp}</span></p></div></div></div></div></div></div></div></div></div></td></tr></tbody> </table>`;
    },
    generateWholeEmailHTML(arrayOfFlats) {
        let outputHTMLString = "";
        outputHTMLString += this.generateHeader();
        arrayOfFlats.map(flat => {
            outputHTMLString += this.generateSingleFlatHTML({
                flatDescription: flat.description,
                flatLifespan: flat.lifespan,
                flatPhotoInfo: flat.img,
                flatPrice: flat.price,
                flatTitle: flat.title,
                flatUrl: flat.url
            })
        })
        return outputHTMLString;
    }
}


module.exports = {
    EmailGeneratorModule,
};

// TESTS

// var fs = require('fs');
// let dataArr;
// fs.readFile('/home/kari/aws-node-projects/domekNode/scraped/flats.json', 'utf8', function (err, data) {
//     if (err) throw err;
//     dataArr = JSON.parse(data);
//     const HTML = EmailGeneratorModule.generateWholeEmailHTML(dataArr)
//     fs.writeFile("./mail.html",HTML, function (err) {
//         if (err) {
//             return console.log(err);
//         }

//         console.log("The file was saved!");
//     });
// });


// const example = {
//     title: "2 POKOJE *** 50 M2 *** UL. KLUCZBORSKA **** KROWODRZA GÓRKA",
//     url: "https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/krakow/2-pokoje-50-m2-ul-kluczborska-krowodrza-g%C3%B3rka/1002243676300911208320509",
//     description: "Mieszkanie dwupokojowe z kuchnią, łazienką i balkonem, o powierzchni 50 m2 z miejscem postojowym w garażu. Mieszkanie na 3-cim piętrze z dostępem do windy. Wyposażone w komplet mebli kuchennych z lodówką, kompletem wypoczynkowym w pokoju dziennym, wersalką w sypialni, dwiema szafami i meblościanką.OPŁATY: 1300 PLN + 600 PLN + prądTEL: 536-395-146Nr ogłoszenia: 762",
//     price: "1 300 zł",
//     lifespan: "28 min temu",
//     img: "Zdjęć: 12"
// }

// const obtainedTemplate = EmailGeneratorModule.generateSingleFlatHTML({
//     flatDescription: example.description,
//     flatLifespan: example.lifespan,
//     flatPhotoInfo: example.img,
//     flatPrice: example.price,
//     flatTitle: example.title,
//     flatUrl: example.url
// })

// var fs = require('fs');
// fs.writeFile("./mail.html", EmailGeneratorModule.generateHeader() + obtainedTemplate + obtainedTemplate, function (err) {
//     if (err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 