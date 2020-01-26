// External Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functions
import { makePath } from '../../functions';

// Components
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';

const View = props => {
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
      value: ''
    },
    {
      id: "fname",
      name: "fname",
      label: "First Name",
      type: "text",
      min: "75",
      max: "75",
      value: '',
      placeHolder: "First Name"
    },
    {
      id: "lname",
      name: "lname",
      label: "Last Name",
      type: "text",
      min: "75",
      max: "75",
      value: '',
      placeHolder: "Last Name"
    }
  ]);

  // Get and Set customer Data
  useEffect(() => {
    if (props.id) {
      axios.get(makePath(['customer', 'search', props.id], 'back'))
      .then(res => {
        if (res.status === 200) {
          if (res.data.cpf) {
            const newInputs = inputs.slice();
            newInputs.map((input, i) => {
              newInputs[i].value = res.data[input.name];
            });

            console.log(newInputs)
            setInputs(newInputs);
          } else {
            window.alert('Invalid Customer')
            window.location.href = makePath(['customer'])
          }
        } else {
          window.alert('Connection Error')
          window.location.href = makePath(['customer'])
        }
      })
    } else {
      window.alert('Invalid Customer')
      window.location.href = makePath(['customer'])
    }
  }, []);

  return (
    <Form
      name="Customer"
      onSubmit={ () => window.location.href = makePath(['customer']) }
    >
      {inputs.map(input =>
        <Input
          view="1"
          key={ input.id }
          id={ input.id }
          name={ input.name }
          label={ input.label }
          type={ input.type }
          placeHolder={ input.placeHolder }
          value={ input.value }
        />
      )}
    </Form>
  );
}

export default View;