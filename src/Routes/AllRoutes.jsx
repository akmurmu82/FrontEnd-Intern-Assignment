import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../Pages/RegistrationPage';
import RacePage from '../Pages/RacePage';
import ResultPage from '../Pages/ResultPage';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/racepage" element={<RacePage />} />
      <Route path="/resultpage" element={<ResultPage />} />
    </Routes>
  );
}

export default AllRoutes;