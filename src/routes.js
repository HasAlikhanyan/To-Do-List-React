import ToDo from './pages/toDo/ToDo';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import SingleTask from './pages/singleTask/SingleTask';
import NotFound from './pages/notFound/NotFound';

const routes = [
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

export {routes};