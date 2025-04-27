import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppSidebar } from './components/sidebar/app-sidebar';
import Layout from './layout';
import Auth from './pages/auth/auth';
import SignUp from './pages/auth/signup/sign-up';
import Login from './pages/auth/login/login';
import ConfirmEmail from './pages/auth/confirm-email/confirm-email';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth><SignUp /></Auth>} />
        <Route path="/auth/signup" element={<Auth><SignUp /></Auth>} />
        <Route path="/auth/login" element={<Auth><Login /></Auth>} />
        <Route path="/auth/confirm-email" element={<Auth><ConfirmEmail /></Auth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
