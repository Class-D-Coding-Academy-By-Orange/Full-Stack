import React from "react";
import axios from "axios";
import List from "./components/List";
import Add from "./components/Add";

class App extends React.Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.getRequest();
  }

  getRequest = () => {
    console.log("get request called");
    axios
      .get("http://localhost:9000/data")
      .then(r => {
        this.setState({ todos: r.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addItem = item => {
    axios
      .post(`http://localhost:9000/addNewTask/`, item)
      .then(r => {
        console.log(r.data);
        this.setState({ todos: r.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteItem = ID => {
    console.log("_id", ID);
    axios
      .delete(`http://localhost:9000/delete/${ID}`)
      .then(r => {
        this.setState({ todos: r.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  edit = ID => {
    axios
      .put(`http://localhost:9000/edit/${ID}`)
      .then(r => {
        this.setState({ todos: r.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { state, edit, deleteItem, addItem } = this;
    const { todos } = state;
    return (
      <div style={{
        height: "681px",
        textAlign: "center",
      }}>
        <Add addItem={addItem} />
        <List toggle={edit} todos={todos} deleteItem={deleteItem} />
      </div>
    );
  }
}

export default App;
