import React, {useState} from "react";

const CountContext = React.createContext(null);

const CountProvider = ({ children}) => {
    const [count, setCount] = useState(0);
    return (
        <CountContext.Provider
            value={{
                count: count,
                upCount: () => setCount(count + 1),
                downCount: () => setCount(count - 1),
                changeCount: (value) => {
                    if(!isNaN(value)) {
                        setCount(count + value)
                    }
                }
            }}
        >
            {children}
        </CountContext.Provider>
    );
};

export { CountProvider };
export default CountContext;