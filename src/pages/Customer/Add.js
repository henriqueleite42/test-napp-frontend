// External Import
import React, { useState } from 'react';
import axios from 'axios';

// Functions
import { checkCPF, makePath } from '../../functions';

// Components
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';

const Add = () => {
  // State
  const [inputs, setInputs] = useState([
    {
      id: "cpf",
      name: "cpf",
      label: "Customer CPF",
      type: "text",
      min: "11",
      max: "11",
      placeHolder: "CPF",
      value: '',
      onBlur: e => validateCPF(e),
      onChange: e => changeInputValue(e)
    },
    {
      id: "fname",
      name: "fname",
      label: "First Name",
      type: "text",
      min: "75",
      max: "75",
      value: '',
      placeHolder: "First Name",
      onChange: e => changeInputValue(e)
    },
    {
      id: "lname",
      name: "lname",
      label: "Last Name",
      type: "text",
      min: "75",
      max: "75",
      value: '',
      placeHolder: "Last Name",
      onChange: e => changeInputValue(e)
    }
  ]);

  // Validation

  // Cpf
  const validateCPF = e => {
    if (!checkCPF(e.target.value)) window.alert('Invalid CPF');
  }

  // Form Data
  const validation = data => {
    if (!checkCPF(data.cpf)) {
      return {
        status: false,
        msg: 'Invalid CPF'
      }
    }

    if (data.fname.length < 3 || data.fname.length > 50) {
      return {
        status: false,
        msg: 'Invalid First Name'
      }
    }

    if (data.lname.length < 3 || data.lname.length > 50) {
      return {
        status: false,
        msg: 'Invalid Last Name'
      }
    }

    return { status: true }
  }

  // Change State
  const changeInputValue = e =>{
    const newInputs = inputs.slice();
    newInputs.map((input, i) => {
      if(input.id === e.target.id){
        newInputs[i].value = e.target.value;
      }
    });

    setInputs(newInputs);
  }

  // Submit Form Data
  const onSubmit = e => {
    e.preventDefault();

    // Format Data
    let values = {};
    for (let input of inputs) {
      values[input.name] = input.value;
    }

    // Check Customer Data
    let result = validation(values);
    if (!result.status) {
      window.alert(result.msg)
      return false;
    }

    axios.post(makePath(['customer', 'add'], 'back'), values)
    .then(res => {
      if (res.status === 200) {
        if (res.data.status) {
          window.alert('Customer successfully registered')
          window.location.href = makePath(['customer'])
        } else {
          window.alert(res.data.msg)
        }
      } else {
        window.alert('Connection Error')
      }
    })
  }

  return (
    <Form
      name="Customer"
      onCancel={ () => window.location.href = makePath(['customer']) }
      onSubmit={ e => onSubmit(e) }
    >
      {inputs.map(input =>
        <Input
          key={ input.id }
          id={ input.id }
          name={ input.name }
          label={ input.label }
          type={ input.type }
          min={ input.min }
          max={ input.max }
          placeHolder={ input.placeHolder }
          value={ input.value }
          onBlur={ input.onBlur }
          onChange={ input.onChange }
        />
      )}
    </Form>
  );
}

export default Add;