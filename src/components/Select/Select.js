import React from 'react';
import './style/Select.css';

/**
Exemple:

<Select
  view = Flag ReadOnly
  name = Field Name
  value = Default / Current Value
  options = [
    {
     value = Option Value
     name = Option Name
    }
  ]
/>
 */

const Select = props => {
  const change = e => {
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className={ "select-main"+(props.divClass ? " "+props.divClass : "") }>
      <div className="select-header">
        <span>{ props.label }</span>
      </div>
      <div className="select-content">
        <select
          readonly={ props.view }
          value={ props.value }
          name={ props.name }
          onChange={ e => change(e) }
          className={ "select-select"+(props.className ? " "+props.className : "") }
        >
          { props.options.map(option =>
            <option key={ option.value } value={ option.value }>
              { option.name }
            </option>
          ) }
        </select>
      </div>
    </div>
  );
}

export default Select;