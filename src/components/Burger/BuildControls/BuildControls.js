import React from 'react';
import classes from './BuildControls.module.css'
import {BuildControl} from './BuildControl/BuildControl';

export const BuildControls = (props) => {
    
    let control = Object.keys(props.ing)
        .map((current, index) => {
            return <BuildControl
                key={current + index}
                label={current}
                type={current.toLowerCase()}
                add={() => props.changeIngHandler(current, 'add')}
                remove={() => props.changeIngHandler(current, 'remove')}
                isDisabled={props.isDisabled[current]}
                />
    });

    return (
    <div className={classes.BuildControls} style={{fontFamily: 'Amatic SC', fontSize: 28}}>
        {props.price > 2 ? <p style={{fontSize: 38, margin: '4px'}}>Total: <strong>{props.price.toFixed(2)}$</strong></p> : null}
        
        {control}
        
        <div>
            <button
                className={[classes.ResetButton, classes.OrderButton].join(' ')}
                disabled={!props.ordernow}
                onClick={props.reset}
            >RESET
            </button>
            <button 
                className={classes.OrderButton}
                disabled={!props.ordernow}
                onClick={props.modal}
            >ORDER
            </button>
        </div>
    
    </div>
    );
};