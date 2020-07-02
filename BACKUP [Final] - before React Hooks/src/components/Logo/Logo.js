import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

export const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
        {/* <a href="https://killswitch74.github.io/burger-builder"> */}
        <a href="/">
            <img src={burgerLogo} alt="Burger Builder" />
            &nbsp;Burger Builder
        </a>
    </div>
);