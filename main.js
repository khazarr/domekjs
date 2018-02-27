const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/halko', (req, res) => {

// http://localhost:3000/halko?q=superko
  res.send('pytales o:' + info)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
