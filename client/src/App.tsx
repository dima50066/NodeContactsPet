import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import ResetPassword from './components/auth/ResetPassword';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
};

export default App;
