import { BrowserRouter } from "react-router-dom"
import ThemeProvider from "./contexts/ThemeContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
