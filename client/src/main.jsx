import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from "./error-page";
import Query, {
  loader as queryLoader,
} from "./routes/query";
import Root, { 
  loader as rootLoader,
  action as rootAction,
 } from "./routes/root";
 import EditQuery, {
  action as editAction,
 } from "./routes/edit";
 import { action as destroyAction } from "./routes/destroy";
 import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          { index: true, element: <Index/> },
          {
            path: "querys/:queryId",
            element: <Query/>,
            loader: queryLoader,
          },
          {
            path: "querys/:queryId/edit",
            element: <EditQuery/>,
            loader: queryLoader,
            action: editAction,
          },
          {
            path: "querys/:queryId/destroy",
            action: destroyAction,
          },
        ],
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
