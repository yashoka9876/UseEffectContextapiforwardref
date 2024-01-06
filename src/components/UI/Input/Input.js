import { forwardRef, useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css'

const Input = forwardRef((props,ref) => {
    const inputt=useRef();
    function ImperativeHandler(){
        inputt.current.focus();
    }
    useImperativeHandle(ref,()=>{
        return {
            action:ImperativeHandler
        }
    })
  return (
    <>
     <div
          className={`${classes.control} ${
            props.isValid===false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.Id}>{props.lable}</label>
          <input
            ref={inputt}
            type={props.type}
            id={props.Id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    </>
  )
})


export default Input