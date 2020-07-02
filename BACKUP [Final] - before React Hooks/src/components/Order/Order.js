import React from 'react';
import classes from './Order.module.css';

export const Order = (props) => {
    
    const ing = [];
    for(let ingName in props.ingredients) {
        ing.push({
            name: ingName,
            amount: props.ingredients[ingName]
        });
    }

    const ingRender = ing.map(current => {
        return  current.amount === 0 ? null
                : <span
                    key = {current.name}
                    className={classes.OrderEl}
                >{current.name}: 
                <span style={{color: 'red'}}> {current.amount}</span></span>
            
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients:{ingRender}</p>
            <p style={{fontFamily: 'Ubuntu Condensed'}}>Total Price:
                <strong> ${props.price.toFixed(2)}</strong></p>
        </div>
    );
}