import "./App.css";
import { useEffect, useState, useRef } from "react";
import ItemList from "../components/itemList";
import NewTodo from "../components/newTodo";
import { getTodos, addTodo, removeTodo } from "./dbconnection.jsx";

function App() {
  const [TODO_ITEMS, setItemList] = useState([]);
  const [globalId, setGlobalId] = useState(4);
  const [editableItems, setEditableItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        const todosArray = Object.values(data);
        if (todosArray.length === 0) {
          setItemList([]);
        } else {
          setItemList(todosArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const validateAlfaNumChars = (input) => {
    return /^(?:\d|\w| )*$/g.test(input);
  };

  const addItem = async (inputValue) => {
    if (!validateAlfaNumChars(inputValue))
      alert("Please enter alphanumeric characters only.");
    else {
      setGlobalId(globalId + 1);
      addTodo(globalId, inputValue);
      setItemList([
        ...TODO_ITEMS,
        { id: globalId.toString(), value: inputValue },
      ]);
    }
  };

  const removeItem = async (idToRemove) => {
    const updatedItemList = TODO_ITEMS.filter((item) => item.id !== idToRemove);
    setItemList(updatedItemList);

    await removeTodo(idToRemove);
  };

  const handleClickEditButton = (editableItemId) => {
    let currEditables = Object.values(editableItems);

    if (!currEditables.includes(editableItemId)) {
      let newEditableList = [...currEditables, editableItemId];
      console.log(newEditableList);
      setEditableItems(newEditableList);
    } else {
      let filteredList = currEditables.filter((item) => item != editableItemId);
      setEditableItems(filteredList);
    }
    /*
    var elements = document.getElementsByClassName("editMode");
    console.log(Object.values(elements))
    Object.values(elements).map((e) => {
      if (
        (e.style.display !== "inline" && e.style.display !== "none") ||
        e.style.display === "none"
      )
        e.style.display = "inline";
      else if ((e.style.display = "inline")) e.style.display = "none";
    });
    */
  };

  return (
    <>
      <div className="container">
        <ItemList
          items={TODO_ITEMS}
          editables={Object.values(editableItems)}
          removeItem={removeItem}
          handleClickEditButton={handleClickEditButton}
        ></ItemList>
        <NewTodo addItem={addItem}>New Todo</NewTodo>
      </div>
    </>
  );
}

export default App;
