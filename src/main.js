const express = require('express')
const bodyParser = require('body-parser')
const domekJs = require('./domek');
const app = express()


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/domek', (req, res) => {
  console.log(req.body.gumtreeData)
    domekJs.domek.init(req.body.gumtreeData).then((results) => {
      res.send(results)
    })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
