//======================================IMPORT===============================================//
import React from "react";
import Item from "./Item";
//====================================COMPONENT==============================================//
const List = ({ todos, toggle, del })=>  {
    return (
      <div>
        {todos.map(todo => {
          return (
            <Item
              key={todo._id}
              todo={todo}
              del={del}
              toggleChild={toggle.bind(this, todo._id)}
            />
          );
        })}
      </div>
    );
  }
export default List;