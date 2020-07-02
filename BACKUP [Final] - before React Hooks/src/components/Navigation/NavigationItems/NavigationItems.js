import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItems.module.css';
import { NavigationItem } from './NavigationItem/NavigationItem'


export const NavigationItems = (props) => {
    const style = { textDecoration: 'none' }

    let loginHandler = (
        <NavLink to="/login" style={style} activeClassName={classes.active} >
            <NavigationItem isSideDrawer={props.isSideDrawer}>Login</NavigationItem>
        </NavLink>
    );
    if (props.isAuth) {
        loginHandler = (
            <NavLink to="/logout" style={style} activeClassName={classes.active} >
                <NavigationItem isSideDrawer={props.isSideDrawer}>Logout</NavigationItem>
            </NavLink>
        );
    }
    return (
        <div onClick={props.clicked}>
            <nav className={classes.NavigationItems} style={{ fontSize: 32 }}>
                <ul className={props.isSideDrawer ? classes.NavigationItemsM : classes.NavigationItems}>
                    <NavLink to="/" exact style={style} activeClassName={classes.active} >
                        <NavigationItem isSideDrawer={props.isSideDrawer}>Build a Burger</NavigationItem>
                    </NavLink>

                    {props.isAuth
                        ? <NavLink to="/checkout" style={style} activeClassName={classes.active} >
                            <NavigationItem isSideDrawer={props.isSideDrawer}>Checkout</NavigationItem>
                        </NavLink>
                        : null
                    }

                    {props.isAuth
                        ? <NavLink to="/orders" style={style} activeClassName={classes.active} >
                            <NavigationItem isSideDrawer={props.isSideDrawer}>My Orders</NavigationItem>
                        </NavLink>
                        : null
                    }

                    {loginHandler}

                </ul>
            </nav>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(NavigationItems);