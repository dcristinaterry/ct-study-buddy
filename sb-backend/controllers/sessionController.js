const db = require("../models")

module.exports = {

    // // all the session that a user created
    // findAllUserSessions: function (req, res) {
    //     db.UserSession.findAll({
    //         where: {
    //             userId: req.params.userid
    //         },
    //         // join session table
    //         include: {
    //             model: db.Session,
    //             // join with user table
    //             include: {
    //                 model: db.User,
    //                 as: "userId"
    //             }
    //         }
    //     }
    //     ).then(dbModelClass => res.json(dbModelClass))
    //         .catch(err => res.status(422).json(err));
    // },

    // // selec * from table a a join table b b where a.id = b.id
    // findAllSessionsAllClasses: function (req, res){
    //     db.tablea.findAll({
    //         where: {
    //             userId: req.params.userid
    //         },
       
    //     }).then(findAllClassesResponse => {
    //         //  get all the sessions for all those classes
          

    //     })
    // },

    // findOneSessionForUser: function (req, res) {
    //     db.Session.findById({
    //         where: {
    //             userId: req.params.userid,
    //             Id: req.params.Sessionid,
    //         }
    //     })
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // create: function (req, res) {
    //     db.Session.create(req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // update: function (req, res) {
    //     db.Session.update(req.body,
    //         {
    //             where:
    //             {
    //                 id: req.params.Sessionid
    //             }
    //         })
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },

    // remove: function (req, res) {
    //     db.Session.destroy({ where: { id: req.params.Sessionid } })
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // }
}