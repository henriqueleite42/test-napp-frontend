// External Import
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Functions
import { formatCPF, makePath } from '../../functions';

// Components
import Button from '../../components/Button/Button';
import ListItem from '../../components/ListItem/ListItem';

const List = () => {
  const [ customers, setCustomers ] = useState([]);

  // Get all Customers
  useEffect(() => getCustomers(), []);

  // Delete
  const confirmDelete = id => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios.delete(makePath(['customer', 'delete', id], 'back'))
      .then(res => {
        if (res.status === 200) {
          getCustomers();
        }
      })
    }
  }

  // Update Customers
  const getCustomers = () => {
    axios.get(makePath(['customer'], 'back'))
    .then(res => {
      if (res.status === 200) {
        setCustomers(res.data);
      }
    })
  }

  // Render
  return (
    <div className="list-main">
      <div className="list-header">
        <h2>Customers</h2>
        <Button
          name="New"
          color="green"
          click={ () => window.location.href = makePath(['customer', 'add']) }
        />
      </div>
      <div className="list-content">
        <ul>
          {customers.map(customer =>
            <ListItem
              key={ customer._id }
              name={ customer.fname+' '+ customer.lname }
              subName={ "CPF: "+formatCPF(customer.cpf) }
              url={ 'customer' }
              id={ customer._id }
              onDelete={ id => confirmDelete(id) }
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default List;