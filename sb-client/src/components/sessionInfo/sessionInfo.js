import React from "react"

const SessionInfo = (props) => {

    return (
        <div className="container text-center row mx-0">
            <div className="card col mb-4 border-dark" style={{ width: '20rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-3 text-muted">{props.author}</h6>
                    <div className="card mb-3" style={{ maxWidth: '150px' }}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={props.image} className="card-img" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <p className="card-text" >{props.body}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SessionInfo;