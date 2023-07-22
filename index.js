const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4000

app.use = cors();
app.use = (express.json());

app.get('/',(req, res) => {
    res.send('this server is runing fine')
})

app.listen(port, () => {
    console.log(`this server runing port ${port}`)
})