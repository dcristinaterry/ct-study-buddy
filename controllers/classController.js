const db = require("../models")

module.exports = {

    // Find All the classes for one User
    findAllClasses: function (req, res) {
        console.log("all classes route hit")
        db.UserClass.findAll({
            where: {
                userid: req.params.id
            },
            include:{
                model: db.Class,
                attributes:["subject", "class", "section"]
            }
        }
        ).then(dbModelClass => {res.json(dbModelClass)
            // console.log(dbModelClass)
        })
            .catch(err => {res.status(422).json(err)
            console.log(err)});
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