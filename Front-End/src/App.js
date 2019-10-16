import React from "react";
import List from "./components/List";
import Add from "./components/Add";
import axios from "axios";

class App extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    this.getData()
    console.log("Done By\nAhmad Al-Ghzawi");
  }

  getData() {
    axios.get(`http://localhost:9000/get_data`)
      .then(response => this.setState({tasks: response.data}))
      .catch (error => console.log(error))
  }

  toggle = id => {
    axios.put(`http://localhost:9000/toggle/${id}`)
      .then(response => this.setState({tasks: response.data}))
      .catch (error => console.log(error))
  };

  create = title => {
    axios.post(`http://localhost:9000/add`, { title })
      .then( response => this.setState({tasks: response.data}))
      .catch (error => console.log(error))
  };

  edit = (id, title) => {
    axios.put(`http://localhost:9000/edit/${id}/${title}`)
      .then(response => this.setState({tasks: response.data}))
      .catch (error => console.log(error))
  };

  deleteItem = id => {
    axios.delete(`http://localhost:9000/delete/${id}`)
      .then (response => this.setState({tasks: response.data}))
      .catch (error => console.log(error))
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="container mt-5" style={{ maxWidth: "50%" }}>
          <div style={{ backgroundColor: "#000"}}>
            <h3 className=" mt-4 ml-2 text-white">Todo list</h3>
            <Add create={this.create} />
            <hr />
          </div>
          <List
            todos={this.state.tasks}
            toggle={this.toggle}
            deleteItem={this.deleteItem}
            edit={this.edit}
          />
        </div>
      </div>
    );
  }
}

export default App;
