import React from 'react';

// Pages
import Add from './Add';
import Edit from './Edit';
import View from './View';
import List from './List';

// Render
const Product = props => {
  switch (props.action) {
    case 'add':
      return <Add/>;
    case 'edit':
      return <Edit id={ props.id }/>;
    case 'view':
      return <View id={ props.id }/>;
    default:
      return <List/>;
  }
}

export default Product;