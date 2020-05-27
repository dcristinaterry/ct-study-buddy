import React from 'react'
// import { useStoreContext } from "../../utils/GlobalState"

function SearchTopic() {
    return (
        <div>
            <form className="form-inline my-2 my-md-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Topic" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Topic</button>
            </form>
        </div>
    )
};

export default SearchTopic;