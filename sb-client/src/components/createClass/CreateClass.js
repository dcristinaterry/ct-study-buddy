import React, { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User";

// import 'react-calendar/dist/Calendar.css';

const CreateClass = props => {

    const [state, dispatch] = useStoreContext();
    const [classForm, setClassForm] = useState({});


    const submitClassForm = () => {

        const classObject = {
            subject: classForm.subject,
            class: classForm.class,
            instructor: classForm.instructor,
        }

        API_User.addClass(classObject).then((createResponse)=>{
            console.log(createResponse)
            dispatch({type:"LOADING", loading: true})
        })

        console.log("submitting form", classObject)
        props.onHide();
    }
    const handleClassForm = event => {
        console.log("hey there", event.target.name, event.target.value)
        const { name, value } = event.target;
        setClassForm({ ...classForm, [name]: value })
    };

    return (
        <div>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        NEW CLASS
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-row">
                            {/* <SessionDescription somet ={handleSessionForm}/> */}
                            <div className="form-group col-md-8">
                                <label htmlFor="subjectName">Subject</label>
                                <div>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Subject"
                                        name="subject"
                                        onChange={handleClassForm}
                                    />
                                </div>
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="classNumber">Class Number</label>
                                <div>
                                <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Class Number"
                                        name="class"
                                        onChange={handleClassForm}
                                    />
                                </div>    
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-8">
                                <label htmlFor="instructor">Instructor Name</label>
                                <div>
                                <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Instructor Name"
                                        name="instructor"
                                        onChange={handleClassForm}
                                    />
                                </div>    
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={submitClassForm}>Save</button>
                    <button onClick={props.onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default CreateClass