import React from "react";
import axios from "axios";
import List from "./components/List";
import Add from "./components/Add";

class App extends React.Component {
  state = {
    moath: 1,
    colorText: "red",
    todos: []
  };

  deleteItem = id => {
    axios.get(`http://localhost:9000/delete/${id}`).then(array => {
      console.log(array.data);
      this.setState({ todos: array.data });
    });
  };

  getRequest = () => {
    console.log("get request called");
    axios
      .get("http://localhost:9000/data")
      .then(r => {
        // handle success
        this.setState({ todos: r.data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
  addItem = item => {
    axios.post("http://localhost:9000/addNewTask", item).then(array => {
      this.setState({ todos: array.data });
    });
  };

  edit = ID => {
    let newState = this.state.todos.map((elem, i) => {
      if (ID === elem.id) {
        elem.isCompleted = !elem.isCompleted;
      }
      return elem;
    });
    this.setState({ todos: newState });
  };

  render() {
    const { state, edit, deleteItem, addItem } = this;
    const { todos, moath, colorText } = state;
    return (
      <div style={{ border: "black 1px solid" }}>
        <button onClick={this.getRequest}>get Request</button>
        <br />
        {/* <button onClick={addItem.bind(this)}>AddItem</button> */}
        <br />
        <Add addItem={addItem} todos={this.state.todos} />
        <List toggle={edit} todos={todos} deldel={deleteItem} />
      </div>
    );
  }
}

export default App;
