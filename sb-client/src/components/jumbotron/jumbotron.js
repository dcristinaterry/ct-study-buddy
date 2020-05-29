import React from "react";
import SearchDate from "../searchFields/searchDate"
import SearchClass from "../searchFields/searchClass"
import SearchTopic from "../searchFields/searchTopic"
import "./jumbotron.css"

function Jumbotron() {
    return (
        <div className="jumbotron jumbotron-fluid noBg mt-3">
            <div className="container">
                <div className="form-inline my-2 my-md-0 justify-content-end float-right">

                <SearchDate />
                <SearchClass />
                <SearchTopic />
                </div>
            </div>
        </div>
    )
};

export default Jumbotron;