import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import HelpingHand from "./pages/HelpingHand";
import Success from "./pages/Success";
import MathGames from "./pages/MathGames";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages WITHOUT navbar */}
        <Route path="/" element={<ChildLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/parent-login" element={<ParentLogin />} />
        <Route path="/success" element={<Success />} />

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
        <Route
          path="/helping-hand"
          element={<Layout><HelpingHand /></Layout>}
        />
        <Route
          path="/math-games"
          element={<Layout><MathGames /></Layout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
