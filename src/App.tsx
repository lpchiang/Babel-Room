import { NavigationMenuDemo } from './components/navigation/navigation';
import { AppSidebar } from './components/sidebar/app-sidebar';
import Layout from './layout';
import Auth from './pages/auth/auth';
import Login from './pages/auth/login/login';
import SignUp from './pages/auth/signup/sign-up';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <>
      <NavigationMenuDemo />
      <Layout>      </Layout>
    </>
  )
}

export default App