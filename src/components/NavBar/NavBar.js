import React from 'react';
import NavItem from './NavItem';
import './style/NavBar.css';

const NavBar = () => {
  const itens = [
    {
      name: "Home",
      link: "",
      icon: "home"
    },
    {
      name: "Products",
      link: "product",
      icon: "shopping-bag"
    },
    {
      name: "Customers",
      link: "customer",
      icon: "user"
    },
    {
      name: "Sales",
      link: "sale",
      icon: "dollar-sign"
    }
  ];

   return (
    <nav className="nav-bar">
      <ul className="nav-ul">
        { itens.map((item, index) =>
          <NavItem
            key={ index }
            name={ item.name }
            link={ item.link }
            icon={ item.icon }
          />
        )}
      </ul>
    </nav>
  );
}

export default NavBar;