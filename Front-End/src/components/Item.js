import React, { Component } from "react";

export default class Item extends Component {
  toggleIsCompleted = () => {
    this.props.toggleChild(this.props.todo._id);
  };
  render() {
    const { toggleIsCompleted } = this;
    const { deleteItem, todo } = this.props;
    const { _id, title, isCompleted } = todo;

    return (
      <div style={{ padding: "15px" }}>
        <hr />
        <p>
          <input
            onClick={toggleIsCompleted}
            type="checkbox"
            defaultChecked={isCompleted}
          />
          <span
            style={{ textDecoration: isCompleted ? "line-through" : "none" }}
          >
            {title}
          </span>
          <div style={{ float:"right" }}>
          <button style={{ backgroundColor: "red" }} onClick={() => deleteItem(_id)}>	&#128465;</button>
          </div>
        </p>
      </div>
    );
    
  }
}
