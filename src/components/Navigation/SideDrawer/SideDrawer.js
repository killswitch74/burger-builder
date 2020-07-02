import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Logo } from '../../Logo/Logo';
import { Backdrop } from '../../UI/Backdrop/Backdrop';
import { Auxiliary } from '../../../hoc/Auxiliary';

export const SideDrawer = (props) => {
    
    let newClasses = [classes.SideDrawer, classes.Close];
    if(props.toggle) newClasses = [classes.SideDrawer, classes.Open];

    return (
        <Auxiliary>

            <Backdrop show={props.toggle} modalClosed={props.click} />

            <div className={newClasses.join(' ')}>
                <Logo height="55px" marginBottom="25px" />
                <NavigationItems clicked={props.click} isSideDrawer />
            </div>
        </Auxiliary>
    );
}