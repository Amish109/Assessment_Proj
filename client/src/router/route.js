import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import About from "../pages/min-transaction-account-list/MinTransaction";
import Contact from "../pages/productlist/PoductList";
import Error from "../pages/error_page/Error";
import Home from "../pages/home/Home";
let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
		ErrorBoundary : Error,
		children: [
			{
				path: "/",
				Component: Home,
			},
			{
				path: "/min-transaction-account-list",
				Component:About,
			},
			{
				path: "/product-list",
				Component: Contact,
			},
		],
  },
]);
export default router;