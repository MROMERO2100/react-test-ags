import axios from 'axios';
import React from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  //const [todos, setTodos] = useState([]);
  const [todos, setTodos] = React.useState([]);

  const getToDoList = () => {
    axios.get("http://localhost:3000/v1/to-dos").then(({ data: todos }) => {
      setTodos(todos);
    });
  }

  React.useEffect(() => {
    getToDoList();
  }, []);

  //console.log(todos);
  const addTodo = (todo) => {
    console.log('Llego Action NewTodo.! ');
    console.log('Data Recibida: title: '+todo.text+', Description: '+todo.description);
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const todoNew = {
      'title': todo.text,
      'description': todo.description
    };
    axios.post(`http://localhost:3000/v1/to-dos`,todoNew)
      .then(response => {
        console.log(response.data);
        getToDoList();
      })
      .catch(error => {
        console.log('There was an error!', error); 
         console.error('There was an error!', error); 
        });
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    const todoUpdate = {
      'title': newValue.text,
      'description': newValue.description,
      'isDone': false
    };
    axios.patch(`http://localhost:3000/v1/to-dos/${todoId}`,todoUpdate)
      .then(response => {
        console.log(response.data);
        getToDoList();
      })
      .catch(error => {
        console.log('There was an error!', error); 
         console.error('There was an error!', error); 
        });
  };

  const removeTodo = (id) => {
    //const removedArr = [...todos].filter((todo) => todo.id !== id);
    axios.delete(`http://localhost:3000/v1/to-dos/${id}`)
      .then(response => {
        //console.log(response)
        getToDoList();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    //setTodos(removedArr);
  };

  const completeTodo = (todoId) => {
    axios.patch(`http://localhost:3000/v1/to-dos/isdone/${todoId}`)
      .then(response => {
        console.log(response.data);
        getToDoList();
      })
      .catch(error => {
        console.log('There was an error!', error); 
         console.error('There was an error!', error); 
        });
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
