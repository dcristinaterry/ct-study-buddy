const db = require("../models")

module.exports = {

    // // all the sessions for a user where the user is a participant
    findAllUserSessions: function (req, res) {
        db.UserSession.findAll({
            where: {
                userId: req.params.userid
            },
            // join session table
            include: {
                model: db.Session,
                attributes: ["subject", "location", "createdAt", "hostId"],
                include: {
                    model: db.Class,
                    attributes: ["subject", "class"]
                }
            }
        }
        ).then(dbModelSession => res.json(dbModelSession))
            .catch(err => res.status(422).json(err));
    },

    // find all sessions where the user is a HOST
    findAllSessionsAsHost: function (req, res) {
        db.Session.findAll({
            where: {
                host: req.params.userid
            },
            // join session table
            include: [{
                model: db.Class,
                attributes: ["subject", "class"]
            },

            {
                model: db.Location,
                attributes: ["building", "room"]
            }]

        }
        ).then(dbModelSession => res.json(dbModelSession))
            .catch(err => res.status(422).json(err));
    },


    // // selec * from table a a join table b b where a.id = b.id
    findAllSessionsAllClasses: function (req, res) {
        // console.log("got called ", req.params.userid)
        db.UserClass.findAll({
            where: { userId: req.params.userid },
            include: {
                model: db.Class,
                    include: {
                        model: db.Session,
                        include:{
                            model: db.User, as: 'host',
                            attributes:["firstName", "lastName", "image"]
                        }
                    
                    }
                   
                
            }
        })
            .then(findAllSR=> {

    
                let allSessions = []

                // console.log("printing 1", findAllSR)
                for(let i = 0; i<findAllSR.length; i++ ){
                    // obj.classId= findAllSR[i].id;

                    //  console.log("printing 1", findAllSR[i].Class.dataValues)
                    let tempSessions = [...[]];

                    // console.log("length sessions: ", findAllSR[i].Class.Sessions.length )

                    if(findAllSR[i].Class.Sessions.length > 0){
                        // console.log("Greather than 0")
                        tempSessions = [...findAllSR[i].Class.Sessions]
                        // console.log(tempSessions)
                        for(let j = 0 ; j<tempSessions.length ; j++){
                            
                                sessiontempObj = tempSessions[j].dataValues
                                const sessionObject ={}
                                sessionObject.sessionId=sessiontempObj.id
                                sessionObject.hostid=sessiontempObj.hostId
                                sessionObject.userImage=sessiontempObj.host.dataValues.image
                                sessionObject.userName=sessiontempObj.host.dataValues.firstName + " " + sessiontempObj.host.dataValues.lastName
                                sessionObject.classId=findAllSR[i].Class.dataValues.id
                                sessionObject.className=findAllSR[i].Class.dataValues.subject + " " + findAllSR[i].Class.dataValues.class 
                                sessionObject.sessionSubject=tempSessions[j].dataValues.subject
                                sessionObject.sessionDate=tempSessions[j].dataValues.sessionDate

                                // console.log("created object", sessionObject)

                                allSessions.push(sessionObject)
                        }
                    }
                }
                console.log(allSessions)
                // can this be an array of objects?
                res.json(allSessions)
            })
    },

    findAllSessionsOneClasses: function (req, res) {

        db.UserClass.findAll({
            where: { userId: req.params.id,
                    classId: req.params.id },
            include: {
                model: db.Class,
                include: {
                    model: db.ClassSession,
                    include: {
                        model: db.Session
                    }
                }
            }
        })
            .then(findAllSessionsResponse => res.json(findAllSessionsResponse))
    },


    findOneSessionForUser: function (req, res) {
        db.Session.findById({
            where: {
                userId: req.params.userid,
                Id: req.params.sessionid,
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    create: function (req, res) {
        db.Session.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    update: function (req, res) {
        db.Session.update(req.body,
            {
                where:
                {
                    id: req.params.sessionid
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    remove: function (req, res) {
        db.Session.destroy({ where: { id: req.params.Sessionid } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}