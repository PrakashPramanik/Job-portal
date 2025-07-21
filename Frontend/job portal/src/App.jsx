
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import StudentDashboard from './pages/StudentDashboard ';
import RecruiterDashboard from './pages/RecruiterDashboard';
import EditProfile from './pages/EditProfile';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import PostJob from './pages/PostJob';
import EditJobPost from "./pages/EditJobPost";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/studentDashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiterDashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/post-job" element={<PostJob />} /> */}
        <Route path="/edit-job/:jobId" element={<EditJobPost />} />



        {/* <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/recruiterDashboard" element={<RecruiterDashboard />} />

        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
};

export default App;
