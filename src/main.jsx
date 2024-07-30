import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import store from './redux/store.js';
import { Provider } from 'react-redux';

import router from './routes/router.jsx';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster
      richColors
      closeButton
      position="top-right"
    />
  </Provider>
  // </React.StrictMode>
);
