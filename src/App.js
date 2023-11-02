import './App.css';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import { ProductsPage } from './pages/product_page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);
function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
