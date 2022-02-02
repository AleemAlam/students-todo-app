import React from "react";
export default function TodoInput({
  handleChange,
  id,
  title,
  body,
  error,
  handleClick,
}) {
  return (
    <div>
      <form onSubmit={(e) => handleClick(e)}>
        <input
          className="inputTitle"
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title..."
          value={title}
        />
        <input
          className="inputBody"
          onChange={handleChange}
          type="text"
          name="body"
          placeholder="Add Task..."
          value={body}
        />
        <button className="addBtn">Add</button>
      </form>
      {error && (
        <p
          style={{ color: "red", fontSize: "14px", margin: "0px 0px 10px 5px" }}
        >
          All feilds are required *
        </p>
      )}
    </div>
  );
}
