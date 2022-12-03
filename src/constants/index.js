export const STATUS = { 
    NEW: 'New', 
    DOING: 'Doing', 
    DONE: 'Done', 
};

export const ROUTE = {
    All: '/',
    NEW: '/new',
    DOING: '/doing',
    DONE: '/done',
    ADD_NEW: '/add-new',
    DETAIL: '/detail',
    DETAIL_TASK: '/detail/:idTask',
    NOT_FOUND: '*',
};

export const LIST_TO_DO_KEY = 'l_t_d_k';

export const MODE = {
    SHOW_LIST: 'showList',
    ADD_NEW: 'addNew',
    DETAIL_TASK: 'detailTask'
};

export const SIDEBAR_ITEMS = [
    {
        url: ROUTE.All,
        title: 'All Task'
    },
    {
        url: ROUTE.NEW,
        title: 'New Task'
    },
    {
        url: ROUTE.DOING,
        title: 'Doing Task'
    },
    {
        url: ROUTE.DONE,
        title: 'Done Task'
    },
];

export const ITEM_PER_PAGE = 4;

export const ALERT = {
    NONE: 0,
    SUCCESS: 1,
    ERROR: 2,
    MINIMUM_TIME_MS: 1000,
    MAXIMUM_TIME_MS: 10000,
    DEFAULT_TIME: 3,
};

export const FEATURES = {
    ADD_NEW: 'addNew',
    EDIT_TASK: 'editTask',
    DELETE_TASK: 'deleteTask',
};