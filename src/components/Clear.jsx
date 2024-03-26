import React from "react";
import '../stylesheets/Clear.css'

const Clear = (props) => (
    <div className="btn-clear"
        onClick={props.handleClear}>
        {props.children}
    </div>
);


export default Clear;