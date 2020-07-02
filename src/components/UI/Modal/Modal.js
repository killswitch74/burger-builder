import React from 'react';
import classes from './Modal.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import { CSSTransition } from 'react-transition-group';

const Modal = (props) => {

    // const classX = [classes.Modal, 
    //     props.show === "entering" ? classes.OpenModal
    //     : props.show === "exiting" ? classes.CloseModal : null
    // ]

    return (

        <React.Fragment>

            <Backdrop
                modalClosed={props.modalClosed}
                show={props.show}
            />

            <CSSTransition
                in={props.show}
                timeout={300}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enterActive: classes.OpenModal,
                    exitActive: classes.CloseModal
                }}
            >

                <div
                    className={classes.Modal}
                    // style={{
                        // transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        // opacity: props.show ? '1' : '0'
                    // }}
                >
                    {props.children}
                </div>

            </CSSTransition>

        </React.Fragment>
    );
}

const shouldComponentUpdate = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
}

export default React.memo(Modal, shouldComponentUpdate);