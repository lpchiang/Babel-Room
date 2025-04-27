// src/routers/AuthRouter.js
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/auth/auth';
import SignUp from '../pages/auth/signup/sign-up';
import Login from '../pages/auth/login/login';
import ConfirmEmail from '../pages/auth/confirm-email/confirm-email';

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth><Login /></Auth>} />
      <Route path="/auth/signup" element={<Auth><SignUp /></Auth>} />
      <Route path="/auth/login" element={<Auth><Login /></Auth>} />
      <Route path="/auth/confirm-email" element={<Auth><ConfirmEmail /></Auth>} />
    </Routes>
  );
};

export default AuthRouter;
