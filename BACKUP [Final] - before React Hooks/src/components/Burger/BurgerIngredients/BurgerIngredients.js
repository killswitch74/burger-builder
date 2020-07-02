import React from 'react';
import { connect } from 'react-redux';
import classes from './BurgerIngredients.module.css'
import PropTypes from 'prop-types';
import * as actionCreators from '../../../store/actions';

const BurgerIngredients = (props) => {

    const delIng = (ing) => {
        props.delIng(ing);
        props.changePrice(ing, 'rem');
    };

    let ingredients = null;
    switch (props.type) {
        case ('bread-bottom'):
            ingredients = <div className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredients = (<div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>);
            break;
        case ('meat'):
            ingredients = <div
                className={classes.Meat}
                onClick={() => delIng('Meat')}
            ></div>
            break;
        case ('cheese'):
            ingredients = <div
                className={classes.Cheese}
                onClick={() => delIng('Cheese')}
            ></div>
            break;
        case ('salad'):
            ingredients = <div
                className={classes.Salad}
                onClick={() => delIng('Salad')}
            ></div>
            break;
        case ('bacon'):
            ingredients = <div
                className={classes.Bacon}
                onClick={() => delIng('Bacon')}
            ></div>
            break;
        default: ingredients = null;
    }
    return ingredients;
};

BurgerIngredients.propTypes = {
    type: PropTypes.string
}

const mapDispatchToProps = dispatch => {
    return {
        delIng: (ing) => dispatch(actionCreators.delIng(ing)),
        changePrice: (ing, act) => dispatch(actionCreators.changePrice(ing, act))
    }
}

export default connect(null, mapDispatchToProps)(BurgerIngredients);