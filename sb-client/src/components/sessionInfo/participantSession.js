import React, { useEffect } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"
import "./session.css"


function ParticipantSessions() {
    const [state, dispatch] = useStoreContext()

    useEffect(()=>{
        
            console.log("got called again participant")
            console.log("I'm loading participant",  state.loading)
            // state.loading = false;
            if(state.loading){
                dispatch({type:"LOADING", loading: false})
                API_User.getAllParticipatingSessions(state.currentUser.id).then(resParticipatingSessions => {
                    console.log("calling API",)
                
        
                    dispatch({
                        type: "setParticipatingSessions",
                        sessions: resParticipatingSessions.data
                    
                    } )
         
                })
              
            }

    },[state])

    const leaveSession = (session) => {
        console.log("leave session button clicked", session)
        const sessionObj = {
            session:session, 
            user:state.currentUser.id
        
        }
        API_User.leaveSession(sessionObj).then(response => {
            console.log("this is being sent", response)
            dispatch({type:"LOADING", loading: true})
        })        
    } 

    // console.log(state.participatingSessions)
    // needs useEffect to alter state
    return (
        <div className="row">
            <div className="col">
                <div className="container card-rows mt-2 pt-2">
                    <h3>Participating Sessions</h3>
                    {state.participatingSessions.map((item, index) => (
                        <div key={item.sessionId}>
                            <div className="card text-center float-left py-2 mb-3 mr-3 sessCard">
                               
                                Topic - {item.sessionSubject}
                                <br/>
                                Class - {item.className}
                                <br/>
                                Date - {item.sessionDate}
                                <br/>
                                <img className="mx-auto imgMain" src={item.hostImage} alt="..." />
                                <br/>
                                <button className="btn btn-danger mx-auto mb-1" onClick={()=>leaveSession(item.sessionId)}>
                                Leave
                                </button>
                            </div> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
       
    )
}

export default ParticipantSessions