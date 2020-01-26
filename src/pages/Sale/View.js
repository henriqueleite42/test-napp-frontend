// External Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functions
import { makePath, formatUSD } from '../../functions';

// Style
import './style/Add.css';

// Components
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Add = props => {
  // Registered Customers
  const [ customersToSelect, setCustomersToSelect ] = useState([]);
  // Registered Products
  const [ productsToSelect, setProductsToSelect ] = useState([]);
  // Sale Data
  const [ sale, setSale ] = useState({
    customer: '',
    total: 0
  });
  // Sale Products
  const [ products, setProducts ] = useState([{
    profitability: 'none',
    product: '',
    price: '',
    qtd: ''
  }]);

  useEffect(() => {
    // Search for Customers and Products
    if (!customersToSelect || customersToSelect.length == 0) {
      axios.get(makePath(['customer'], 'back'))
      .then(res => {
        if (res.status === 200) {
          let cust = [{value: '', name: 'None Selected'}];

          if (res.data) {
            for (let customer of res.data) {
              cust.push({
                value: customer._id,
                name: customer.fname+' '+customer.lname
              })
            }

            setCustomersToSelect(cust);
          } else {
            window.alert('No Registered Customers')
            window.location.href = makePath(['sale'])
          }

        } else {
          window.alert('No Registered Customers')
          window.location.href = makePath(['sale'])
        }
      });

      axios.get(makePath(['product'], 'back'))
      .then(res => {
        if (res.status === 200) {
          let prodsToSelect = [{value: '', name: 'None Selected'}];
          let prods = {};

          if (res.data) {
            for (let product of res.data) {
              prodsToSelect.push({
                value: product._id,
                name: product.name
              });

              prods[product._id] = product;
            }

            setProductsToSelect(prodsToSelect);

            if (props.id) {
              axios.get(makePath(['sale', 'search', props.id], 'back'))
              .then(res => {
                if (res.status === 200) {
                  if (res.data.customer) {
                    setSale({
                      customer: res.data.customer,
                      total: res.data.total
                    });
                    setProducts(res.data.products);
                  } else {
                    window.alert('Invalid Sale')
                    window.location.href = makePath(['sale']);
                  }
                } else {
                  window.alert('Connection Error')
                  window.location.href = makePath(['sale'])
                }
              })
            } else {
              window.alert('Invalid Sale')
              window.location.href = makePath(['sale'])
            }
          } else {
            window.alert('No Registered Products')
            window.location.href = makePath(['sale'])
          }
        } else {
          window.alert('No Registered Products')
          window.location.href = makePath(['sale'])
        }
      });
    }
  }, []);

  const calcTot = () => {
    // Calculates the Total
    const newSale = Object.assign({}, sale);
    var newTotal = 0;
    products.forEach(product => {
      if (!['', 0].includes(product.price) && !['', 0].includes(product.qtd)) {
        newTotal += (product.price * product.qtd);
      }
    });
    return newTotal;
  }

  // Render
  return (
    <div className="sale-form-main form-main">
      <div className="form-header">
        <h2>Sale</h2>
        <h4>Total: { formatUSD.format(calcTot()) }</h4>
      </div>
      <div className="sale-form-content form-content">
        <div>
          <Select
            view="1"
            name="customer"
            label="Customer"
            value={ sale.customer }
            options={ customersToSelect }
            divClass="form-content-1"
          />
          <div></div>
        </div>
        <div className="sale-products">
          { products.map((product, index) =>
            <div key={ index } className="sale-item">
              <div>
                <span><b>Total:</b> { formatUSD.format(product.price * product.qtd) }</span>
                <span></span>
                <div>
                  <span><b>Profitability:</b> </span>
                  <span className={ "proft " + product.profitability }>
                    { product.profitability.toUpperCase() }
                  </span>
                </div>
              </div>
              <Select
                view="1"
                name="product"
                label="Product"
                value={ product.product }
                options={ productsToSelect }
              />
              <Input
                view="1"
                type="number"
                id= { product.product }
                min="0"
                name="qtd"
                label="Quantity"
                value={ product.qtd }
                placeHolder="Quantity"
              />
              <Input
                view="1"
                type="number"
                min="0"
                name="price"
                label="Sell Price"
                value={ product.price }
                placeHolder="Sell Price"
              />
              <div></div>
            </div>
          ) }
        </div>
      </div>
      <div className="form-footer">
        <div className="form-buttons">
          <Button
            name="Confirm"
            color="green"
            submit="1"
            click={ () => window.location.href = makePath(['sale']) }
          />
        </div>
      </div>
    </div>
  );
}

export default Add;