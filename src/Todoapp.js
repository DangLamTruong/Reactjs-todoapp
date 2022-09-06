import React from "react";
import NewComponent from "./components/NewComponent";


const styleTitle = {color: 'red',fontSize: 20,}

class TaskItem extends React.Component {
    render() { 
      return <h2 style={styleTitle}>Hello</h2>;  
    }
}

export default TaskItem;