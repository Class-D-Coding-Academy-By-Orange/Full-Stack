import React, { Component } from "react";

export default class Item extends Component {
  state = {
    edit: null
  };

  completedStyle = {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through"
  };

  buttonStyle = {
    width: "100%"
  };


  handleClickEdit = id => {
    this.setState({ edit: id });
  };

  edit = (id, edited) => {
    this.props.edit(id, edited);
    this.setState({ edit: null });
  };

  cancel = () => {
    this.setState({ edit: null });
  };

  render() {
    const { item, toggle, deleteItem } = this.props;
    return (
      // <div style={{ border: "3px red solid" }} >
      <>
        <div className="row py-3 item">
          <div className="col-md-8">
            {this.state.edit !== item._id ? (
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={"item" + item._id}
                  defaultChecked={item.isCompleted}
                />
                <label
                  className="custom-control-label"
                  htmlFor={"item" + item._id}
                  onClick={() => toggle(item._id)}
                  style={item.isCompleted ? this.completedStyle : null}
                >
                  {item.title}
                </label>
              </div>
            ) : (
              <input
                type="text"
                className="form-control"
                id="item-to-create"
                name="item-to-create"
                placeholder={item.title}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    const edited = event.target.value;
                    this.edit(item._id, edited);
                  }
                }}
              />
            )}
          </div>

          <div className="col-md-2 d-flex align-items-center">
            {!this.state.edit ? (
              <button
                className="btn btn-primary"
                onClick={() => this.handleClickEdit(item._id)}
                style={this.buttonStyle}
              >
                edit
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => this.cancel()}
                style={this.buttonStyle}
              >
                cancel
              </button>
            )}
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              onClick={() => deleteItem(item._id)}
              style={this.buttonStyle}
            >
              DELETE!
            </button>
          </div>
        </div>
        <hr />
      </>
    );
  }
}
