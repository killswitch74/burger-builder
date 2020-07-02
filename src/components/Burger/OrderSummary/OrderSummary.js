import React, { Component } from 'react';
import { Button } from '../../UI/Button/Button'

export class OrderSummary extends Component {

    // Converted to Class-based Component for Performance Tweak.
    // Following Function will TRIGGER if this component is RE-RENDERED.
    // componentDidUpdate() {
    //     console.log('[OrderSummary.js]');
    // }

    render() {

        let ingSumm = Object.keys(this.props.ingredients).map((current, index) => {
            if (this.props.ingredients[current] !== 0) {
                return <li key={current + index}>
                    {current}: {this.props.ingredients[current]}
                </li>
            }
            else return null;
        });

        let orderSummary = (
            <div>
                <h1 style={{ fontSize: 44 }}>Your Order Summary:</h1>
                <p style={{ fontSize: 24 }}>with all these tasty ingredients...</p>
                <ul style={{ fontSize: 28 }}>
                    {ingSumm}
                </ul>
                <p style={{ fontSize: 24, fontFamily: 'Ubuntu Condensed' }}>Total: {this.props.price.toFixed(2)}$</p>
            </div>
        )

        if (!this.props.isAuth) {
            orderSummary = <p style={{ fontSize: 38 }}>you gotta sign-in to continue</p>;
        }

        return (

            <div>

                {orderSummary}

                <Button btnType="Danger" click={this.props.cancel}><span style={{ fontSize: 36 }}>Cancel</span></Button>
                <Button btnType="Success" click={this.props.continue}>
                    <span style={{ fontSize: 36 }}>
                        {this.props.isAuth ? 'Continue' : 'Sign-in'}
                    </span>
                </Button>
            </div>

        );

    }

}
