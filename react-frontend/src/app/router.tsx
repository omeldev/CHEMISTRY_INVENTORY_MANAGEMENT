import {createBrowserRouter, Navigate} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import NotFoundPage from "../page/error/not-found/NotFound.tsx";
import {SubstanceOverview} from "../page/substance/overview/SubstanceOverview.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout/>, // Header / Sidebar / Outlet
    children: [
      {
        path: '/',
        element: <SubstanceOverview/>
      },
    ],
  },

  {
    path: '/404',
    element: <NotFoundPage/>
  },
  {
    path: '*',
    element: <Navigate to="/404" replace/>
  },
]);

export default router;
