import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Input } from '../../components/UI/Input/Input';
import { checkValidity } from '../../components/UI/FormValidation/FormValidation';
import { Button } from '../../components/UI/Button/Button';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import * as actionCreators from '../../store/actions/';
import classes from './Auth.module.css';
import { Spinner } from '../../components/UI/Spinner/Spinner';


class Auth extends Component {

    state = {
        formIsValid: false,
        loginForm: {
            email: this.loginForm('input', 'email', 'e-mail', '', true),
            password: this.loginForm('input', 'password', 'password', '', true),
            keepMeLoggedin: this.loginForm('checkbox', '', 'keep me logged in?', '', null, 'yes')
        }
    }

    loginForm(type, configType, configText, value, required, ...options) {
        if (type !== 'input') {
            return {
                elementType: type,
                elementConfig: {
                    placeholder: configText,
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
                    minLength: required ? 6 : null,
                    emailCheck: configType === 'email',
                    valid: false
                },
                touched: false,
            }
        }
    }

    changeHandler = (event, id) => {

        let validation = null;
        if (this.state.loginForm[id].validation) {
            validation = {
                ...this.state.loginForm[id].validation,
                valid: checkValidity(event.target.value, this.state.loginForm[id].validation)
            }
        }

        // Updating the state immutably
        const updatedForm = {
            ...this.state.loginForm,
            [id]: {
                ...this.state.loginForm[id],
                value: event.target.value,
                validation,
                touched: true
            }
        }

        // if (updatedForm[id].touched) this.props.loginErrorHandler(null);

        let formIsValid = false;
        formIsValid = Object.keys(updatedForm).map((curr) => {
            if (updatedForm[curr].validation) {
                return updatedForm[curr].validation.valid;
            }
            else return true;
        })
            .reduce((acc, curr) => {
                return acc && curr;
            });

        this.setState({ loginForm: updatedForm, formIsValid });
    }

    loginHandler = (loginMode) => {
        this.props.authHandler(
            this.state.loginForm.email.value,
            this.state.loginForm.password.value,
            loginMode,
            this.state.loginForm.keepMeLoggedin.value
        );
    }

    render() {
        const style = { textAlign: 'center', color: 'red', fontSize: 'x-large', padding: '0 50px' };

        let loginForm = [];
        let form = null;
        for (let key in this.state.loginForm) {
            loginForm.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        form = loginForm.map(current => {
            return (
                <Input
                    key={current.id}
                    elementType={current.config.elementType}
                    elementConfig={current.config.elementConfig}
                    value={current.config.value}
                    change={(event) => this.changeHandler(event, current.id)}
                    label={current.config.elementConfig.placeholder}
                    touched={current.config.touched}
                    invalid={current.config.validation ? !current.config.validation.valid : null}
                    error={this.props.error}
                />
            );
        });

        if (this.props.loader) form = (
            <div>
                <Spinner />
                <p style={{ fontSize: 'xx-large', textAlign: 'center', color: '#ffb657' }}>
                    Loading...
                </p>
            </div>
        );

        // let authRedirect = null;
        // if(this.props.isAuth && (this.props.price > 2)) {
        //     authRedirect = <Redirect to="/checkout" />;
        // }
        // else if(this.props.isAuth) authRedirect = <Redirect to="/" />;
        let authRedirect = null;
        if (this.props.isAuth) {
            if (this.props.price > 2) {
                authRedirect = <Redirect to="/checkout" />;
            }
            else authRedirect = <Redirect to="/" />;
        }

        return (
            <div className={classes.Login}>
                <form>
                    {form}
                    {this.props.error ? <p style={style}>{this.props.error}</p> : null}
                </form>

                <div className={classes.Button}>
                    <Button
                        disabled={!this.state.formIsValid}
                        btnType="Success"
                        click={() => this.loginHandler('login')}
                    >
                        log-in
                    </Button>
                    <Button
                        disabled={!this.state.formIsValid}
                        btnType="Danger"
                        click={() => this.loginHandler('signup')}
                    >
                        sign-up
                    </Button>
                </div>

                {authRedirect}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        loader: state.order.loader,
        error: state.auth.error,
        price: state.price.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authHandler: (email, password, loginMode, keepLoggedIn) => dispatch(actionCreators.authHandler(email, password, loginMode, keepLoggedIn))
        // loginErrorHandler: (error) => dispatch(actionCreators.loginErrorHandler(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));