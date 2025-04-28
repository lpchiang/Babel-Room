// src/routers/DashboardRouter.js
import { Routes, Route } from 'react-router-dom';
import Forum from '../components/forum/forum';
import Content from '../components/content/content';
import LearningProgressCard from '../components/menu/learn-progress';
import SimplePresentPage from '../components/content/simple-present';

const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/docs" element={<LearningProgressCard />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/simple-present" element={<SimplePresentPage />} />
      
      {/* Rota principal */}
      <Route path="/content" element={<Content title="Selecione uma lição" />} />
      
      {/* Rota para lições - IMPORTANTE: esta deve vir DEPOIS da rota /content */}
      <Route path="/content/:lessonId" element={<Content title="Lesson 1" />} />
    </Routes>
  );
};

export default DashboardRouter;