import React from 'react';
import classes from './NavigationItem.module.css';

export const NavigationItem = (props) => {

    return (
    <li className={classes.NavigationItem} style={props.isSideDrawer ? {width: '100%' } : {width: 'auto'}}>
        {props.children}
    </li>
    );
};