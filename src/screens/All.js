import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ListTodoItems from "../components/ListTodoItem";
import Footer from "../layout/FooterTodoComponent";
import { ITEM_PER_PAGE, LIST_TO_DO_KEY } from "../constants";
import { localStorageUlti } from "../functions/localStorage";
import usePagination from "../hook/usePagination";

const { get } = localStorageUlti(LIST_TO_DO_KEY, []);

const All = () => {
    const [todoItems, setToDoItems] = useState([]);
    const [searchParams] = useSearchParams();
    const { jumpPage, currentPage, currentData, maxPage} = usePagination(
        todoItems,
        ITEM_PER_PAGE
    );

    useEffect(() => {
        const listTodoItems = get().filter((item) => 
            item.title.toLowerCase().includes(searchParams.get('keyword')  || '')    
        );
        setToDoItems(listTodoItems);
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

export default All;