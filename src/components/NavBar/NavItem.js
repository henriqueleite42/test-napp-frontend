import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { makePath } from '../../functions';

const NavItem = props => {
  return (
    <li key={ props.keyItem } className="nav-item">
      <a href={ makePath([props.link]) }>
        { props.icon && <FontAwesomeIcon className="nav-icon" icon={ props.icon }/> }
        <span className="nav-span">{ props.name }</span>
      </a>
    </li>
  );
}

export default NavItem;