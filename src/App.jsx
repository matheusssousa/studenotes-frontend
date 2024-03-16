import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/Authenticate/AuthContext";
import ThemeProvider from "./context/Theme/ThemeContext";
import MyRoute from "./routes/MyRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/global.css'

const contextClass = {
  success: "bg-sky-200 text-sky-600 fill-sky-600",
  error: "bg-red-200 text-red-600 fill-red-600",
  info: "bg-gray-200 text-gray-600 fill-gray-600",
  warning: "bg-orange-200 text-orange-600 fill-orange-600",
  default: "bg-indigo-200 text-indigo-600 fill-indigo-600",
  dark: "bg-zinc-900 font-gray-300",
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer
            position="top-right"
            limit={3}
            toastClassName={({ type }) => contextClass[type || "default"] + " relative flex p-1 rounded-md justify-between overflow-hidden cursor-pointer"}
            bodyClassName={() => "text-xs flex items-center p-3"}
            autoClose={4000} />
          <MyRoute />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
