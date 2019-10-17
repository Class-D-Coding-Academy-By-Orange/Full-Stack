//========================================IMPORT===============================================//
import React from "react";
//======================================COMPONENT==============================================//
const Item = ({ del, todo, toggleChild }) => {
  //======================================TOGGLE===============================================//
  let toggleIsCompleted = () => {
    toggleChild(todo.id);
  };
  //======================================RENDER===============================================//
  const { _id, title, isCompleted } = todo;
  return (
    <div className="item">
      <input
        onClick={toggleIsCompleted}
        type="checkbox"
        defaultChecked={isCompleted}
      />
      <span style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
        {title}
      </span>
      <button className="delButton" onClick={() => del(_id)}>
        X
      </button>
    </div>
  );
};
export default Item;
