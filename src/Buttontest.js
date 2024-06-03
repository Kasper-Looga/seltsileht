import React, { Children } from "react";
import './Buttontest.css';

const Button =({ onclick, children}) => {
    return(
        <button className='App-Button' onclick={onclick}> 
            {children}
        </button>
    );
};

export default Button;
