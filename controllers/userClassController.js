const db = require("../models")

module.exports = {

    assignClassUser: function (req, res){
        db.UserClass.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }


}