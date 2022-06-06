const Soda = require('../models/soda')

module.exports = {
    addSoda(req, res) {
        Soda.create(req.body)
            .then(soda => res.json(soda))
            .catch(err => res.status(500).json(err))
    },
    getAllSodas(req, res) {
        Soda.find()
            .then((sodas) => res.json(sodas))
            .catch(err => res.status(500).json(err))
    },
    getSingleSoda(req, res) {
        let sodaId = req.params.id
        Soda.findById({ _id: sodaId })
            .then(soda => {
                res.json(soda)
            })
            .catch(err => res.status(500).json(err))
    },
    deleteSoda(req, res) {
        let { id } = req.params
        Soda.findByIdAndDelete(id)
            .then(soda =>
                res.json(soda))
            .catch(err => res.status(500).json(err))
    }
}