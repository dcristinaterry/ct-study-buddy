import React from 'react'
// import { useStoreContext } from "../../utils/GlobalState"

function SearchClass() {
    return (
        <div>
            <form className="form-inline my-2 my-md-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Class" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Class</button>
            </form>
        </div>
    )
};

export default SearchClass;