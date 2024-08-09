import React, { useState, useEffect } from 'react';

const Addictional = () => {

    const [users, setUsers] = useState(0);
    const [value, setValue] = useState('Samara');

    function increment() {
        setUsers(users + 1);
      }
    
      function decrement() {
        setUsers(users - 1);
      }

    return(
        <div>

        <h1>{users}</h1>
        <h3>{'Users'}</h3>
        <button onClick={increment}>Yes</button>
        <button onClick={decrement}>No</button>

        <h2>{value}</h2>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        </div>

    );
};

export default Addictional;
