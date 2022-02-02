import React, { useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
// import styles from "./Todo.module.css";
import Paginate from "./Paginate";

const formData = {
  title: "",
  body: "",
  status: false,
};

function Todo() {
  const [data, setData] = React.useState(formData);
  const [task, setTask] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const handlePage = (flag) => {
    if (flag === "next") {
      setPage(page + 1);
      return;
    }
    setPage(page - 1);
  };
  const getData = () => {
    fetch(
      `https://fake-api-project-for-masai.herokuapp.com/tasks?_page=${page}&_limit=3`
    )
      .then((res) => {
        setTotalCount(+[...res.headers][6][1]);
        console.log(totalCount);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setTask(res);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getData();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (data.title.length > 0 && data.body.length > 0) {
      fetch("https://fake-api-project-for-masai.herokuapp.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          getData();
          setError(false);
          setData(formData);
        })
        .catch((error) => console.log(error.message));
    } else {
      setError(true);
    }
  };

  const handleToggle = (id) => {
    const updatedTodo = task.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : { ...todo }
    );
    setTask(updatedTodo);
  };
  const handleDelete = (id, event) => {
    event.stopPropagation();
    fetch(`https://fake-api-project-for-masai.herokuapp.com/tasks/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="container">
      <h1 className="title">Todo...</h1>
      <TodoInput
        handleChange={handleChange}
        handleClick={handleClick}
        {...data}
        error={error}
      />
      {task.map((item) => {
        console.log(item);
        return (
          <TodoItem
            key={item.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            {...item}
          />
        );
      })}
      <Paginate handlePage={handlePage} totalCount={totalCount} pageNo={page} />
    </div>
  );
}

export { Todo };
