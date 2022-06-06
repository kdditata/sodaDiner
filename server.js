const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const cors=require('cors')
const routes = require('./routes/routes')
const PORT = process.env.PORT || 6020
require('./config/database')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors())

global.__basedir = __dirname;

routes(app)

module.exports = app
app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
 })

