import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SolarSystemPage from './components/SolarSystemPage';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0a0a0a;
  overflow: hidden;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/solar-system" element={<SolarSystemPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
