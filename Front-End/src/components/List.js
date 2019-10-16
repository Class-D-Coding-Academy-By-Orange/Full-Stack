import React, { Component } from "react";
import Item from "./Item";


export default class List extends Component {
  render() {
    const { todos, toggle, deleteItem, edit } = this.props;
    let items = todos.map(item => (
      <Item
        key={item._id}
        item={item}
        toggle={toggle}
        deleteItem={deleteItem}
        edit={edit}
      />
    ));
    return (
      // <div style={{ border: '3px green dotted' }}>
      <div className="mt-5">
        {items}
      </div>
      // </div>
    );
  }
}
