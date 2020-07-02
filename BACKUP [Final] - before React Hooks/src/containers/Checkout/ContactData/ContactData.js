import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.module.css';
import { Button } from '../../../components/UI/Button/Button';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Input } from '../../../components/UI/Input/Input';
import * as actionCreators from '../../../store/actions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import { checkValidity } from '../../../components/UI/FormValidation/FormValidation';

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {
            name: this.orderForm('input', 'text', 'name', '', true),
            phone: this.orderForm('input', 'number', 'mobile number', '', true),
            email: this.orderForm('input', 'email', 'e-mail', '', true),
            street: this.orderForm('input', 'text', 'street', '', true),
            landmark: this.orderForm('input', 'text', 'landmark', '', false),
            state: this.orderForm('input', 'text', 'state', '', true),
            pincode: this.orderForm('input', 'text', 'pincode', '', true),
            country: this.orderForm('input', 'text', 'country', '', true),
            delivery: this.orderForm('select', null, null, '', null, '- select -', 'cheapest', 'fastest'),
            payment: this.orderForm('radio', null, null, '', null, 'prepaid', 'COD')
        }
    }

    orderForm(type, configType, configText, value, required, ...options) {
        if (type !== 'input') {
            return {
                elementType: type,
                elementConfig: {
                    options: options.map(current => {
                        return {
                            value: current
                        }
                    })
                },
                value: value,
                touched: false,
            }
        }

        else {
            return {
                elementType: type,
                elementConfig: {
                    type: configType,
                    placeholder: configText
                },
                value: value,
                validation: {
                    required: required,
                    maxLength: 200,
                    minLength: required ? 3 : null,
                    emailCheck: configType === 'email',
                    valid: false
                },
                touched: false,
            }
        }
    }

    redirect = () => {
        this.props.history.push('/orders');
    }

    orderHandler = (event) => {
        event.preventDefault();

        let formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ing,
            price: +this.props.price,
            userID: this.props.userID,
            ...formData
        }

        // Managing state through Redux
        this.props.submitForm(order, this.redirect);

        // axios.post('/orders.json', order)
        //     .then(() => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ loading: false });
        //     });
    }

    changeHandler = (event, id) => {
        // Step 1: Change the value of targetted element.
        const selectedEl = { ...this.state.orderForm[id] };
        selectedEl.value = event.target.value;

        // Step 2: Make a copy of the original 'OrderForm' and SAVE (ONLY) the changed element to it.
        const newOrderForm = { ...this.state.orderForm };
        newOrderForm[id] = selectedEl;

        // Step 2b: Check validity of input.
        if (newOrderForm[id].validation) {
            newOrderForm[id].validation.valid = checkValidity(newOrderForm[id].value, newOrderForm[id].validation);
            // console.log(newOrderForm[id].validation.valid);
        }
        newOrderForm[id].touched = true;

        // Step 2c: Form Validity Check.
        let formIsValid = false;
        formIsValid = Object.keys(newOrderForm).map((curr) => {
            if (newOrderForm[curr].validation) {
                return newOrderForm[curr].validation.valid;
            }
            else return newOrderForm[curr].touched;
        })
            .reduce((acc, curr) => {
                return acc && curr;
            });

        // Step 3: Update the state.
        this.setState({ orderForm: newOrderForm, formIsValid });
    }

    modalHandler = () => {
        this.setState(prevState => {
            return { modalClosed: !prevState.modal };
        });
    }

    render() {
        const formElement = [];
        for (let key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = null;
        if (this.props.error) form = <p style={{ textAlign: 'center', fontSize: 'xx-large' }}>
            Something went wrong. Please refresh!</p>;
        else form = (
            <form>
                {formElement.map(current => {
                    return <Input
                        key={current.id}
                        elementType={current.config.elementType}
                        elementConfig={current.config.elementConfig}
                        value={current.config.value}
                        change={(event) => this.changeHandler(event, current.id)}
                        label={current.id}
                        touched={current.config.touched}
                        invalid={current.config.validation ? !current.config.validation.valid : null}
                    />
                })}
            </form>
        );

        if (this.props.loader) form = <Spinner />;

        return (
            <div className={classes.ContactData}>
                <h3 style={{ color: '#606060' }}>Your Contact Details:</h3>
                {form}
                <div className={classes.Button}>
                    <Button 
                        btnType="Success" 
                        disabled={!this.state.formIsValid || (this.props.price <= 2)} 
                        click={this.orderHandler} 
                    >
                        ORDER NOW
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ing.ingredients,
        price: state.price.totalPrice,
        userID: state.auth.userID,
        error: state.order.error,
        loader: state.order.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitForm: (orders, redirect) => dispatch(actionCreators.submitForm(orders, redirect))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));