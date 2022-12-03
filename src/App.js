// import logo from './logo.svg';
// import './App.css';
import "./styles/index.css";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CountContext from "./context/CountContext";

import Home from "./screens/Home";
import All from "./screens/All";
import New from "./screens/New";
import Doing from "./screens/Doing";
import Done from "./screens/Done";
import EditAddNew from "./screens/EditAddNew";
import { ROUTE } from "./constants";
import Alert from "./components/Alert.jsx"

import countStore from "./stores/todoStores";
import nameStore from "./stores/inputStores";
import { observer, Observer } from "mobx-react";

import { MODE } from "./constants";
import { observe } from "mobx";
// import NameItem from './components/Form';
// import Todoitem from './components/todoitems';
// import Box from './components/Boxtodo';
// import SmallMedal from './components/Boxtodo';
// import { localStorageUlti } from "./components/Funtion";
function App() {
  const [name, setName] = useState("");
  const [renderMode, setRenderMode] = useState(MODE.SHOW_LIST);
  const handleChangeRenderMode = (mode = MODE.ADD_NEW) => {
    setRenderMode(mode);
  };

  // const { count, upCount, downCount} = useContext(CountContext);
  // alert('Whats up broo')
  // const [name, setName] = useState();
  // const [age, setAge] = useState();
  // const [valid, setValid] = useState();

  // useEffect (() => {
  //   console.log('.')
  //   if(name.length <= 6){
  //     console.log('check valid')
  //     setValid({valid:'Name is not valid', styleColor: 'red'});
  //   } else {
  //     setValid({valid:'', styleColor:'green'})
  //   }
  // })

  // const params = useLocation();
  // console.log('Addnew ~ userID', params);
  // const navigate = useNavigate();
  return (
    <div className="layout">
      <Routes>
        <Route
          path={ROUTE.NOT_FOUND}
          element={
            <Link
              to={ROUTE.All}
              style={{
                display: "block",
                margin: "30% auto",
                fontWeight: "bold",
                fontSize: 60,
                width: 475,
              }}
            >
              404 NOT FOUND
            </Link>
          }
        />
        <Route path={ROUTE.All} element={<Home />}>
          <Route path={ROUTE.ADD_NEW} element={<EditAddNew />} />
          <Route path={ROUTE.NEW} element={<New />} />
          <Route path={ROUTE.DOING} element={<Doing />} />
          <Route path={ROUTE.DONE} element={<Done />} />
          <Route path={ROUTE.DETAIL} element={<EditAddNew isEditTask />}>
            <Route
              path={ROUTE.DETAIL_TASK}
              element={<EditAddNew isEditTask />}
            />
            <Route index element={<div> Không có</div>} />
          </Route>
          <Route index element={<All />} />
        </Route>
      </Routes>
      <Alert />
{/* 
      <div>
        <h2>{countStore.Count}</h2> 
        <h1>{nameStore.Name}</h1>
        <input 
          type="text"
          value={nameStore.value}
          onChange={(e) => {
            nameStore.inputValue(e.target.value);
          }}
        />
        <button onClick={() => nameStore.submit()}>Submit</button>
        <button onClick={() => countStore.up()}>Up</button>
        <button onClick={() => countStore.down()}>Down</button>
      </div> */}

      {/* <HeaderTodoApp 
        handleCreateNewTask= {() => handleChangeRenderMode(MODE.ADD_NEW)}
      />
      <SidebarTodo />
      <BodyTodo 
        mode = {renderMode} handleChangeRenderMode={handleChangeRenderMode}
      />
      {renderMode === MODE.SHOW_LIST && <Footer />}
{/*  */}
      {/* 
      <h3>COUNT: {count}</h3>
      <button onClick={upCount}>UP</button>
      <button onClick={downCount}>DOWN</button>  */}

      {/* <localStorageUlti /> */}
      {/* <Todoitem /> */}
      {/* <TaskItem /> */}
      {/* <ItemTask /> */}
      {/* <NewComponent /> */}
      {/* <NameItem /> */}
      {/* <Box
        avatar={'adasd'}
        groupName={'adasd'}
        memberList={'adasd'}
        status={'ádadad'}
        description={'blue'}
        numoftasks={'adasd'}
      />
      <hr />
      <Box
         avatar={'2222'}
         groupName={'a444'}
         memberList={'kkkk'}
         status={'35131'}
         description={'blđâsd'}
         numoftasks={'5363'}
      />
      <hr />
      < SmallMedal/> */}
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

export default observer(App);
