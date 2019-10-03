import React from 'react';
import classes from './Button.css'

const button = (props) => (
    <button
        disabled={props.disabledProp}
        className={[classes.Button, classes[props.buttonType]].join(' ')} // to use multiple classes we need array
        onClick={props.clicked}
        >
        {props.children}
    </button>
);
export default button;