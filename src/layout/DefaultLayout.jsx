import HeaderTodoApp from "./HeaderTodoComponent";
import SidebarTodo from "./SidebarTodoComponent";
import Footer from "./FooterTodoComponent";

function DefaultLayout ({ children }) {
    return (
        <div className="layout">
            <HeaderTodoApp />
            <SidebarTodo />
          
            <div className="containerBody">{children}</div>
        </div>
    );
}

export default DefaultLayout;