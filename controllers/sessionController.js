const db = require("../models")
const moment = require("moment")

module.exports = {

    //========================================================================
    // find all sessions where the user is a Participant

    findAllParticipatinSessions: function (req, res) {
        // console.log("getting all participating sessions")
        db.UserSession.findAll({
            where: {
                userId: req.params.userid
            },
            // join session table
            include: {
                model: db.Session,
                include: [{
                    model: db.Class,
                    attributes: ["subject", "class"]
                },
                {
                    model: db.User, as: "host",
                    attributes: ["firstName", "lastName", "image"]
                },
                ]
            }
        }
        ).then(participatingSessions => {

            // console.log(participatingSessions)
            let allSessions = [];

            for (let i = 0; i < participatingSessions.length; i++) {

                // console.log(participatingSessions[i].dataValues.Session)

                let sessionInfo = participatingSessions[i].dataValues.Session.dataValues
                let classInfo = participatingSessions[i].dataValues.Session.Class.dataValues
                let hostInfo = participatingSessions[i].dataValues.Session.host.dataValues

                // console.log("session Info:  ", sessionInfo);
                // console.log("classInfo", classInfo)
                // console.log("hostInfo", hostInfo)

                const sessionObject = {}
                sessionObject.sessionId = sessionInfo.id
                sessionObject.hostid = sessionInfo.hostId
                sessionObject.hostImage = hostInfo.image
                sessionObject.hostName = hostInfo.firstName + " " + hostInfo.lastName
                sessionObject.classId = sessionInfo.ClassId
                sessionObject.className = classInfo.subject + " " + classInfo.class
                sessionObject.sessionSubject = sessionInfo.subject
                let formattedDate = moment(sessionInfo.sessionDate).format("M-D-YY hh:mm")
                console.log("formatted date", formattedDate)
                sessionObject.sessionDate = formattedDate

                // console.log("created object", sessionObject)
                allSessions.push(sessionObject)
            }
            res.json(allSessions)

        })
         .catch(err => res.status(422).json(err));
    },

    //========================================================================
    // find all sessions where the user is a HOST

    findAllSessionsAsHost: function (req, res) {
        
        db.Session.findAll({
            where: {
                hostId: req.params.userid
            },
            // join session table
            include: [{
                model: db.Class,
                attributes: ["subject", "class"]
            },

            {
                model: db.User, as: "host",
                attributes: ["firstName", "lastName", "image"]
            }
            ]

        }
        ).then(hostsessions => {

            let allSessions = []
            // console.log("alt hosted sessions:  ",hostsessions)

            for (let i = 0; i < hostsessions.length; i++) {

                // console.log(participatingSessions[i].dataValues.Session)
                let sessionInfo = hostsessions[i].dataValues
                let classInfo = hostsessions[i].dataValues.Class.dataValues
                let hostInfo = hostsessions[i].dataValues.host.dataValues

                // console.log("session Info:  ", sessionInfo);
                // console.log("classInfo", classInfo)
                // console.log("hostInfo", hostInfo)

                const sessionObject = {}
                sessionObject.sessionId = sessionInfo.id
                sessionObject.hostid = sessionInfo.hostId
                sessionObject.hostImage = hostInfo.image
                sessionObject.hostName = hostInfo.firstName + " " + hostInfo.lastName
                sessionObject.classId = sessionInfo.ClassId
                sessionObject.className = classInfo.subject + " " + classInfo.class
                sessionObject.sessionSubject = sessionInfo.subject
                let formattedDate = moment(sessionInfo.sessionDate).format("M-D-YY hh:mm")
                console.log("formatted date", formattedDate)
                sessionObject.sessionDate = formattedDate

                //     // console.log("created object", sessionObject)
                allSessions.push(sessionObject)
            }

            // console.log(allSessions)
            res.json(allSessions)

        })
            .catch(err => res.status(422).json(err));
    },


    //========================================================================
    // find all sessions for all the classes of a user

    findAllSessionsAllClasses: function (req, res) {
        console.log("got called  to get all sessions all classes")
        console.log("user id", req.params.userid)
        db.UserClass.findAll({
            where: { userId: req.params.userid },
            include: {
                model: db.Class,
                include: {
                    model: db.Session,
                    include: {
                        model: db.User, as: 'host',
                        attributes: ["firstName", "lastName", "image"]
                    }
                }
            }
        })
            .then(findAllSR => {


                let allSessions = []

                // console.log("printing 1", findAllSR)
                for (let i = 0; i < findAllSR.length; i++) {
                    // obj.classId= findAllSR[i].id;

                    //  console.log("printing 1", findAllSR[i].Class.dataValues)
                    let tempSessions = [...[]];

                    // console.log("length sessions: ", findAllSR[i].Class.Sessions.length )

                    if (findAllSR[i].Class.Sessions.length > 0) {
                        // console.log("Greather than 0")
                        tempSessions = [...findAllSR[i].Class.Sessions]
                        // console.log(tempSessions)
                        for (let j = 0; j < tempSessions.length; j++) {

                            sessiontempObj = tempSessions[j].dataValues
                            const sessionObject = {}
                            sessionObject.sessionId = sessiontempObj.id
                            sessionObject.hostid = sessiontempObj.hostId
                            sessionObject.userImage = sessiontempObj.host.dataValues.image
                            sessionObject.userName = sessiontempObj.host.dataValues.firstName + " " + sessiontempObj.host.dataValues.lastName
                            sessionObject.classId = findAllSR[i].Class.dataValues.id
                            sessionObject.className = findAllSR[i].Class.dataValues.subject + " " + findAllSR[i].Class.dataValues.class
                            sessionObject.sessionSubject = tempSessions[j].dataValues.subject
                            let formattedDate = moment(tempSessions[j].sessionDate).format("M-D-YY hh:mm")
                            console.log("formatted date", formattedDate)
                            sessionObject.sessionDate = formattedDate

                            // console.log("created object", sessionObject)

                            allSessions.push(sessionObject)

                        }

                    }
                }
                // console.log(allSessions)
                // can this be an array of objects?
                res.json(allSessions)
            })
    },


    //========================================================================
    // find all sessions for one of the user's class

    findAllSessionsOneClasses: function (req, res) {

        db.Session.findAll({
            where: {
                classId: req.params.classid,

            },
            include: [
                {
                    model: db.User, as: 'host',
                    attributes: ["firstName", "lastName", "image"]
                },
                {
                    model: db.Class,
                    attributes: ["subject", "class"]
                }
            ]

        })
            .then(sessionsClass => {

                let allSessions = []

                //  console.log("printing 1", findAllSR)
                for (let i = 0; i < sessionsClass.length; i++) {


                    //    console.log("printing 1", sessionsClass[i])
                    // let tempSessions = sessionsClass[i].dataValues;


                    if (sessionsClass.length > 0) {
                        // console.log("Greather than 0")
                        sessiontempObj = sessionsClass[i].dataValues
                        const sessionObject = {}
                        sessionObject.sessionId = sessiontempObj.id
                        sessionObject.hostid = sessiontempObj.hostId
                        sessionObject.userImage = sessiontempObj.host.dataValues.image
                        sessionObject.userName = sessiontempObj.host.dataValues.firstName + " " + sessiontempObj.host.dataValues.lastName
                        sessionObject.classId = sessiontempObj.ClassId
                        sessionObject.className = sessiontempObj.Class.dataValues.subject + " " + sessionsClass[i].Class.dataValues.class
                        sessionObject.sessionSubject = sessiontempObj.subject
                        let formattedDate = moment(sessiontempObj.sessionDate).format("M-D-YY hh:mm")
                        console.log("formatted date", formattedDate)
                        sessionObject.sessionDate = formattedDate
                        

                        //  console.log("created object", sessionObject)

                        allSessions.push(sessionObject)
                    }
                }

                // console.log(allSessions);
                res.json(allSessions)
            })
    },

    //========================================================================
    // find one session

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