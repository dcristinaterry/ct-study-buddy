const db = require("../models")

module.exports = {

    // Find All the classes for one User
    findAllClasses: function (req, res) {
        db.UserClass.findAll({
            where: {
                userId: req.params.userid
            },
        }
        ).then(dbModelClass => res.json(dbModelClass))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Class.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Class.update(req.body,
            {
                where:
                {
                    id: req.params.classid
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Class.destroy({ where: { id: req.params.classid } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}