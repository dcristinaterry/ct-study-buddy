const db = require("../models")

module.exports = {

    findAll: function(req, res) {
        db.Session.findAll( {
            where:{
                userId: req.params.userid
            }
        }).then(dbModelSession => res.json(dbModelSession))
          .catch(err => res.status(422).json(err));
      },
      
      findOneSessionForUser: function(req, res) {
        db.Session.findById({
            where:{
                userId: req.params.userid,
                Id: req.params.Sessionid,
            }
        })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        db.Session.create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      update: function(req, res) {
        db.Session.update(req.body, 
            { where :
                { 
                    id: req.params.Sessionid 
                }
            }, )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      remove: function(req, res) {
        db.Session.destroy({ where: {id : req.params.Sessionid}})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}