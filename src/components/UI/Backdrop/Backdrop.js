import React from 'react';
import classes from './Backdrop.module.css';
import { CSSTransition } from 'react-transition-group';

export const Backdrop = (props) => {

    // const classX = [
    //     classes.Backdrop,
    //     props.show === "entering" ? classes.BackdropOpen 
    //     : props.show === "exiting" ? classes.BackdropClose : null
    // ]; 

    // if (props.show) 
    
    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            mountOnEnter
            unmountOnExit
            classNames={{
                enterActive: classes.BackdropOpen,
                exitActive: classes.BackdropClose
            }}
        >
            <div
                className={classes.Backdrop}
                onClick={props.modalClosed}
            >
            </div>
        </CSSTransition>
    );

    // else return null;


}