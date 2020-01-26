// External Imports
import React from 'react';

// Components
import NavBar from './components/NavBar/NavBar';

// Pages
import Product from './pages/Product';
import Sale from './pages/Sale';
import Customer from './pages/Customer';
import Home from './pages';

// Style
import './style/App.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingBag,
  faUser,
  faDollarSign,
  faHome,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faShoppingBag,
  faUser,
  faDollarSign,
  faHome,
  faTrashAlt
);

// Render
function App() {
  const link = window.location.pathname.split('/');

  let page;
  switch (link[1]) {
    case 'product':
      page = <Product
        action={link[2]}
        id={link[3]}
      />;
      break;
    case 'sale':
      page = <Sale
        action={link[2]}
        id={link[3]}
      />;
      break;
    case 'customer':
      page = <Customer
        action={link[2]}
        id={link[3]}
      />;
      break;
    case '':
    default:
      page = <Home/>;
      break;
  }

  return (
    <div>
      <NavBar/>
      <div className="container">
        { page }
      </div>
    </div>
  );
}

export default App;
