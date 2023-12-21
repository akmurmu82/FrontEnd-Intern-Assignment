import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../Pages/RegistrationPage';
import RacePage from '../Pages/RaceTrack';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/racepage" element={<RacePage />} />
    </Routes>
  );
}

export default AllRoutes;