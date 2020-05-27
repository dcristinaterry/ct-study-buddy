import React from "react";
import SearchDate from "../search/SearchDate"
import SearchClass from "../search/SearchClass"
import SearchTopic from "../search/SearchTopic"

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