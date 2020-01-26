import React, { useState } from 'react';
import './style/Input.css';

/*
Exemple:

<Input
  view=(ReadOnly Flag)

  divClass="exemple-class"
  className="InputClass"

  onFocus={ onFocus Function }
  onBlur={ onBlur Function }
  onChange={ onChange Function }

  label="InputLabel"
  placeHolde="InputPlaceHolder"
  id={ Input id }
  type={ Input Type }
  name={ Input Name }
  min={ (Input Limit }
  max={ (Input Limit }
  value={ Input Value }
/>
*/

const Input = props => {
  const [active, setActive] = useState("")

  const focus = e => {
    if (!props.view) setActive(" input-active");

    if (props.onFocus) props.onFocus(e);
  }

  const blur = e => {
    if (!props.view) setActive("");

    if (props.onBlur) props.onBlur(e);
  }

  const change = e => {
    if (props.onChange) props.onChange(e)
  }

  return (
    <div
      className={
        "input-main" + (props.divClass ? " "+props.divClass : "") + active
      }
    >
      { props.label && <label className="input-label" htmlFor={ props.id }>{ props.label }</label> }
      <input
        id={ props.id }
        type={ props.type }
        name={ props.name }
        min={ (props.type === "number" ? props.min : '') }
        max={ (props.type === "number" ? props.max : '') }
        minLength={ (props.type === "text" ? props.min : '') }
        maxLength={ (props.type === "text" ? props.max : '') }
        value={ props.value }
        readOnly={ props.view }
        className={
          "input-input"+
          (props.inputClass ? " "+props.inputClass : "")+
          (props.view ? " read-only" : "")
        }
        placeholder={ props.placeHolder }
        onBlur={ blur }
        onFocus={ focus }
        onChange={ change }
      />
    </div>
  );
}

export default Input;