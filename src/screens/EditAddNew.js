import { useState, useEffect, useContext, useRef } from "react"; 
import { Route, useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import { LIST_TO_DO_KEY, STATUS, ROUTE, FEATURES, ALERT } from "../constants";
import { localStorageUlti } from "../functions/localStorage";
import InputText from "../components/InputText";
import Button from "../components/Button";
import RadioCheckboxButton from "../components/RadioCheckboxButton";
import { setValidateRule } from "../functions/validation";
import AlertContext from "../context/AlertContext";
import { initMessage } from "../functions/shared";
import clientServer from "../server/clientServer";
    

const radioList = [
    {
        title: STATUS.NEW,
        value: STATUS.NEW,
    },
    {
        title: STATUS.DOING,
        value: STATUS.DOING,
    },
    {
        title: STATUS.DONE,
        value: STATUS.DONE,
    },
];

const DEFAULT_VALUE = {
    id: '',
    title: '',
    creator: '',
    description: '',
    status: STATUS.NEW,
};

// const { get, set } = localStorageUlti(LIST_TO_DO_KEY, []);

const getMessageAddNew = initMessage(FEATURES.ADD_NEW);
const getMessageEditTask = initMessage(FEATURES.EDIT_TASK);
const getMessageDeleteTask = initMessage(FEATURES.DELETE_TASK);

const EditAddNew = ({ isEditTask }) => {
    const alert = useContext(AlertContext);
    const [form, setForm] = useState(DEFAULT_VALUE);  
    const [validData, setValidData] = useState({
        title: false,
        creator: false,
        description: true,
    });
    const { idTask} = useParams();
    const formValueRef = useRef(null);
    
    // useEffect(() => {
    //     if (isEditTask) setDeFaultValue();
    // }, []);
    
    useEffect(() => {
        if (idTask) {
            console.log("id ",idTask)
            clientServer
            .get(`todoItems/${idTask}`)
            .then((res) => {
                console.log(res);
                const { creator, description, title } = res.data;
                setForm(res.data);
                const formField = setValidateRule(res.data);
                formValueRef.current = res.data;
                console.log(res.data)
                
                setValidData({
                    title: formField.title.regExPattern.test(title),
                    creator: formField.creator.regExPattern.test(creator),
                    description: formField.description.regExPattern.test(description),
                });
            })
            .catch((err) => {
                console.error('error:', err)
            });
        }
        }, [])
    // const formField = setValidateRule(form);
    const navigate = useNavigate();
   

    const setDeFaultValue = (e) => {
        e && e.preventDefault();
        const { creator, description, title } = formValueRef.current;
        setForm(formValueRef.current);
        const formField = setValidateRule(formValueRef.current);

        setValidData({
            title: formField.title.regExPattern.test(title),
            creator: formField.creator.regExPattern.test(creator),
            description: formField.description.regExPattern.test(description),
        });
    };

    const handleChangeForm = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        if (name !== 'status') {
            setValidData({
                ...validData,
                [name]: setValidateRule(form)[name].regExPattern.test(value)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...form,
            id: nanoid(),
            status: STATUS.NEW,
        };
        // set([data, ...get()]);
        clientServer
            .post('todoItems', data)
            .then(() => {
                alert.success(
                    getMessageAddNew('Task is created successfully!'),
                    ALERT.DEFAULT_TIME
                );
                navigate(ROUTE.All);
            })
            .catch((err) => {
                alert.error(getMessageAddNew(err.message), ALERT.DEFAULT_TIME);
            })
    };
    // console.log(alert)
    const handleChangeTask = (e, isDelete) => {
        e.preventDefault();
        // const  todoItemsLocalStorage = get();
        if (!isDelete) {
            clientServer
                .patch(`todoItems/${idTask}`, form)
                .then(() => {
                    alert.success(
                        getMessageEditTask(
                            `Task have id: ${idTask} which is updated successfully!`
                        ),
                        ALERT.DEFAULT_TIME
                    );
                    navigate(ROUTE.All);
                })
                .catch((err) => {
                    alert.error(getMessageEditTask(err.message), ALERT.DEFAULT_TIME);
                });
            // todoItemsLocalStorage.splice(idTask, 1, form);        
        } else {
            clientServer
            // const deletedItem = todoItemsLocalStorage.splice(idTask, 1);
                .delete(`todoItems/${idTask}`)
                .then(() => {
                    alert.success(
                        getMessageDeleteTask(`Task have id: ${idTask} which is deleted!`),
                        ALERT.DEFAULT_TIME,
                        // {
                        //     label: 'UNDO',
                        //     action: () => {
                        //         const todoItemsLocalStorage = get();
                        //         todoItemsLocalStorage.splice(idTask, 0, deletedItem[0]);
                        //         set(todoItemsLocalStorage);
                        //         window.location.reload();
                        //     },
                        // }
                    );
                    navigate(ROUTE.All)
                })
                .catch((err) => {
                    alert.error(getMessageDeleteTask(err.message), ALERT.DEFAULT_TIME);
                });
        }
    };

    const renderForm = () => {
        const formField = setValidateRule(form || DEFAULT_VALUE);
        return  Object.keys(formField).map((keyItem, index) => {
            const { value, name, messageError} = formField[keyItem];
            return (
                <InputText 
                    {...formField[keyItem]}
                    key={`${name}_${index}`} 
                    onChange={handleChangeForm} 
                    error={!value || validData[name] ? '' : messageError}
                />
            );
        });
    };

    const checkValidate = () => 
        validData.title && validData.creator && validData.description;

    const renderRadioButton = () => {
        return radioList.map((item) => (
            <RadioCheckboxButton 
                key={`${item.value}`} 
                title={item.title} 
                type="radio"    
                handleOnChange={handleChangeForm}    
                name={"status"}    
                value={item.value} 
                isChecked={form.status === item.value} 
            />
        ));
    };

    return (
        <form className={'formClassContainer'}>
            {renderForm()}
            {isEditTask ? (
                <>
                    <div
                        style={{
                            display:'flex',
                            width:'100%',
                            justifyContent: 'space-between', 
                            marginTop: 40, 
                        }}
                    >
                        {renderRadioButton()}
                    </div>
                    <div 
                        style={{
                            display: "flex", 
                            width: 324, 
                            justifyContent: "space-between", 
                        }}
                    >
                        <Button 
                            title={'Save'}
                            disabled={!checkValidate()}
                            onClick={handleChangeTask}
                        />
                        <Button title={'Reset'} onClick={setDeFaultValue} />
                        <Button 
                            title={'Delete'}
                            onClick={(e) => handleChangeTask(e, true)}
                        />
                    </div>
                </>
            ) : (
                <div>
                    <Button 
                        title={'Save'}
                        type={'submit'}
                        disabled={!checkValidate()}
                        onClick={handleSubmit}
                    />
                </div>
            )}
        </form>
    );
};

export default EditAddNew;