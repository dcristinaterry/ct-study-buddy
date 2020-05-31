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
        console.log(req.params.session, req.params.user)
        db.UserSession.destroy({ where: { SessionId: req.params.session, UserId: req.params.user } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

}