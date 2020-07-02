import React from 'react';
import Burger from '../../Burger/Burger';
import { Button } from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

export const CheckoutSummary = (props) => {
    return (
        // <React.Fragment>
        <div className={classes.CheckoutSummary}>
            <h1>It's yum and all ready!</h1>

            <Burger ing={props.ingredients} />

            <div className={classes.Button}>
                <Button
                    btnType="Danger"
                    click={props.cancel}
                >CANCEL
                    </Button>
                <Button
                    disabled={props.price <= 2}
                    btnType="Success"
                    click={props.continue}
                >CONTINUE
                    </Button>
            </div>
        </div>
        // </React.Fragment>
    );
}