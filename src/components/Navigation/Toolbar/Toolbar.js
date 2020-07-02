import React from 'react';
import classes from './Toolbar.module.css';
import {Logo} from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Menu } from './Menu/Menu';

export const Toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <Menu click={props.click} />
            
            <Logo height="55px"/>
            
            <div className={classes.DesktopOnly}>    
                <NavigationItems />
            </div>
        </header>
    );  
};