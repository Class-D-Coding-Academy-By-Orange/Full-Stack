import React from 'react';
import axios from 'axios';
import List from './components/List';
import Add from './components/Add';

class App extends React.Component {
  state = {
    todos: []
  };


  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    this.getRequest();
  }


  edit = ID => {
    axios
    .put(`http://localhost:9000/edit/${ID}`)
    .then(({data}) => {
      // handle success
      // console.log('AAAAA:',data);
      this.setState({ todos: data });
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
  };

  deleteItem = ID => {
    console.log(`http://localhost:9000/delete/${ID}`);
    axios
      .delete(`http://localhost:9000/delete/${ID}`)
      .then(({data}) => {
        // handle success
        console.log(data);
        this.setState({ todos: data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  getRequest = () => {
    console.log('get request called');
    axios
      .get('http://localhost:9000/data')
      .then(({data}) => {
        // handle success
        console.log(data);
        this.setState({ todos: data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  // item like {id:77, title : "eat" , isCompleted : false}
  addItem = item => {
    // let newState = this.state.todos;
    // newState.push(item);
    // this.setState({ todos: newState });
    axios
      .post('http://localhost:9000/addNewTask',item)
      .then(r => {
        // handle success
        console.log(r.data);
        this.setState({ todos: r.data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  render() {
    const { state, edit, deleteItem, addItem } = this;
    const { todos, moath, colorText } = state;
    return (
      <div style={{ border: 'black 1px solid' }}>
        <h1 style={{ color: colorText }}>{moath}</h1>
        {/* <button onClick={edit.bind(this, 3)}>toggle</button> */}
        {/* <button onClick={this.getRequest}>get Request</button> */}
        <br />
        {/* <button onClick={deleteItem.bind(this, 2)}>deleteItem</button> */}
        {/* <button
          onClick={addItem.bind(this, {
            id: 77,
            title: 'eat',
            isCompleted: false
          })}
        >
          AddItem
        </button> */}

        <br />
        <Add addItem={addItem} />
        <List toggle={edit} todos={todos} deleteOne={deleteItem} />
        {/* <h6>App component1</h6> */}
        {/* <h1>{todos[1].title}</h1> */}
      </div>
    );
  }
}

export default App;
