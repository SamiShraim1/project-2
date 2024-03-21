
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Components/Home';
import Root from './routes/Root';
import Products from './pages/Products/Components/Products';
import NotFound from './pages/not found/Components/NotFound';
import SignUp from './pages/Sign Up/Components/SignUp';
import Login from './pages/Login/Components/Login';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "Products/",
        element: <Products/>
      },
      {
        path: "SignUp/",
        element: <SignUp />
      },
      {
        path: "Login/",
        element: <Login />
      },
      {
        path: '*',
        element:<NotFound/>
      },
    ],
  },
]);
function App() {
  
  
  
  
  
  
  
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App