import React from "react";
export default function TodoItem({
  title,
  body,
  status,
  handleToggle,
  handleDelete,
  id,

  updated,
}) {
  let myClass = "";
  if (status) {
    myClass = "todoToggle";
  }
  return (
    <div onClick={() => handleToggle(id)} className="todoItem">
      <p className={"todoTitle" + " " + myClass}>{title}</p>
      <p className={"todoBody" + " " + myClass}>
        {body}
        {updated && <span> (Updated)</span>}
      </p>
      <button
        className="deleteTodo"
        onClick={(event) => handleDelete(id, event)}
      >
        Delete
      </button>
    </div>
  );
}
