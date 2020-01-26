// External Import
import React from 'react';

// Functions
import { makePath } from '../../functions';

// Style
import './style/ListItem.css';

// Components
import Button from '../Button/Button';

/*
Exemple:

<ListItem
  name="ListItemTile"
  subName="ListItemSubTitle"
  onDelete={ onDelete Function }
/>
*/

const ListItem = ({ name, subName, url, id, onDelete }) => {
  return (
    <li className="listItem-main">
      <div className="listItem-info">
        <span>{ name }</span>
        <span>{ subName }</span>
      </div>
      <div className="listItem-buttons">
        <Button
          name="View"
          color="blue"
          click={ () => window.location.href = makePath([url, 'view', id]) }
        />
        <Button
          name="Edit"
          color="green"
          click={ () => window.location.href = makePath([url, 'edit', id]) }
        />
        <Button
          name="Delete"
          color="red"
          click={ () => onDelete(id) }
        />
      </div>
    </li>
  );
}

export default ListItem;