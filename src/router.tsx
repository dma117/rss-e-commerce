import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main";
import Cart from "./pages/cart";
import NotFound from "./pages/components/not-found";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '*',
    element: <NotFound />
  },
]);