import React, { useState } from "react";

function Input(props) {
  const [link, setLink] = useState(null);
  const handleChange = (e) => {
    setLink(e.target.value);
  };
  return (
    <div>
      <input type="text" autoComplete="off" onChange={handleChange} />
    </div>
  );
}

export default Input;
