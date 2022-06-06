const mongoose = require('mongoose')
const url = 'mongodb://localhost/sodaDiner'

mongoose.Promise = global.Promise

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('open', () => {
    console.log(`mongoose connected to ${url}`)
})
mongoose.connection.on('error', (err) => {
    console.log(`mongooose connection error: ${err}`)
})


