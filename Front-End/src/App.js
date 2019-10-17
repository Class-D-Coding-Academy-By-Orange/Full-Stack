//=======================================IMPORTS============================================//
import React from "react";
import axios from "axios";
import List from "./components/List";
import Add from "./components/Add";
import "./App.css";
//====================================MAIN COMPONENT========================================//

class App extends React.Component {
  state = {
    todos: []
  };
  //========================================GET===============================================//

  componentDidMount() {
    axios
      .get("http://localhost:9000/data")
      .then(({ data }) => {
        this.setState({ todos: data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  //========================================ADD===============================================//
  add = item => {
    axios.post("http://localhost:9000/addNewTask", item).then(({ data }) => {
      this.setState({
        todos: data
      });
    });
  };

  //========================================DEL===============================================//

  del = ID => {
    axios.delete(`http://localhost:9000/delete/${ID}`).then(({ data }) => {
      this.setState({
        todos: data
      });
    });
  };
  //========================================EDIT===============================================//

  edit = ID => {
    axios.get(`http://localhost:9000/edit/${ID}`).then(({ data }) => {
      this.setState({
        todos: data
      });
    });
  };
  //======================================RENDER===============================================//

  render() {
    const { edit, del, add } = this;
    return (
      <div className="middle">
        <div class="plate">
          <p class="script"><span>The </span></p>
          <p class="shadow text1">MERN</p>
          <p class="shadow text2"></p>
          <p class="shadow text3">TO DO LIST</p>
          <p class="script"><span>by Yaser Saleh</span></p>
        </div>
        <Add add={add} />
        <List toggle={edit} todos={this.state.todos} del={del} />
      </div>
    );
  }
}

export default App;
