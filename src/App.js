import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from "./routing/Navigation"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation></Navigation>
      </Router>
    </div>
  );
}

export default App;
