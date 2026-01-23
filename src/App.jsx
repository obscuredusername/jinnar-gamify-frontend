import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyAccount from './pages/VerifyAccount';
import JinnarChallenge from './pages/JinnarChallenge';
import FAQ from './pages/FAQ';
import Rules from './pages/Rules';
import Leaderboards from './pages/Leaderboards';
import Winners from './pages/Winners';
import Announcements from './pages/Announcements';
import MediaHighlights from './pages/MediaHighlights';
import PastWinners from './pages/PastWinners';
import UserDashboard from './pages/UserDashboard';
import UploadVideo from './pages/UploadVideo';
import SubmitPostLink from './pages/SubmitPostLink';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        {/* Keep old routes for backward compatibility */}
        <Route path="/signin" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Navigate to="/register" replace />} />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route path="/challenge" element={<JinnarChallenge />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/media" element={<MediaHighlights />} />
        <Route path="/past-winners" element={<PastWinners />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-link"
          element={
            <ProtectedRoute>
              <SubmitPostLink />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

