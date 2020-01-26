// External Import
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

// Functions
import { makePath, formatUSD } from '../../functions';

// Style
import './style/Add.css';

// Components
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Edit = props => {
  // Registered Customers
  const [ customersToSelect, setCustomersToSelect ] = useState([]);
  // Registered Products
  const [ productsToSelect, setProductsToSelect ] = useState([]);
  // Products Information
  const [ productsInfo, setProductsInfo ] = useState({});
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
    // Calculates the Total
    const newSale = Object.assign({}, sale);
    var newTotal = 0;
    products.forEach(product => {
      if (!['', 0].includes(product.price) && !['', 0].includes(product.qtd)) {
        newTotal += (product.price * product.qtd);
      }
    });
    newSale.total = newTotal;
    setSale(newSale);

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

            setProductsInfo(prods);
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
  }, [products]);

  // Determines the minimum sell quantity
  const minQtd = index => {
    if (products[index] && products[index].product != '') {
      return productsInfo[products[index].product].min;
    } else {
      return "1"
    }
  }

  // Validates sale data
  const validate = () => {
    const saleInfo = { products: [] };

    if (sale.customer.length < 1) {
      window.alert('Customer is required');
      return;
    } else {
      saleInfo.customer = sale.customer;
    }

    if (sale.total <= 0) {
      window.alert('Sale Total must be greater than Zero');
      return;
    }

    if (products.length < 1) {
      window.alert('Sale must have at least one product');
      return;
    }

    let stop = false;
    for (let product of products) {
      if (product.product && productsInfo[product.product]) {
        if (isNaN(product.qtd)) {
          window.alert('Product '+productsInfo[product.product].name+' Has Invalid Quantity, Must be at least '+productsInfo[product.product].min);
          stop = true;
          break;
        }

        if (!['good', 'great'].includes(product.profitability)) {
          window.alert('Product '+productsInfo[product.product].name+' Has Invalid Profitability, Increase the Sell Price');
          stop = true;
          break;
        }

        if (!checkQtd(product.product, product.qtd)) break;

        saleInfo.products.push(product);
      }
    }

    if (stop) return;

    if (saleInfo.products.length < 1) {
      window.alert('Sale must have at least one product');
      return;
    }

    axios.post(makePath(['sale', 'edit', props.id], 'back'), saleInfo)
    .then(res => {
      if (res.status === 200) {
        if (res.data.status) {
          window.alert('Sale successfully updated')
          window.location.href = makePath(['sale'])
        } else {
          window.alert(res.data.msg)
        }
      } else {
        window.alert('Connection Error')
      }
    })
  }

  // Check if selected qtd is multiple of minimum qtd
  const checkQtd = (id, qtd) => {
    if (id) {
      let minQtd = productsInfo[id].min;
      let newQtd = parseInt(qtd);

      if (newQtd < minQtd) {
        window.alert('Product '+productsInfo[id].name+' Has Invalid Quantity, Must be at least '+productsInfo[id].min);
        return false;
      } else if (newQtd > 0) {
        let up = Math.ceil(newQtd / minQtd) * minQtd;

        if (up != newQtd) {
          let down = Math.floor(newQtd / minQtd) * minQtd;

          window.alert('Product '+productsInfo[id].name+' Has Invalid Quantity, try '+down+' or '+up);
          return false;
        }
      }

      return true;
    }
  }

  // Add product to list
  const addProduct = () => {
    var newProducts = products.slice();
    newProducts.unshift({
      profitability: 'none',
      product: '',
      price: '',
      qtd: ''
    });
    setProducts(newProducts);
  }

  // Remove product from list
  const removeProduct = index => {
    const newProducts = products.slice();
    delete newProducts[index];
    setProducts(newProducts);
  }

  // Change Customer
  const selectCustomer = e => {
    const newSale = Object.assign({}, sale);
    newSale.customer = e.target.value
    setSale(newSale);
  }

  // Change Product
  const changeProduct = (index, e) => {
    const newProducts = products.slice();

    newProducts[index].product = e.target.value;
    newProducts[index].price = productsInfo[e.target.value].price;
    newProducts[index].qtd = productsInfo[e.target.value].min;
    newProducts[index].profitability = 'good';

    setProducts(newProducts);
  }

  // Change Product Info (Qtd or Price)
  const handleChange = (input, index, e) => {
    const newProducts = products.slice();

    if (newProducts[index].product == '') {
      window.alert('No Product Selected');
      return;
    }

    newProducts[index][input] = e.target.value;

    if (input === 'price') {
      let originalPrice = productsInfo[newProducts[index].product].price;
      let actualPrice = (!isNaN(e.target.value) ? e.target.value : 1.00);

      if (actualPrice > originalPrice) {
        newProducts[index].profitability = 'great';
      } else if (actualPrice >= (originalPrice * 0.9)) {
        newProducts[index].profitability = 'good';
      } else {
        newProducts[index].profitability = 'bad';
      }
    }

    setProducts(newProducts);
  }

  // Render
  return (
    <div className="sale-form-main form-main">
      <div className="form-header">
        <h2>Sale</h2>
        <h4>Total: { formatUSD.format(sale.total) }</h4>
      </div>
      <div className="sale-form-content form-content">
        <div>
          <Select
            name="customer"
            label="Customer"
            value={ sale.customer }
            options={ customersToSelect }
            divClass="form-content-1"
            onChange={ e => selectCustomer(e) }
          />
          <Button
            name="Add Product"
            color="green"
            divClass="form-content-2"
            click={ () => addProduct() }
          />
        </div>
        <div className="sale-products">
          { products.map((product, index) =>
            <div key={ index } className="sale-item">
              <div>
                <span><b>Total:</b> { formatUSD.format(product.price * product.qtd) }</span>
                <span><b>Min Qtd:</b> { minQtd(index) }</span>
                <div>
                  <span><b>Profitability:</b> </span>
                  <span className={ "proft " + product.profitability }>
                    { product.profitability.toUpperCase() }
                  </span>
                </div>
              </div>
              <Select
                name="product"
                label="Product"
                value={ product.product }
                options={ productsToSelect }
                onChange={ e => changeProduct(index, e) }
              />
              <Input
                type="number"
                id= { product.product }
                min="0"
                name="qtd"
                label="Quantity"
                value={ product.qtd }
                placeHolder="Quantity"
                onBlur= { e => checkQtd(e.target.id, e.target.value)}
                onChange={ e => handleChange('qtd', index, e) }
              />
              <Input
                type="number"
                min="0"
                name="price"
                label="Sell Price"
                value={ product.price }
                placeHolder="Sell Price"
                onChange={ e => handleChange('price', index, e) }
              />
              <Button
                color="red tiny"
                click={ () => removeProduct(index) }
              >
                <FontAwesomeIcon className="nav-icon" icon="trash-alt"/>
              </Button>
            </div>
          ) }
        </div>
      </div>
      <div className="form-footer">
        <div className="form-buttons">
          <Button
            name="Cancel"
            color="red"
            click={ () => window.location.href = makePath(['sale']) }
          />
          <Button
            name="Confirm"
            color="green"
            submit="1"
            click={ () => validate() }
          />
        </div>
      </div>
    </div>
  );
}

export default Edit;