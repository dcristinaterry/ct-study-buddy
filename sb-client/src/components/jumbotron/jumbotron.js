import React from "react";
import SearchDate from "../searchFields/searchDate"
import SearchClass from "../searchFields/searchClass"
import SearchTopic from "../searchFields/searchTopic"

function Jumbotron() {
    return (
        <div class="jumbotron jumbotron-fluid fixed-top">
            <div class="container">
                <h2 className="text-white" href="/">Study-Buddy</h2>
                <SearchDate />
                <SearchClass />
                <SearchTopic />
            </div>
        </div>
    )
};

export default Jumbotron;