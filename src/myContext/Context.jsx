import { createContext } from "react";
export const ThemeContext = createContext();

const ThemeProvider = ({children,bgColor}) => {
    return(
        <ThemeContext.Provider value={{bgColor}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
