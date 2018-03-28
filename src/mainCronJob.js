const cron = require('node-cron');
const gumtreeData = require('./inputFlatData/gumtreeData')
const olxData = require('./inputFlatData/olxData')
const domekModule = require('./domek')

cron.schedule('* 22 * * *', function () {
    logger.info(new Date() + " cron running olx job")
    domekModule.domek.init({
        inpuFlatsArray: olxData.olxArray,
        provider: 'olx'
    })

});

cron.schedule('30 * * * *', function () {
    logger.info(new Date() + " cron running gumtree job")
    domekModule.domek.init({
        inpuFlatsArray: gumtreeData.gumtreeArray,
        provider: 'gumtree'
    })
});



