import React, { useState, useRef } from "react";

const Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const timeOutRef = useRef(null);

  const handleChange = (e) => {
    clearTimeout(timeOutRef.current);
    const value = e.target.value;
    setInput(value);
  
    const processInput = () => {
      if (validateInput(value)) {
        let { r, g, b } = hexToRgb(value);
        setOutput(`rgb(${r}, ${g}, ${b})`);
      } else {
        setOutput("Ошибка!");
      }
    };
  
    if (value === "") {
      setOutput("");
    } else if (value.length === 7) {
      processInput();
    } else {
      timeOutRef.current = setTimeout(() => {
        processInput();
      }, 2000);
    }
  };
  

  const validateInput = (input) => /^#([0-9a-f]{3}){1,2}$/i.test(input);

  const hexToRgb = (hex) => {
    hex = hex.replace("#", "");

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  };

  const styles = {
    backgroundColor: output,
  };

  return (
    <div className="Converter" style={styles}>
      <input
        className="converter-input"
        type="text"
        value={input}
        onChange={handleChange}
      />
      {output !== "" && <p className="converter-output">{output}</p>}
    </div>
  );
};

export default Converter;
