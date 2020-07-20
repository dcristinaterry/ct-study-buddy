import React, { useState } from "react"
import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import { useStoreContext } from "../../utils/GlobalState"
import "react-datepicker/dist/react-datepicker.css";
import API_User from "../../utils/API_User";
import "./modalCreateSessStyle.css"

// import 'react-calendar/dist/Calendar.css';
Modal.setAppElement('#root')
const CreateSession = props => {

    const [state, dispatch] = useStoreContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sessionForm, setSessionForm] = useState({});

    // TODO: Refactor Validation
    // const isValid = (field) => field && field.length() != 0;

    // // funciton create () { 
    // const isFormValid = () => {
    //     const { subject, maxParticipants, ClassId, LocationId } = sessionForm;
    //     return isValid(subject) && isValid(maxParticipants) && isValid(ClassId) && isValid(LocationId)
    // }

    const submitSessionForm = () => {
        // if(isFormValid()) {
            const sessionObject = {
                subject: sessionForm.subject,
                sessionDate: selectedDate,
                maxParticipants: sessionForm.maxParticipants,
                ClassId: sessionForm.ClassId,
                LocationId: sessionForm.LocationId,
                hostId: state.currentUser.id
            }

            API_User.createHostSession(state.currentUser.id, sessionObject).then((createResponse)=>{
                console.log(createResponse)
                dispatch({type:"LOADING", loading: true})
            })

            props.onHide();
        // } else {
        //     // TODO: Display error to user in form (errors)
        //     console.log("Error form...");
        // }
    }

    // const handleDate = date=>{
    //     setDate(date)
    //     console.log("setting date date picker", date)
    // }
    const handleSessionForm = event => {
        console.log("hey there", event.target.name, event.target.value)
        const { name, value } = event.target;
        setSessionForm({ ...sessionForm, [name]: value })
    };

    return (
        <div>
            <Modal  isOpen={props.show}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => props.onHide}
                className="Modal2"
                overlayClassName="Overlay2">
                
                        NEW STUDY SESSION
          
    

                    <form>
                        <div className="">

                            {/* <SessionDescription somet ={handleSessionForm}/> */}
                        
                                <label htmlFor="sessionDescription">Session Description</label>
                           
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Midterm prep"
                                        name="subject"
                                        onChange={handleSessionForm}
                                        required
                                    />
                          
                                <label htmlFor="maxParticipants">Max. Number partipants</label>
                                <select className="custom-select"
                                    id="maxParticipants"
                                    name="maxParticipants"
                                    onChange={handleSessionForm}
                                    required
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
                        

                       
                                <label htmlFor="classId">Select Class</label>
                                <select className="custom-select"
                                    id="classId"
                                    name="ClassId"
                                    onChange={handleSessionForm}
                                    required
                                >
                                    <option defaultValue>Choose...</option>

                                    {state.classes.map((item) => (
                                        <option key={item.ClassId} value={item.ClassId}> {item.Class.subject} {item.Class.class}</option>

                                    ))}

                                </select>
                   
                                <label htmlFor="sessionDatePicker">Session Date</label>
                              
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                        dateFormat="dd/MM/yyyy hh:mm aa"
                                        showTimeSelect
                                        minDate={new Date()}
                                        // dateFormat="Pp"
                                        id="sessionDatePicker"
                                    />
                          
                          
                                <label htmlFor="locationId">Select a Location</label>
                                <select className="custom-select"
                                    id="locationId"
                                    name="LocationId"
                                    onChange={handleSessionForm}
                                    required
                                >
                                    <option defaultValue>Choose...</option>

                                    {state.locations.map((item) => (
                                        <option key={item.id} value={item.id}> {item.building}-{item.room} - Max. Occupants: {item.maxOccupancy}</option>
                                    ))}
                                </select>
                           
                        </div>
                    </form>
                    <button className="btn btn-light btnShadow mx-auto mb-3 border-dark hover" onClick={submitSessionForm}>Save</button>
                    <button className="btn btn-danger btnShadow mx-auto mb-3 border-dark" onClick={props.onHide}>Close</button>
             
            </Modal>
        </div>

    );
}

export default CreateSession