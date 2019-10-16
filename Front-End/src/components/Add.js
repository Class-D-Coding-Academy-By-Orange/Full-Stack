import React, { Component } from "react";

class Add extends Component {
    render() { 
        return ( 
            <input
            style={{ maxWidth: "80%", margin:'0 auto' }}
            type="text"
            className="form-control "
            id="item-to-create"
            name="item-to-create"
            placeholder="add new item..."
            onKeyDown={event => {
              if (event.key === "Enter" && event.target.value !== '') {
                const textToCreate = event.target.value;
                event.target.value = "";
                this.props.create(textToCreate);
              }
            }}
          />
         );
    }
}
 
export default Add;