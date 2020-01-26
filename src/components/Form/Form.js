import React from 'react';
import Button from '../Button/Button';
import './style/Form.css';

/*
Exemple:

<Form
  name="FormTitle"
  onSubmit={ onSubmit Function }
  onCancel={ onCancel Function }
>
  Children (Inputs, Buttons, Etc)
</Form>
*/

const Form = ({children, name, onSubmit, onCancel}) => {
  return (
    <div className="form-main">
      <div className="form-header">
        <h2>{name}</h2>
      </div>
      <div className="form-content">
        {children}
      </div>
      <div className="form-footer">
        <div className="form-buttons">
          {onCancel && <Button
            name="Cancel"
            color="red"
            click={ e => onCancel(e) }
          />}
          {onSubmit && <Button
            name="Confirm"
            color="green"
            submit="1"
            click={ e => onSubmit(e) }
          />}
        </div>
      </div>
    </div>
  );
}

export default Form;