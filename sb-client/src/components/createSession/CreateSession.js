import React, { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import { useStoreContext } from "../../utils/GlobalState"
import SessionForm from "../createSessionForm/SessionForm.js"
import Calendar from 'react-calendar'

import "react-datepicker/dist/react-datepicker.css";
// import 'react-calendar/dist/Calendar.css';

const CreateSession = props => {

    const [state] = useStoreContext();
    const [date] = useState(new Date());
    const [sessionForm, setSessionFrom] = useState({});


    // // funciton create () { 


    const submitSessionForm = () => {
        console.log("submitting form")
        props.onHide();

    }
    const handleSessionForm = event => {
        // setDate(date)

        const { name, value } = event.target;
        setSessionFrom({ [name]: value })


    };

    return (
        <div>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        NEW STUDY SESSION
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form>
            <div className="form-row">

                {/* <SessionDescription somet ={handleSessionForm}/> */}
                <div className="form-group col-md-8">
                    <label htmlFor="sessionDescription">Session Description</label>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Midterm prep"
                            name="sessionDescription"
                            onChange={handleSessionForm}


                        />
                    </div>

                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="maxParticipants">Max. Number partipants</label>
                    <select className="custom-select"
                        id="maxParticipants"
                        name="maxParticipants"
                        onChange={handleSessionForm}
                    >
                        <option defaultValue>Choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="7">9</option>
                        <option value="8">10</option>
                    </select>
                </div>

            </div>

            <div className="form-row">
                <div className="form-group col-md-12">
                    <label htmlFor="classId">Select Class</label>
                    <select className="custom-select"
                        id="maxParticipants"
                        name="classId"
                        onChange={handleSessionForm}
                    >
                        <option defaultValue>Choose...</option>

                        {state.classes.map((item) => (
                            <option key={item.ClassId} value={item.ClassId}> {item.Class.subject} {item.Class.class}</option>

                        ))}

                    </select>
                </div>

            </div>

            <div className="form-row">
                <div className="form-group col-md-4 ">
                    <label htmlFor="sessionDatePicker">Session Date</label>
                    <div>

                        <DatePicker
                            defaultValue={date}
                            onChange={handleSessionForm}
                            name="date"
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect
                            minDate={new Date()}
                            dateFormat="Pp"
                            id="sessionDatePicker"
                        />
                    </div>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="classId">Select a Location</label>
                    <select className="custom-select"
                        id="maxParticipants"
                        name="classId"
                        onChange={handleSessionForm}
                    >
                        <option defaultValue>Choose...</option>

                        {state.locations.map((item) => (
                            <option key={item.id}> {item.building}-{item.room} - Max. Occupants: {item.maxOccupancy}</option>
                        ))}

                    </select>
                </div>

            </div>

        </form>

                </Modal.Body>
                <Modal.Footer>
                    <button onClick={submitSessionForm}>Save</button>
                    <button onClick={props.onHide}>Close</button>
                 
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default CreateSession