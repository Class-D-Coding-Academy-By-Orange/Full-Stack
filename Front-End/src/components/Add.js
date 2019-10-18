//========================================IMPORT===============================================//
import React, { Component } from "react";
import "../App.css";
//=====================================ADD COMPONENT===========================================//
export default class Add extends Component {
  state = {
    title: ""
  };
  //===================================ADD NEW TASK============================================//

  addNewTask = () => {
    if (this.state.title === "") {
      alert("Please type something!");
    } else {
      let newTask = { id: 666, title: this.state.title, isCompleted: false };
      this.props.add(newTask);
      this.setState({ title: "" });
    }
  };
  //=======================================TITLE===============================================//

  changeTitle = event => {
    this.setState({ title: event.target.value });
  };
  //======================================RENDER===============================================//
  render() {
    const {addNewTask, changeTitle } = this;
    return (
      <div>
        <input
          type="text"
          className="inputrino"
          value={this.state.title}
          onChange={changeTitle}
          placeholder="Buy Coffee .."
        />
        <button className="addButton" onClick={addNewTask}>
          Add
        </button>
      </div>
    );
  }
}
