const db = require("../models")
const { Op } = require('sequelize')
const moment = require('moment')

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
                {
                    model: db.UserSession,
                    include: {
                        model: db.User,
                        attributes: ["firstName", "lastName", "image"]

                    }
                },
                {
                    model: db.Location,
                    attributes: ["building", "room"]
                }
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
                let locationInfo = participatingSessions[i].dataValues.Session.Location.dataValues
                let participants = participatingSessions[i].dataValues.Session.UserSessions

                // console.log("session Info:  ", sessionInfo);
                // console.log("classInfo", classInfo)
                // console.log("hostInfo", hostInfo)

                const sessionObject = {}
                sessionObject.sessionId = sessionInfo.id
                sessionObject.hostid = sessionInfo.hostId
                sessionObject.userImage = hostInfo.image
                sessionObject.hostName = hostInfo.firstName + " " + hostInfo.lastName
                sessionObject.classId = sessionInfo.ClassId
                sessionObject.className = classInfo.subject + " " + classInfo.class
                sessionObject.sessionSubject = sessionInfo.subject
                let formattedDate = moment(sessionInfo.sessionDate).format("M-D-YY hh:mm a")
                // console.log("formatted date", formattedDate)
                sessionObject.sessionDate = formattedDate
                sessionObject.participants = participants
                sessionObject.locationBuilding = locationInfo.building
                sessionObject.locationRoom = locationInfo.room

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
            },
            {
                model: db.UserSession,
                include: {
                    model: db.User,
                    attributes: ["firstName", "lastName", "image"]
                }
            },
            {
                model: db.Location,
                attributes: ["building", "room"]
            }]
        }
        ).then(hostsessions => {

            let allSessions = []
            // console.log("alt hosted sessions:  ",hostsessions)

            for (let i = 0; i < hostsessions.length; i++) {

                // console.log(hostsessions[i].dataValues)
                let sessionInfo = hostsessions[i].dataValues
                let classInfo = hostsessions[i].dataValues.Class.dataValues
                let hostInfo = hostsessions[i].dataValues.host.dataValues
                let locationInfo = hostsessions[i].dataValues.Location.dataValues
                let participants = hostsessions[i].dataValues.UserSessions

                // console.log("session Info:  ", sessionInfo);
                // console.log("classInfo", classInfo)
                // console.log("hostInfo", hostInfo)

                const sessionObject = {}
                sessionObject.sessionId = sessionInfo.id
                sessionObject.hostid = sessionInfo.hostId
                sessionObject.userImage = hostInfo.image
                sessionObject.hostName = hostInfo.firstName + " " + hostInfo.lastName
                sessionObject.classId = sessionInfo.ClassId
                sessionObject.className = classInfo.subject + " " + classInfo.class
                sessionObject.sessionSubject = sessionInfo.subject
                let formattedDate = moment(sessionInfo.sessionDate).format("M-D-YY hh:mm a")
                // console.log("formatted date", formattedDate)
                sessionObject.sessionDate = formattedDate
                sessionObject.participants = participants
                sessionObject.locationBuilding = locationInfo.building
                sessionObject.locationRoom = locationInfo.room
                // console.log("created object", sessionObject)
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
        console.log("got called to get all sessions all classes", req.user.id)
        // console.log("user id", req.params.userid)
        db.UserClass.findAll({
            where: { userId: req.user.id },
            include: {
                model: db.Class,
                include: {
                    model: db.Session,
                    include: [{
                        model: db.User, as: 'host',
                        where: {
                            id: { [Op.not]: req.user.id },
                        },
                        attributes: ["firstName", "lastName", "image"]
                    },
                    {
                        model: db.UserSession,
                        include: {
                            model: db.User,
                            // where: {
                            //     id: { [Op.not]: req.user.id },
                            // },
                            attributes: ["firstName", "lastName", "image"]

                        }
                    },
                    {
                        model: db.Location,
                        attributes: ["building", "room"]
                    }
                    ]
                }
            }
        })
            .then(findAllSR => {
                let allSessions = []
                //  console.log("printing 1", findAllSR)
                for (let i = 0; i < findAllSR.length; i++) {
                    // console.log("printing 1", findAllSR[i].Class) 
                    console.log("printing 1", findAllSR[i].Class.Sessions.length)
                }
                for (let i = 0; i < findAllSR.length; i++) {
                    // obj.classId= findAllSR[i].id;
                    //  console.log("printing 1", findAllSR[i].Class.dataValues)
                    let tempSessions = [...[]];
                    // console.log("length sessions: ", findAllSR[i].Class.Sessions.length )
                    if (findAllSR[i].Class.Sessions.length > 0) {
                        // console.log("Greather than 0")
                        tempSessions = [...findAllSR[i].Class.Sessions]
                        //  console.log(tempSessions)
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

                            let formattedDate = moment(tempSessions[j].sessionDate).format("M-D-YY hh:mm a")
                            // console.log("formatted date", formattedDate)
                            // console.log(sessiontempObj.Location)
                            sessionObject.sessionDate = formattedDate
                            sessionObject.participants = sessiontempObj.UserSessions
                            sessionObject.locationBuilding = sessiontempObj.Location.dataValues.building
                            sessionObject.locationRoom = sessiontempObj.Location.dataValues.room
                            //  console.log("created object", sessionObject)

                            allSessions.push(sessionObject)
                        }
                    }
                }
                // console.log(allSessions)
                // can this be an array of objects?
                res.json(allSessions)
                // res.json(findAllSR)
            })
    },


    //========================================================================
    // find all sessions for one of the user's class

    findAllSessionsOneClasses: function (req, res) {


        // {$and: [filters["State"], {$not: this.filterSBM()}] };
        // [Op.gte]: moment().toDate()
        db.Session.findAll({
            where: {
                classId: req.params.classid,
                hostId: { [Op.not]: req.user.id }
            },
            include: [
                {
                    model: db.User, as: 'host',
                    attributes: ["firstName", "lastName", "image"]
                },
                {
                    model: db.Class,
                    attributes: ["subject", "class"]
                },
                {
                    model: db.UserSession,
                    // where:{
                    //     UserId: {[Op.not]:req.user.id}
                    // },
                    include: {
                        model: db.User,
                        attributes: ["firstName", "lastName", "image"]

                    }
                },
                {
                    model: db.Location,
                    attributes: ["building", "room"]
                }
            ]

        })
            .then(sessionsClass => {

                let allSessions = []


                for (let i = 0; i < sessionsClass.length; i++) {



                    // let tempSessions = sessionsClass[i].dataValues;


                    if (sessionsClass.length > 0) {
                        // console.log("Greather than 0")
                        sessiontempObj = sessionsClass[i].dataValues
                        // console.log("sessions one class",sessiontempObj)
                        const sessionObject = {}
                        sessionObject.sessionId = sessiontempObj.id
                        sessionObject.hostid = sessiontempObj.hostId
                        sessionObject.userImage = sessiontempObj.host.dataValues.image
                        sessionObject.userName = sessiontempObj.host.dataValues.firstName + " " + sessiontempObj.host.dataValues.lastName
                        sessionObject.classId = sessiontempObj.ClassId
                        sessionObject.className = sessiontempObj.Class.dataValues.subject + " " + sessionsClass[i].Class.dataValues.class
                        sessionObject.sessionSubject = sessiontempObj.subject
                        let formattedDate = moment(sessiontempObj.sessionDate).format("M-D-YY hh:mm a")
                        // console.log("formatted date", formattedDate)
                        sessionObject.sessionDate = formattedDate
                        sessionObject.participants = sessiontempObj.UserSessions
                        sessionObject.locationBuilding = sessiontempObj.Location.building
                        sessionObject.locationRoom = sessiontempObj.Location.room


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
    // Id: req.params.sessionid,

    findOneSessionForUser: function (req, res) {
        db.Session.findById({
            where: {
                userId: req.params.userid,

            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // =======================================================================
    // find all sessions for an administrator

    findAllSessionsAdmin: function (req, res) {
        db.Session.findAll({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {

        // console.log("creating session object", req.body)
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
        console.log("deleting object")
        db.Session.destroy({ where: { id: req.params.sessionid } })
            .then(dbModel => {
                res.json(dbModel)
            }
            )
            .catch(err => res.status(422).json(err));
    }
}