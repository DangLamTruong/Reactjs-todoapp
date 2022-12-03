import { useState, useEffect } from "react";
import TodoItems from "../components/TodoItem";
import { MODE, STATUS } from "../constants";
import AddNewForm from "../shared/AddNewForm";
import { localStorageUlti } from "../functions/localStorage";
import DetailTaskForm from "../shared/DetailTaskForm";

const { get, set} = localStorageUlti('todoItems', []);
const POSITION_KEYWORD = 9;

const BodyTodo = ({ mode, handleChangeRenderMode}) => {
    const [indexCurrentTask, setIndexCurrentTask] = useState(null);
    const [currentTask, setCurrentTask] = useState({
        title:'',
        creator:'',
        description:'',
        status: STATUS.NEW,
    }); 

    const handleShowDetailTask = (item, index) => {
        setCurrentTask(item);
        setIndexCurrentTask(index);
        handleChangeRenderMode(MODE.DETAIL_TASK);
    };

    const [todoItems, setTodoItems] = useState([]);   

    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        setTodoItems(get());
    }, []);
    
    useEffect(() => {
        const keyword = window.location.search.slice(POSITION_KEYWORD)
        setFilterText(keyword);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: e.target[0].value,
            creator: e.target[1].value,
            description: e.target[2].value,
            status: STATUS.NEW,
        };
        const todoItemsLocalStorage = get();
        setTodoItems([data, ...todoItemsLocalStorage]);
        set([data, ...todoItemsLocalStorage]);
        handleChangeRenderMode(MODE.SHOW_LIST);
    };

    const renderTodoItem = () => {
        return todoItems
            .filter((item) => item.title.includes(filterText))
            .map((item, index) =>  (
            <TodoItems
                key={`${item.title}_${index}`}
                title={item.title}
                creator={item.creator}
                status={item.status}
                description={item.description}
                handleClick={() => handleShowDetailTask(item, index)}
            />
        ));
    };

    const handleChangeTask = (e, item) => {
        e.preventDefault();
        const todoItemsLocalStorage = get();
        if (item) {
            todoItemsLocalStorage.splice(indexCurrentTask, 1, item);
        } else {
            todoItemsLocalStorage.splice(indexCurrentTask, 1);
        }
        setTodoItems([...todoItemsLocalStorage]);
        set([...todoItemsLocalStorage]);
        handleChangeRenderMode(MODE.SHOW_LIST);
    };

    const chooseMode = () => {
        switch (mode)  {
            case MODE.SHOW_LIST:
                return renderTodoItem();
            case MODE.ADD_NEW:
                return (
                    <AddNewForm
                        handleSubmit={handleSubmit}
                    />
                );
            case MODE.DETAIL_TASK:
                return (
                    <DetailTaskForm 
                        currentTask={currentTask}
                        handleChangeTask={handleChangeTask}
                    />
                );
            default:
                return renderTodoItem();
        }
    };

    return <div className="containerBody">
        {chooseMode()}
        </div>  
};

export default BodyTodo;
