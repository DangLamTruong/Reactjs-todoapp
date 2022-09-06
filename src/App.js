// import logo from './logo.svg';
import './App.css';
import './styles/Main.css';
import './styles/header.css'
// import NewComponent from './components/NewComponent';
// import TaskItem from './Todoapp';
// const ItemTask = () => <p className='todo-app'>Hello</p>
import HeaderTodoApp from './components/HeaderTodoComponent';

function App() {
  return (
    <div id="container">
      {/* <TaskItem /> */}
      {/* <ItemTask /> */}
      {/* <NewComponent /> */}
      <HeaderTodoApp />
      {/* <div class='image'>
        <img src='./image/titleGame.png' alt='' />
      </div>
      <div id="quiz" id-question='0' id-scene='0' current-scene='0'>
        <div id="quiz__content">Nhấn Start để bắt đầu game</div>
        <div id="quiz__footer">
          <button id="start">Bắt đầu</button>
          <button className = "quiz__option" >Có</button>
          <button className = "quiz__option" >Không</button>
        </div>
      </div> */}
    </div>
  );
}

export default App;
