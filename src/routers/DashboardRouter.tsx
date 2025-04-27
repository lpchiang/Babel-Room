// src/routers/DashboardRouter.js
import { Routes, Route } from 'react-router-dom';
import Forum from '../components/forum/forum';
import LearningProgressCard from '../components/menu/learn-progress';

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/docs" element={<LearningProgressCard />} />
      <Route path="/forum" element={<Forum />} />
    </Routes>
  );
};

export default DashboardRouter;
