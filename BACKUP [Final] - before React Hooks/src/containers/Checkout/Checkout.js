import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckoutSummary } from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        error: false
    }

    // Managing state through Redux
    /*
    componentDidMount () {

        const query = new URLSearchParams(this.props.location.search);
        const ing = {};
        let price = null;
        for (let param of query.entries()) {
            // param = ['Salad', '1']
            if(param[0] === 'price') {
                price = param[1];
            }
            else {
                ing[param[0]] = +param[1];         // Adding '+' to convert the value to number
            }
        }
        this.setState({ingredients: ing, price});
    }
   */

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-form');
        setTimeout(() => {
            window.scrollBy({
                top: 650,
                behavior: 'smooth'
            });
        }, 100);
    }

    render() {
        let ing = this.props.ing;
        if (ing) {
            return (
                <React.Fragment>
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        price={this.props.price}
                        cancel={this.cancelHandler}
                        continue={this.continueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-form'}
                        component={ContactData}

                    // Managing state through Redux                        
                    // render={(routeProps) => (
                    //     <ContactData
                    //         {...routeProps}
                    //         ingredients={this.props.ing}
                    //         price={this.props.price}
                    //     />
                    // )}
                    />
                </React.Fragment>
            );
        }

        else {
            return <Redirect to="/" />
            // return this.state.error ? <p style={{ textAlign: 'center', fontSize: 'xx-large' }}>
            // Something went wrong. Please refresh!</p> : <Spinner />;
        }
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ing.ingredients,
        price: state.price.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);