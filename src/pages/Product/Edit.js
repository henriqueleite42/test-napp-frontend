// External Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functions
import { makePath } from '../../functions';

// Components
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';

const Edit = props => {
  // State
  const [inputs, setInputs] = useState([
    {
      id: "sku",
      name: "sku",
      label: "SKU",
      type: "text",
      min: "3",
      max: "20",
      placeHolder: "Product Identifier",
      value: '',
      onChange: e => changeInputValue(e)
    },
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      min: "3",
      max: "100",
      placeHolder: "Product Name",
      value: '',
      onChange: e => changeInputValue(e)
    },
    {
      id: "price",
      name: "price",
      label: "Price",
      type: "number",
      min: "0",
      value: '',
      placeHolder: "Product Price",
      onChange: e => changeInputValue(e)
    },
    {
      id: "min",
      name: "min",
      label: "Minimum Purchase Quantity",
      type: "number",
      min: "1",
      value: '',
      placeHolder: "Minimum Purchase Quantity",
      onChange: e => changeInputValue(e)
    }
  ]);

  // Get and Set Product Info
  useEffect(() => {
    if (props.id) {
      axios.get(makePath(['product', 'search', props.id], 'back'))
      .then(res => {
        if (res.status === 200) {
          if (res.data.sku) {
            const newInputs = inputs.slice();
            newInputs.map((input, i) => {
              newInputs[i].value = res.data[input.name];
            });

            setInputs(newInputs);
          } else {
            window.alert('Invalid Product')
            window.location.href = makePath(['product'])

          }
        } else {
          window.alert('Connection Error')
          window.location.href = makePath(['product'])
        }
      })
    } else {
      window.alert('Invalid Product')
      window.location.href = makePath(['product'])
    }
  }, []);

  // Validation

  // Check Form Data
  const validation = data => {
    if (data.sku.length < 3 || data.sku.length  > 20) {
      return {
        status: false,
        msg: 'Invalid SKU'
      }
    }

    if (data.name.length < 3 || data.name.length > 50) {
      return {
        status: false,
        msg: 'Invalid Name'
      }
    }

    if (data.price <= 0) {
      return {
        status: false,
        msg: 'Invalid Price'
      }
    }

    if (data.min != parseInt(data.min)) {
      return {
        status: false,
        msg: 'Invalid Minimum Purchase Quantity'
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

  // Submit Form
  const onSubmit = e => {
    e.preventDefault();

    let values = {};
    inputs.map(input => values[input.name] = input.value)

    let result = validation(values);

    if (!result.status) {
      window.alert(result.msg)
      return false;
    }

    axios.post(makePath(['product', 'edit', props.id], 'back'), values)
    .then(res => {
      if (res.status === 200) {
        if (res.data.status) {
          window.alert('Product successfully updated')
          window.location.href = makePath(['product'])
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
      name="Product"
      onCancel={ () => window.location.href = makePath(['product']) }
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

export default Edit;