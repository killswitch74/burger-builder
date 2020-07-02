import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions';
import axios from '../../axios-orders';

import { Auxiliary } from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
// import BackdropContext from '../../context/backdrop-context';

export class BurgerBuilder extends Component {
    state = {
        modal: null,
    }

    // static contextType = BackdropContext;

    componentDidMount() {
        //Managing state through Redux
        this.props.resetIng();  // Used instead of RESET() as to show spinner at component re-load
        this.props.resetPrice();
        this.props.fetchIng();

        /*
            axios.get('/ingredients.json')
                .then (response => {
                    this.setState({ingredients: response.data});
                })
                .catch (error => {
                    this.setState({error: true});
                });
                */
    }

    ordernowToggle(updatedIng) {
        let sum = Object.keys(updatedIng).reduce((acc, curr) => {
            return acc + updatedIng[curr];
        }, 0);
        return sum > 0;
    }

    changeIngHandler = (ing, act) => {

        // Managing state through Redux
        act === 'add' ? this.props.addIng(ing) : this.props.delIng(ing);
        this.props.changePrice(ing, act);
        // this.ordernowToggle(this.props.ing);

        /*
            // Adding Ingredients
            const ingCount = this.state.ingredients[ing];
            const updatedCount = act === 'add' ? ingCount + 1 : ingCount - 1;
            const updatedIng = {...this.state.ingredients};
            updatedIng[ing] = updatedCount;
            // Adding Updated Price
            let ingPrice = this.state.totalPrice;
            switch(ing) {
                case('Bacon'): 
                    act === 'add' ? ingPrice += 0.9 : ingPrice -= 0.9;
                    break;
                case('Salad'): 
                    act === 'add' ? ingPrice += 0.3 : ingPrice -= 0.3;
                    break;
                case('Meat'): 
                    act === 'add' ? ingPrice += 1.1 : ingPrice -= 1.1;
                    break;
                case('Cheese'): 
                    act === 'add' ? ingPrice += 0.2 : ingPrice -= 0.2;
                    break;
                default: 
                    return ingPrice;
            }
            // Updating the State finally
            ingPrice = ingPrice.toFixed(2);
            this.setState({ingredients: updatedIng, totalPrice: ingPrice});
            this.ordernowToggle(this.props.ing);
        */
    }

    modalHandler = () => {
        let x = this.state.modal;
        this.setState({ modal: !x });
    }


    // Managing State through Redux
    /*
    // Passing ingredients in QueryParams
    continueHandler = () => {
        // Method 1: Created by Karan Uppal
        // let ing = {...this.state.ingredients}
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + Object.keys(ing).map(current => {
        //                 return current + '=' + ing[current];
        //             }).join('&') + '&price=' + this.state.totalPrice
        // });

        // Method 2: Created by Instructor
        // const ing = {...this.state.ingredients};
        // const queryParams = [];
        // for(let i in ing) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ing[i]));
        // };
        // queryParams.push('price=' + encodeURIComponent(this.state.totalPrice));
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryParams.join('&')
        // });

        //  Methode 3: (SHORTEST) Suggested by a Pupil
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: new URLSearchParams(this.state.ingredients) +
        //         '&price=' + this.state.totalPrice
        // });
    }
   */

    continueHandler = () => {
        if (this.props.isAuth) {
            this.props.history.push('/checkout')
        }
        else this.props.history.push('/login');
    }

    render() {

        const disabledInfo = { ...this.props.ing };
        for (let key in disabledInfo) {
            if (disabledInfo[key] <= 0) disabledInfo[key] = true;
            else disabledInfo[key] = false;
        }


        let burger = this.props.error ? <p style={{ fontSize: 'xx-large', color: '#ffb657' }}>Something went wrong. Please check your internet connection!</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ing) {
            burger = (<Auxiliary>
                <Burger ing={this.props.ing} />
                <BuildControls
                    ing={this.props.ing}
                    changeIngHandler={this.changeIngHandler}
                    isDisabled={disabledInfo}
                    price={this.props.price}
                    ordernow={this.ordernowToggle(this.props.ing)}
                    modal={this.modalHandler}
                    reset={this.props.reset}  // Used instead of RESET_ING() as to prevent spinner render loop
                />
            </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ing}
                price={this.props.price}
                cancel={this.modalHandler}
                continue={this.continueHandler}
                isAuth={this.props.isAuth}
            />
        }


        return (

            <Auxiliary>
                {/* <BackdropContext.Provider
                                value={{show: this.state.modal, modalClosed: this.modalHandler}} > */}

                <Modal show={this.state.modal} modalClosed={this.modalHandler}>

                    {orderSummary}
                    {/* This above method, triggers re-render cycle of OrderSummary with every
                    CHANGE in ingredients' count, UNLESS we add "type" property to props.children
                    of the Modal.js under shouldComponentUpdate(), for this to work. */}

                    {/* {this.state.modal ? orderSummary : null} */}
                    {/* This above method, doesn't even trigger re-render cycle of OrderSummary!
                    STRANGE! And still works flawlessly.
                    Although you need to remove "type" property from the props.children of Modal.js
                    under shouldComponentUpdate(), for this to work. */}

                </Modal>

                {burger}

                {/* </BackdropContext.Provider> */}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ing.ingredients,
        error: state.ing.error,
        price: state.price.totalPrice,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIng: (ing) => dispatch(actionCreators.addIng(ing)),
        delIng: (ing) => dispatch(actionCreators.delIng(ing)),
        changePrice: (ing, act) => dispatch(actionCreators.changePrice(ing, act)),
        fetchIng: () => dispatch(actionCreators.fetchIng()),
        reset: () => dispatch(actionCreators.reset()),
        resetIng: () => dispatch(actionCreators.resetIng()),
        resetPrice: () => dispatch(actionCreators.resetPrice())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));