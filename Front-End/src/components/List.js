import React, { Component } from "react";
import Item from "./Item";
export default class List extends Component {
  render() {
    const { todos, toggle, deleteItem } = this.props;
    return (
      <div style={{
        margin: "auto",
        width: "70%",
        padding: "10px",
        textAlign: "left"
      }}>
        <br />
        {todos.map((todo, index) => {
          return (
            <Item
              key={todo._id}
              todo={todo}
              deleteItem={deleteItem}
              toggleChild={toggle}
            />
          );
        })}
      </div>
    );
  }
}
