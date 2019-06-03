import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>
        {/*<img src="../../assets/images/burger-logo.png" />  this will not work since assets will not be included by webpack, so we need plugin*/}
        <img src={burgerLogo} alt="My burger" />
    </div>
);

export default logo;