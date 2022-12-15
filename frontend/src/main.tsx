import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Admin from './components/Admin';
import Home from './components/Home';
import './index.css';
import CardPage from './pages/CardPage';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/admin', element: <Admin /> },
      { path: '/cards/:cardId', element: <CardPage /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
