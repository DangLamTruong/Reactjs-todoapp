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
import Alert from "./components/Alert";

import countStore from "./stores/todoStores";
import nameStore from "./stores/inputStores";
import { observer, Observer } from "mobx-react";

import { MODE } from "./constants";
// import { observe } from "mobx";
function App() {
  const [name, setName] = useState("");
  const [renderMode, setRenderMode] = useState(MODE.SHOW_LIST);
  const handleChangeRenderMode = (mode = MODE.ADD_NEW) => {
    setRenderMode(mode);
  };

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
    </div>
  );
}

export default observer(App);
