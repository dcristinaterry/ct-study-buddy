const db = require("../models")

module.exports = {
    findAllLocations: function(req,res) {
        console.log("getting all locations  before query")
        db.Location.findAll({})
        .then(dbModel => {
            res.json(dbModel)
        console.log("getting all locations")
        })
        .catch(err => res.status(422).json(err)
        );
    },
    findLocationById: function(req, res) {
        db.Location.findById({
            where: {id: req.params.locationId}
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Location.create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Location.updat({
            where: {id: req.params.locationId}}, 
            req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Location.findById({
            where: {id: req.params.locationId}})
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
}