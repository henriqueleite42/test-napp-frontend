// External Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functions
import { makePath, formatUSD } from '../../functions';

// Components
import Button from '../../components/Button/Button';
import ListItem from '../../components/ListItem/ListItem';

const List = () => {
  const [ sales, setSales ] = useState([]);

  // Get all Sales
  useEffect(() => getSales(), []);

  // Delete Sale
  const confirmaDelete = id => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      axios.delete(makePath(['sale', 'delete', id], 'back'))
      .then(res => {
        if (res.status === 200) {
          getSales();
        }
      })
    }
  }

  // Update Sales
  const getSales = () => {
    axios.get(makePath(['sale'], 'back'))
    .then(res => {
      if (res.status === 200) {
        setSales(res.data);
      }
    })
  }

  // Set the total value of the sale
  const totalSum = products => {
    let total = 0;

    for (let product of products) {
      total += (product.qtd * product.price);
    }

    return formatUSD.format(total);
  }

  // Render
  return (
    <div className="list-main">
      <div className="list-header">
        <h2>Sales</h2>
        <Button
          name="New"
          color="green"
          click={ () => window.location.href = makePath(['sale', 'add']) }
        />
      </div>
      <div className="list-content">
        <ul>
          {sales.map(sale =>
            <ListItem
              key={ sale._id }
              name={ sale.customer.fname+' '+sale.customer.lname }
              subName={ "Total: "+totalSum(sale.products) }
              url={ 'sale' }
              id={ sale._id }
              onDelete={ id => confirmaDelete(id) }
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;