import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = (todo) => {
    fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        setTodos((todos) => todos.filter((item) => item.id !== todo.todo_id))
      );
  };

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, [todos]);
  return (
    <HomeContainer>
      <h1>My Todos</h1>
      <div className="todo-container">
        <form>
          <input></input>
          <button>Create Todo</button>
        </form>
        <ul className="todo-list">
          {todos.map((item) => (
            <div key={item.todo_id}>
              <li>{item.description}</li>
              <button>Edit Todo</button>
              <button onClick={() => deleteTodo(item)}>Delete Todo</button>
            </div>
          ))}
        </ul>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  width: 100%;

  h1 {
    font-family: "Montserrat", sans-serif;
  }

  .todo-container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .todo-list {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
  }
`;

export default Home;
