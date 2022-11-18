import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    /**
     * this is the simple wat to execute this function if any change occure in email and password
     * Issue: This function execute on every key stroke
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
     */

    /** debouncing and useEffect Cleanup(that execute before actual code) */
    const validTimer = setTimeout(() => {
      setFormIsValid( enteredEmail.includes('@') && enteredPassword.trim().length > 6 )
    }, 200)

    return () => {
      clearTimeout(validTimer)
    }
  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid( event.target.value && enteredPassword.trim().length > 6 )
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid( enteredEmail.includes('@') && event.target.value.trim().length > 6 )
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${ emailIsValid === false ? classes.invalid : '' }`} >
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        </div>
        <div className={`${classes.control} ${ passwordIsValid === false ? classes.invalid : '' }`} >
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}> Login </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
