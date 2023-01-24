const express = require('express') //nap thu vien
const app = express() // express dc coi mot function de su dung 
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
}) //arrow funtion

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})