import { AuthContextProvider, MyRoutes, Light, Dark } from "./index.js";
import { ThemeProvider } from "styled-components";
import { createContext } from "react";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <MyRoutes />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
