import TodoItems from "./TodoItem";

const ListTodoItems = ({ todoItems }) => {
    return todoItems.map((item, index) => (
      <TodoItems
        key={`${item.title}_${index}`}
        title={item.title}
        creator={item.creator}
        status={item.status}
        description={item.description}
        idTask={item.id}
      />
    ));  
};

export default ListTodoItems;