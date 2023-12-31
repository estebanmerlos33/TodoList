import { useState } from "react";
import "./newTodo.css";
const NewTodo = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleClickButton = () => {
    if (inputValue !== "") {
      props.addItem(inputValue);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="newTodoContainer">
      <input
        placeholder="New ToDo"
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        maxLength="30"
      ></input>
      <button onClick={handleClickButton}>＋</button>
    </div>
  );
};

export default NewTodo;
