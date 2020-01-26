import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makePath } from '../functions';

const Home = () => {
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

  return (
    <p>{ JSON.stringify(info) }</p>
  );
}

export default Home;