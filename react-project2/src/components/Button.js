import React, { Component } from "react";
import '../styles/Button.css'

function Button ({children, handleClick, btnClass, disabled }){
  return <button className={`button ${btnClass === undefined? "" : btnClass} ${disabled ? 'disabled' : ''} `} onClick={handleClick} disabled={disabled} type="button">{children}</button>
}

export default Button

Button.defaultProps = {
  disabled: false,
}