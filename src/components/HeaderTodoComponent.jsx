

const HeaderTodoApp = () => {
    return <div className="header">
        <div className="btn-Create">Create New Task</div>
        <div className="searching">
            <input type="text" placeholder="Type something to search" id="input-task"/>
            <div className="btn-Search">Search</div>
        </div>
    </div>
}

export default HeaderTodoApp;