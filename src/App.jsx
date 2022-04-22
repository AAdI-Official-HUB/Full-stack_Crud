import React from "react";
import "./App.css";
import Table from "./Table.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  let theme = createTheme({
    typography: {},
    palette: {
      primary: {
        main: "#fff",
        // contrastText: "#fff",
      },
    },
  });
   // To control screen size from style and margin  
  return (
   // <ThemeProvider theme={theme}>
      <div style={{ margin: "10px" }}>
        <Table />
      </div>
    //</ThemeProvider>
  );
}

export default App;
