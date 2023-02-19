import React from 'react';
import ReactDOM from 'react-dom/client';
import { withProviders } from "./providers";
import './index.css';
import {Routing} from "pages";

import { Provider } from 'react-redux';

import store from 'app/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RoutedApp = withProviders(Routing);

root.render(
    <Provider store={store}>
      <React.StrictMode>
        <RoutedApp />
      </React.StrictMode>
    </Provider>
);
