import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';

import ToDo from './pages/toDo/ToDo';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import SingleTask from './pages/singleTask/SingleTask';
import NotFound from './pages/notFound/NotFound';
import NavBar from './components/navBar/NavBar';

function App () {
  const pages = [
    {
      path: "/",
      element: <ToDo />,
    },
    {
      path: "/todo",
      element: <ToDo />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/task/:taskId",
      element: <SingleTask />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

    return (
      <BrowserRouter>
        <main className="App">
          <NavBar/>
          <Routes>
            {
              pages.map(page =>(
                <Route 
                key={page.path}
                path={page.path} 
                element={page.element} 
                />
              ))
            }
          </Routes>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
        </main>
      </BrowserRouter>
    );
  }

export default App;
