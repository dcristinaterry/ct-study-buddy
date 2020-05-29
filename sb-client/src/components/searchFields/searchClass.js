import React from 'react'
// import { useStoreContext } from "../../utils/GlobalState"

function SearchClass() {
    return (
        <div className="mr-2">
            <input className="form-control mr-sm-0" type="search" placeholder="Class" aria-label="Search" />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">Class</button>
        </div>
    )
};

export default SearchClass;