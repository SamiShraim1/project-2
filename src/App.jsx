import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Components/Home";
import Root from "./routes/Root";
import Products from "./pages/Products/Components/Products";
import NotFound from "./pages/not found/Components/NotFound";
import SignUp from "./pages/auth/Sign Up/SignUp";
import Login from "./pages/auth/Login/Login";
import ProtectedRouuter from "./Components/ProtectedRouuter";
import UserContextProvider from './../context/User';
import Product from "./pages/Products/Components/OneProduct";
import Cart from './pages/cart/Cart';
import Order1 from "./pages/order/Order1";
import CategoryProducts from "./pages/Products/Components/CategoryProducts";
import Sendcode from "./pages/auth/forgot password/Sendcode";
import ForgotPassword from "./pages/auth/forgot password/ForgotPassword";
import ProtectedRouuter2realUser from "./Components/ProtectedRouuter2realUser";
import Profile from "./pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Products/",
        element: (
          <ProtectedRouuter>
            <Products />
          </ProtectedRouuter>
        ),
      },
      {
        path: "/category/:id",
        element:<CategoryProducts />,
      },
      {
        path: "Products/:id",
        element:<Product />,

      },
      {
        path:"Cart/",
        element:(
          <ProtectedRouuter>
            <Cart />
          </ProtectedRouuter>
        ),
        
      },
      {
        path:"order/:price",
        element:(
          <ProtectedRouuter>
            <Order1 />

          </ProtectedRouuter>
        ),
        
      },
      {
        path:"Profile/",
        element:(
          <ProtectedRouuter>
            <Profile />

          </ProtectedRouuter>
        ),
        
      },
      {
        path: "SignUp/",
        element: 
        <ProtectedRouuter2realUser>
          <SignUp />,

        </ProtectedRouuter2realUser>
      },
      {
        path: "Login/",
        element: 
        <ProtectedRouuter2realUser>

          <Login />,
        </ProtectedRouuter2realUser>
      },
      {
        path:"Sendcode/",
        element:
        <ProtectedRouuter2realUser>

          <Sendcode />,
        </ProtectedRouuter2realUser>
      },
      {
        path:"ForgotPassword/",
        element:
        <ProtectedRouuter2realUser>
          <ForgotPassword />,

        </ProtectedRouuter2realUser>
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  const toasterOptions = {
    position: "top-center",
    // autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    autoClose: 2500,
  };

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
      <ToastContainer {...toasterOptions} />
    </>
  );
}

export default App;
