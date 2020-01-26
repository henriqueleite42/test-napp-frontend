import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makePath } from '../functions';

const Home = props => {
  const [info, setInfo] = useState({
    customer: 0,
    product: 0,
    sale: 0
  });

  useEffect(() => {
    axios.get(makePath([], 'back'))
    .then(res => {
      if (res.status === 200) {
        setInfo(res.data)
      }
    })
  }, []);

  const homeContent = () => {
    if (props.link == 'egg') {
      return <img
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.quickmeme.com%2Fimg%2F16%2F164b7f86bb8dca99ac3ff45841b6bcb7dc61ad4fb5ec965eb91e4950c3dacb92.jpg&f=1&nofb=1"
        alt="Yes, that is a Star Wars Meme"
      />
    } else {
      return <p>{ JSON.stringify(info) }</p>
    }
  }

  return (
    <div>{ homeContent() }</div>
  );
}

export default Home;