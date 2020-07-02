import React, { Component } from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

class Burger extends Component {

    renderIng() {
        let newIng = Object.keys(this.props.ing)
            .map((current) => {
                return [...Array(this.props.ing[current])].map((curr, index) => {
                    return <BurgerIngredients
                        key={current + index}
                        type={current.toLowerCase()}
                    />
                });
            })
            .reduce((acc, curr) => {
                return acc.concat(curr);
            }, []);

        if (newIng.length === 0) return <p>add some ingredients!</p>;
        else return newIng;
    }

    render() {
        return (
            <div className={classes.Burger}>
                <BurgerIngredients type="bread-top" />
                {this.renderIng()}
                <BurgerIngredients type="bread-bottom" />
            </div>
        );
    }
}

export default Burger;