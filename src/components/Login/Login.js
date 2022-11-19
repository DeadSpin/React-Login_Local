import React, { useEffect, useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/Context/auth-context';
import Input from '../UI/Input/input';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') 
    return { value: action.value, isValid: action.value.includes('@') }

  if(action.type === 'BLUR_INPUT') 
    return { value: state.value, isValid: state.value.includes('@') }
  
  return { value: '', isValid: null }
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT')
    return { value: action.value, isValid: action.value.trim().length > 6 }
  if(action.type === 'BLUR_INPUT')
    return { value: state.value, isValid: state.value.trim().length > 6 }

  return { value: '', isValid: null }
}

const Login = (props) => {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })
  const ctxData = useContext(AuthContext)

  useEffect(() => {
    const formCheckTimer = setTimeout(() => {
      setFormIsValid( emailState.isValid && passwordState.isValid )
    }, 500)

    return () => {
      clearTimeout(formCheckTimer)
    }
  },[ emailState.isValid, passwordState.isValid ])
  
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'BLUR_INPUT' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'BLUR_INPUT' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
      ctxData.onLogIn(emailState.value, passwordState.value);
    else if(!emailState.isValid)
      emailRef.current.focus()
    else
      passwordRef.current.focus()
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailRef} type="email" id="email" label="E-Mail" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} isValid={emailState.isValid} />
        <Input ref={passwordRef} type="password" id="password" label="Password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} isValid={passwordState.isValid} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}> Login </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
