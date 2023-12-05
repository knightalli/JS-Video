import React, { useState } from "react";

const App = () => {
  function increment(value) {
    setCounter(value);
    console.log(value);
  }
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      {counter}
      <button onClick={() => increment(counter+1)}>+</button>
    </div>
  );
};

export default App;
