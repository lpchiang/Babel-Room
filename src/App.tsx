// src/App.js
import { BrowserRouter } from 'react-router-dom';
import { NavigationMenuDemo } from './components/navigation/navigation';
import Layout from './layout';
import AuthRouter from './routers/AuthRouter'; 
import DashboardRouter from './routers/DashboardRouter'; 

const App = () => {
  return (
    <BrowserRouter>
      <AuthRouter />
      
        <NavigationMenuDemo />
      <Layout>
        <DashboardRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
