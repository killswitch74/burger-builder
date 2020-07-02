import React from 'react';
import classes from './Modal.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import { Auxiliary } from '../../../hoc/Auxiliary';

const Modal = (props) => {
    
    return (
        
        <Auxiliary>
            <Backdrop
                modalClosed={props.modalClosed}
                show={props.show}
                />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                >
                {props.children}
            </div>
        </Auxiliary>
    );
}

const shouldComponentUpdate = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
}

export default React.memo(Modal, shouldComponentUpdate);