import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
                activeClassName={classes.active} // need to use it like this since NavLink will automatically create unique name
                exact={props.exact}
        >{props.children}</NavLink>
    </li>
);

export default navigationItem;