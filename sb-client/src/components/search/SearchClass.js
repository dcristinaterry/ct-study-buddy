import React from 'react'

function SearchClass(props) {
    return (
        <div>
            <form className="form-inline my-2 my-md-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Class" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{props.class}</button>
            </form>
        </div>
    )
};

export default SearchClass;