import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  // console.log("todo :", todo);
  // console.log("value :", value);

  const socket = io("http://localhost:8080/");
  // console.log("socket: ", socket);

  useEffect(() => {
    // client-side
    socket.on("connect", () => {
      console.log("Made socket connection in client",socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("send-todo", (data) => {
      console.log("data: ", data.value);
      setTodo([...todo, data.value])
    });
  }, [todo]);

  return (
    <>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button
          onClick={() => {
            setTodo([...todo, value]);
            setValue("");
            socket.emit("add-todo", {value})
          }}
        >
          Add Todo
        </button>
      </div>

      <ul>
        {todo.map((v, i) => (
          <li key={i}>
            {v}{" "}
            <button
              onClick={() => {
                const oldTodo = [...todo];
                console.log("oldTodo: ", oldTodo);
                oldTodo.splice(i, 1);
                console.log("oldTodo: ", oldTodo);
                setTodo(oldTodo);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
