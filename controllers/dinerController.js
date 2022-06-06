const Diner = require('../models/diner')
const Soda = require('../models/soda')

module.exports = {
    addDiner(req, res) {
        Diner.create(req.body)
            .then(diner => res.json(diner))
            .catch(err => res.status(500).json(err))
    },
    getAllDiners(req, res) {
        Diner.find()
            .then((diners) => res.json(diners))
            .catch(err => res.status(500).json(err))
    },
    getSingleDiner(req, res) {
        let dinerId = req.params.id
        Diner.findById({ _id: dinerId }).populate('sodas').exec()
            .then(data => {
                if (data !== null) {
                    let sodas = []
                    for (let i = 0; i < data.length; i++) {
                        let name = data.sodas[i].name
                        let sodaId = data.sodas[i]._id
                        sodas.push({
                            name: name,
                            id: sodaId,
                        })
                    }
                }
                res.json(data)
            })
            .catch(err => res.status(500).json(err))
    },
    deleteDiner(req, res) {
        let { id } = req.params
        Diner.findByIdAndDelete(id)
            .then(diner =>
                res.json(diner))
            .catch(err => res.status(500).json(err))
    },
    findSoda(req, res) {
        Soda.find()
            .then(sodas =>
                res.json(sodas))
            .catch(err => res.status(500).json(err))
    },
    addSodaToDiner(req, res) {
        Diner.updateOne({ _id: req.params.id }, { $push: { sodas: req.params.sodaId } })
            .then(sodas => {
                res.json(sodas)
            })
            .catch(err => res.status(500).json(err))
    },
    stopSodas(req, res) {
        Diner.updateOne({ _id: req.params.id }, { $pull: { sodas: req.params.sodaId } })
            .then(soda => {
                res.json(soda)
            })
            .catch(err => res.status(500).json(err))
    }
}