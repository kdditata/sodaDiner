const DinerController = require('../controllers/dinerController')
const SodaController = require('../controllers/sodaController')

module.exports = (app) => {
    let path = __basedir + '/views/'
    app.get('/', (req, res) => {
        res.sendFile(path + 'index.html')
    })
    app.get('/allDiners', (req, res) => {
        res.sendFile(path + 'diners.html')
    })
    app.get('/allSodas', (req, res) => {
        res.sendFile(__basedir + '/views/sodas.html')
    })
    //get diners
    app.get('/api/allDiners', DinerController.getAllDiners)
    app.get('/api/allDiners/:id', DinerController.getSingleDiner)
    //get sodas
    app.get('/api/allSodas', SodaController.getAllSodas)
    app.get('/api/allSodas/:id', SodaController.getSingleSoda)
    //find sodas available
    app.get('/api/findSoda/:id', DinerController.findSoda)
    //add soda to diner
    app.put('/api/addSodaToDiner/:id/:sodaId', DinerController.addSodaToDiner)
    //add diner
    app.post('/api/addDiner', DinerController.addDiner)
    //add soda
    app.post('/api/addSoda', SodaController.addSoda)
    //stop serving sodas
    app.post('/api/stopSoda/:id/:sodaId', DinerController.stopSodas)
    //delete diner
    app.delete('/api/deleteDiner/:id', DinerController.deleteDiner)
    //delete soda
    app.delete('/api/deleteSoda/:id', SodaController.deleteSoda)
}
