import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Register from "./pages/Register";
import ParentLogin from "./pages/ParentLogin";
import ChildLogin from "./pages/ChildLogin";
import Checkin from "./pages/Checkin";
import Match from "./pages/Match";
import Story from "./pages/Story";
import Draw from "./pages/Draw";
import Sounds from "./pages/Sounds";
import EmotionalDashboard from "./pages/EmotionalDashboard";
import WeatherDetails from "./pages/WeatherDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT navbar */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<ChildLogin />} />
        <Route path="/parent-login" element={<ParentLogin />} />

        {/* Pages WITH navbar */}
        <Route
          path="/checkin"
          element={<Layout><Checkin /></Layout>}
        />
        <Route
          path="/match"
          element={<Layout><Match /></Layout>}
        />
        <Route
          path="/story"
          element={<Layout><Story /></Layout>}
        />
        <Route
          path="/draw"
          element={<Layout><Draw /></Layout>}
        />
        <Route
          path="/sounds"
          element={<Layout><Sounds /></Layout>}
        />
        <Route
          path="/dashboard"
          element={<Layout><EmotionalDashboard /></Layout>}
        />
        <Route
          path="/weather-details"
          element={<Layout><WeatherDetails /></Layout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
