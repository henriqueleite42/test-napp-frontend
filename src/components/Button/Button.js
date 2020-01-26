import React from 'react';
import './style/Button.css';

/*
Exemple:

<Button
  divClass="exemplde-class"
  color="green"
  click={ onClick Function }
  name="ButtonContent"
/>
*/

const Button = props => {
  return (
    <div className={ "button-main"+(props.divClass ? " "+props.divClass : "") }>
      <button
        type={ props.submit ? "submit" : "button"}
        className={ "button-button " + props.color }
        onClick={ e => props.click(e) }
      >
        { props.name }
        { props.children }
      </button>
    </div>
  );
}

export default Button;