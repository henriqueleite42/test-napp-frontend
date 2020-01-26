// External Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functions
import { makePath } from '../../functions';

// Components
import Button from '../../components/Button/Button';
import ListItem from '../../components/ListItem/ListItem';

const List = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => getProducts(), []);

  // Delete Product
  const confirmDelete = id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(makePath(['product', 'delete', id], 'back'))
      .then(res => {
        if (res.status === 200) {
          getProducts();
        }
      })
    }
  }

  // Update Products
  const getProducts = () => {
    axios.get(makePath(['product'], 'back'))
    .then(res => {
      if (res.status === 200) {
        setProducts(res.data);
      }
    })
  }

  return (
    <div className="list-main">
      <div className="list-header">
        <h2>Products</h2>
        <Button
          name="New"
          color="green"
          click={ () => window.location.href = makePath(['product', 'add']) }
        />
      </div>
      <div className="list-content">
        <ul>
          {products.map(product =>
            <ListItem
              key={ product._id }
              name={ product.name }
              subName={ "SKU: "+product.sku }
              url={ 'product' }
              id={ product._id }
              onDelete={ id => confirmDelete(id) }
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;