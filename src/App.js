import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';

import { routes } from './routes';
import { useSelector } from 'react-redux';

import Spinner from './components/spinner/Spinner';
import NavBar from './components/navBar/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App () {

    const loading = useSelector(store => store.loader.isLoading);
    return (
          <BrowserRouter>
          <main className="App">
            <NavBar/>            
              {loading ? <Spinner/> : ""}
            <Routes>
              {
                routes.map(page =>(
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
