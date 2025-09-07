import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Todo from './pages/Todo';
import { AlertProvider } from './context-provider/Alert-provider';
import { AuthProtected } from './routes/Auth-protected';

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route element={<AuthProtected />}>
            <Route path="/login" element={<Login />} />
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Routes>
      </Router>
    </AlertProvider >
  );
};

export default App;