
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import '../css/main.css';

const root = createRoot(document.getElementById('root'))

root.render(<BrowserRouter window={window}><App></App></BrowserRouter>)




