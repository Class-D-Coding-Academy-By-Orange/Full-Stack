import React, { Component } from "react";

export default class Add extends Component {
  state = {
    title: ""
  };

  addNewTask = () => {
    if(! this.state.title === "" ){
    let newTask = { title: this.state.title, isCompleted: false };
    this.props.addItem(newTask);
    this.setState({ title: "" });
    }else {
      alert(" Please Enter A title")
    }
    
  };

  changeTitle = event => {
    this.setState({ title: event.target.value });
  };
  render() {
    const { addNewTask, changeTitle } = this;
    return (
      <div>
        <h2>Add A To Do</h2>
        <input
          type="text"
          value={this.state.title}
          onChange={changeTitle}
          placeholder="Insert New ToDo"
        />
        <button style={{ backgroundColor:"lightgreen" }} onClick={addNewTask}>Submit</button>
      </div>
    );
  }
}
