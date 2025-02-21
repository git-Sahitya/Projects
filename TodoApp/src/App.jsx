import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  //Function for local storage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Toggle function
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  // ADD THE TODO
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  // HANDLECHANGE THE TODO
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  // EDIT THE TODO
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // DELETE THE TODO
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // CHECKBOX THE TODO
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl bg-zinc-400 p-5 min-h-[80vh] max-w-[90vw] md:w-1/2">
       <h1 className="font-bold text-center text-xl">iTask - Manage a Todo at one place</h1>
        <div className="addTodo my-2  flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-blue-50 w-full rounded-lg px-4 py-1 "
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-amber-400 disabled:bg-amber-300 cursor-pointer hover:bg-amber-700 p-3 py-1 text-sm font-bold text-white rounded-md "
          >
            Save
          </button>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
        />
        Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos ">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || item.isCompleted) && (
                <div key={item.id} className="todo flex md:w-1/2  my-3 justify-between">
                  <div className="flex mt-2 gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full ">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-amber-400 cursor-pointer hover:bg-amber-700 p-3 py-1 text-sm font-bold text-white rounded-md m-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-red-500 cursor-pointer hover:bg-amber-700 p-3 py-1 text-sm font-bold text-white rounded-md m-1"
                    >
                     <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
