import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';
import { extendedApiSlice } from './features/post/postsSlice';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

store.dispatch(fetchUsers())
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
