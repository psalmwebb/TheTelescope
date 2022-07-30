import React from "react";
import PropTypes from "prop-types";

interface p{
   text:string
}

export default function Loader({text} : p)
{
    return (
        <div className="loader-div">
            <div>
                <div className="loader"></div>
                {text}
            </div>
        </div>
    )
}