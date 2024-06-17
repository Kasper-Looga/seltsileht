import React, { Children } from "react";
import './Buttontest.css';

const Button =({ onClick, children}) => {
    return(
        <button className='App-Button' onClick={onClick}> 
            {children}
        </button>
    );
};

export default Button;
