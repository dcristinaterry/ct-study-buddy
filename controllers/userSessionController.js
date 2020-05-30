const db = require("../models")

module.exports = {

    create: function (req, res){
        console.log("post route for userSession hit")
        console.log(req.body)
        db.UserSession.create(req.body)
        .then(dbModel => {res.json(dbModel)
        console.log(dbModel)})
        .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        console.log("destroy route for userSession hit")
        console.log(req)
        db.UserSession.destroy({ where: { id: req.params.sessionid } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

}