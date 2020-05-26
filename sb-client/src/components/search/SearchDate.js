import React from 'react'

function SearchDate(props) {
    return (
        <div>
            <form className="form-inline my-2 my-md-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Date" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{props.date}</button>
            </form>
        </div>
    )
};

export default SearchDate;