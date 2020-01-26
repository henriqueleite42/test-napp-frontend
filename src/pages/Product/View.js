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
      id: "sku",
      name: "sku",
      label: "SKU",
      type: "text",
      placeHolder: "Product Identifier",
      value: ''
    },
    {
      id: "name",
      name: "name",
      label: "Name",
      type: "text",
      placeHolder: "Product Name",
      value: ''
    },
    {
      id: "price",
      name: "price",
      label: "Price",
      type: "number",
      value: '',
      placeHolder: "Product Price"
    },
    {
      id: "min",
      name: "min",
      label: "Minimum Purchase Quantity",
      type: "number",
      value: '',
      placeHolder: "Minimum Purchase Quantity"
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

  return (
    <Form
      name="Product"
      onSubmit={ () => window.location.href = makePath(['product']) }
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