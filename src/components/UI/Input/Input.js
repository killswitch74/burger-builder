import React from 'react';
import classes from './Input.module.css';

export const Input = (props) => {
    
    let inputEl = null;
    let validationMsg = null;
    const inputClasses = [classes.InputEl];
    if((props.invalid && props.touched) || props.error) {
        inputClasses.push(classes.Invalid_border, classes.Invalid_text);
        validationMsg = <p style={{color: 'red', margin: '5px 0', fontSize: 'x-large'}}>please enter a valid {props.elementConfig.placeholder}</p>;
    }
    
    switch (props.elementType) {
        
        case 'input':
            inputEl = ( 
                <div>
                    {validationMsg}
                    <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />
                </div>
            );      
            break;

        case 'textarea':
            inputEl = (
                <div>
                    {validationMsg}
                    <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />
                </div>
            );
            break;

        case 'select' :
            inputClasses[0] = classes.Select;
            inputClasses.push(props.touched ? null : classes.Invalid_text);
            // inputClasses.push(props.touched ? null : classes.Invalid);
            inputEl = (
                <div>
                    <label className={classes.Label}>{props.label}</label>
                    <select className={inputClasses.join(' ')} value={props.value} onChange={props.change} > 
                        {props.elementConfig.options.map(current => (
                            <option key={current.value} value={current.value} name={props.label}>
                                {current.value}
                            </option>
                        ))}
                    </select>
                </div>
            );
            break;

        case 'radio' :
            inputClasses[0] = classes.Radio;
            inputClasses.push(props.touched ? null : classes.Invalid_text);
            inputEl = (
                <div>
                    <label className={classes.Label}>{props.label}</label>
                    {props.elementConfig.options.map(current => (
                        <div key={current.value} className={inputClasses.join(' ')}>
                            <input 
                                type={props.elementType}
                                name={props.label}
                                value={current.value}
                                onChange={props.change}
                            /> {current.value}
                        </div>
                    ))}
                </div>
            );
            break;

        case 'checkbox' :
            inputClasses[0] = classes.Radio;
            inputClasses.push(props.touched ? null : classes.Invalid_text);
            inputEl = (
                <div>
                    <label className={classes.Label}>{props.label}</label>
                    {props.elementConfig.options.map(current => (
                        <div key={current.value} className={inputClasses.join(' ')}>
                            <input 
                                type={props.elementType} 
                                name={props.label}
                                value={current.value}
                                onChange={props.change}
                            /> {current.value}
                        </div>
                    ))}
                </div>
            );
            break;
            
        default: 
            inputEl = (
                <div>
                    {validationMsg}
                    <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />
                </div>
            );
    }
    
    return (
        <div className={classes.Input}>
            {inputEl}
        </div>
    );
}