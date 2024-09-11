const { PORT } = require('./src/envirment');
const express = require('express');
const route = express.Router()

route.get('/',(req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, ()=>console.log('server started on port 8000'))