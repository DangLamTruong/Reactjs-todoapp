import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ListTodoItems from "../components/ListTodoItem";
import Footer from "../layout/FooterTodoComponent";
import { ITEM_PER_PAGE, LIST_TO_DO_KEY, STATUS } from "../constants";
import { localStorageUlti } from "../functions/localStorage";
import usePagination from "../hook/usePagination";
import clientServer from "../server/clientServer";

const { get } = localStorageUlti(LIST_TO_DO_KEY, []);

const New = () => {
  const [todoItems, setToDoItems] = useState([]);
  const [searchParams] = useSearchParams();
  const { jumpPage, currentData, currentPage, maxPage } = usePagination(
    todoItems,
    ITEM_PER_PAGE
  );

  useEffect(() => {
    clientServer
      .get('todoItems')
      .then((res) => {
        const ListTodoItem = res.data.filter(
          (item) =>
            item.status === STATUS.NEW &&
            item.title.toLowerCase().includes(searchParams.get("keyword") || "")
        );
        setToDoItems(ListTodoItem);
      })
      .catch((err) => {
        console.error('error:', err );
      });
  }, [searchParams]);

  return (
    <>
      <ListTodoItems todoItems={currentData} />
      {maxPage > 1 && (
          <Footer 
            currentPage={currentPage}
            jumpPage={jumpPage}
            maxPage={maxPage}
          />
      )}
    </>
  );
};

export default New;
