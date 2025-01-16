import { PORT } from '../envirment';
const express = require('express');
const app = express()

app.listen(PORT, ()=>console.log('server started'))