import React, { Component } from 'react';

export default class Item extends Component {
  toggleIsCompleted = () => {
    console.log('toggleIsCompleted called From Item Component');
    this.props.toggleChild(this.props.todo._id);
  };
  render() {
    const { toggleIsCompleted, props } = this;
    const { deleteOne, todo } = props;
    const { _id, title, isCompleted } = todo;
    // const { toggleChild } = this.props;
    console.log(_id);

    return (
      <div style={{ border: '3px red solid' }}>
        <p>
          <input
            onClick={toggleIsCompleted}
            type="checkbox"
            defaultChecked={isCompleted}
          />

          <span
            style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
          >
            {/* {_id}. */}
             {title}
          </span>
        </p>
        <button onClick={() => deleteOne(_id)}>X</button>
        {/* <button onClick ={rahrah.bind(id)} >X</button> */}
      </div>
    );
  }
}
