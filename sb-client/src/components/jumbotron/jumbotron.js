import React from "react";
import SearchDate from "../searchFields/searchDate"
import SearchClass from "../searchFields/searchClass"
import SearchTopic from "../searchFields/searchTopic"
import "./jumbotron.css"

function Jumbotron() {
    return (
        <div class="jumbotron jumbotron-fluid fixed-top noBg mt-3">
            <div class="container">
                <div className="float-right">
                    <h1>SEARCH BAR AREA </h1>
                {/* <SearchDate /> */}
                {/* <SearchClass /> */}
                {/* <SearchTopic /> */}
                </div>
            </div>
        </div>
    )
};

export default Jumbotron;