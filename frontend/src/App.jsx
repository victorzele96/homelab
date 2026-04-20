import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import ChatAI from './pages/ChatAI';
import JobTracker from './pages/JobTracker';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatAI />} />
          <Route path="/jobs" element={<JobTracker />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;