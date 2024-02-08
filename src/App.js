import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import StoryPage from "./pages/story/StoryPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<StoryPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
