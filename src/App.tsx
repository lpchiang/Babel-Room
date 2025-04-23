import AuthLayout from './pages/auth/layout';
import Login from './pages/auth/login/login';
import SignUp from './pages/auth/signup/sign-up';

const App = () => {
  return (
    <AuthLayout>
      <Login/>
    </AuthLayout>
  )
}

export default App