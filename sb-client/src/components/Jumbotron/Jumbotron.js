import React from "react";
import Search from "../search/search"

function Jumbotron() {
    return (
        <div class="jumbotron jumbotron-fluid fixed-top">
            <div class="container">
                <h2 className="text-white" href="/">Study-Buddy</h2>
                <Search />
                <Search />
                <Search />
            </div>
        </div>
    )
};

export default Jumbotron;