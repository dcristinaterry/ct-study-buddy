import React, { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import { useStoreContext } from "../../utils/GlobalState"
import Calendar from 'react-calendar'

import "react-datepicker/dist/react-datepicker.css";
// import 'react-calendar/dist/Calendar.css';

const ClassForm = props => {


    const [state] = useStoreContext();
    const [date] = useState(new Date());
    const [classForm, setClassFrom] = useState({});


    // funciton create () { 

    const submitClassForm = () => {
        console.log("submitting form", classForm)
        // set state SessionObject 
    }

    const handleClassForm = event => {
        // setDate(date)

        const { name, value } = event.target;
        setClassFrom({ [name]: value })


    };

    return (
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

            <input type="submit" className="btn"></input>


        </form>

    )

}

export default ClassForm