import React from 'react';
import classes from './Menu.module.css';
import {FiMenu} from 'react-icons/fi';

export const Menu = (props) => <FiMenu className={classes.Menu} onClick={props.click} />;