import React, { useContext, useEffect,useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
function emailReducer(state,action){
  if(action.type==='USER_INPUT'){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type==='USER_BLUR'){
    return {value:state.value,isValid:state.value.includes('@')}
  }
  return {value:'',isValid:false}
}

function passwordReducer(state,action){
  console.log(action.val)
  if(action.type ==='USER_INPUT'){
    return {value:action.val,isValid:action.val.trim().length > 6}
  }
  if(action.type==='USER_BLUR'){
    return {value:state.value,isValid:state.value.trim().length > 6}
  }
  return {value:'',isValid:false}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null})

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})

  const ctx=useContext(AuthContext)

  const [enteredCollegeName,setEnteredCollegeName]=useState('');
  const [collegeNameIsValid,setCollegeNameIsValid]=useState();


  const [formIsValid, setFormIsValid] = useState(false);

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState

  useEffect(()=>{
    setFormIsValid(
      emailIsValid && passwordIsValid && enteredCollegeName.trim().length > 3
    );
  },[emailIsValid,passwordIsValid,enteredCollegeName])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
      emailState.isValid && passwordState.isValid && enteredCollegeName.trim().length > 3
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value});

    // setFormIsValid(
    //   passwordState.isValid && emailState.value.includes('@') && enteredCollegeName.trim().length > 3
    // );
  };

  const collegeNameChangeHandler=(event)=>{
    setEnteredCollegeName(event.target.value);
    //  setFormIsValid(
    //   passwordState.isValid && emailState.value.includes('@') && event.target.value.trim().length > 3
    // );
  }

  const validateEmailHandler = () => {
    dispatchEmail({type:'USER_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'USER_BLUR'});
  };

  const validateCollegeNameHandler= ()=>{
    setCollegeNameIsValid(enteredCollegeName.trim().length > 3)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onlogin(emailState.value, passwordState.value,enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegeName">collegeName</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
