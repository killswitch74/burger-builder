import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Auxiliary } from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import { Toolbar } from '../Navigation/Toolbar/Toolbar'
import { SideDrawer } from '../Navigation/SideDrawer/SideDrawer';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
// import Checkout from '../../containers/Checkout/Checkout';
// import Orders from '../../containers/Orders/Orders';
import Auth from '../../containers/Auth/Auth';
import Logout from '../../containers/Auth/Logout/Logout';
import AsyncComponent from '../../hoc/asyncComponent';

const AsyncCheckout = AsyncComponent(() => import('../../containers/Checkout/Checkout'));
const AsyncOrders = AsyncComponent(() => import('../../containers/Orders/Orders'));

const Layout = (props) => {

    const [backdropToggle, setBackdropToggle] = useState(false);

    const backdropHandler = () => {
        let x = backdropToggle;
        setBackdropToggle(!x);
    }

    let route = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            {/* <Route path="/checkout" component={Checkout} /> */}
            {/* <Route path="/orders" component={Orders} /> */}
            <Route path="/login" component={Auth} />
            {/* <Route path="/logout" component={Logout} /> */}
            <Redirect to ="/" />
        </Switch>
    );

    if (props.isAuth) route = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={AsyncCheckout} />
            <Route path="/orders" component={AsyncOrders} />
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Redirect to ="/" />
        </Switch>
    );

    return (
        <Auxiliary>
            <Toolbar click={backdropHandler} />
            <SideDrawer toggle={backdropToggle} click={backdropHandler} />
            <div className={classes.Context}></div>
            <main className={classes.Context}>
                {props.children}
            </main>
            {route}
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);