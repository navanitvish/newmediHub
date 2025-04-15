// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from './redux/slices/authSlice';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Routes
import PrivateRoute from './routes/PrivateRoute';

// Pages
import Login from './components/auth/Login';
import OtpVerification from './components/auth/OtpVerification';
// import Dashboard from './pages/Dashboard'; // Create this
// import NotFound from './pages/NotFound'; // Create this
import Home from './pages/Home/HomePage';
import Profile from './pages/Profile/Profile';
import AppointmentForm from './pages/Appointment/AppointmentForm';
import HelpCenter from './pages/HelpCenter/HelpCenter';
import DoctorPage from './pages/Doctors/DoctorPage'
import DoctorConsultationPlatform from './pages/Doctors/DoctorConsultation';
import LabTestsPage from './pages/LabTests/Labtests';
import AppointmentBookingSystem from './pages/Appointment/AppointmentBookingSystem';
import SmartHealthMembershipCards from './pages/smartcard/SmartHealthMembershipCards';
import Medifarma from './pages/Medifarma/Medifarma';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in localStorage and try to authenticate
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/consultation" element={<DoctorConsultationPlatform />} />
          <Route path="/labs" element={<LabTestsPage />} />
          <Route path="/healthcard" element={<SmartHealthMembershipCards />} />
          <Route path="/medifarma" element={<Medifarma />} />

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/*
          <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} />

          <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} />



          
          {/* Private routes */}


          {/* labtest */}
      
          {/* <Route path="/labtest/:id" element={<LabTestDetails />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}

          {/* Uncomment the line below to use the DoctorConsultationPlatform */}
          {/* <Route path="/doctor-consultation" element={<DoctorConsultationPlatform />} /> */}


          <Route element={<PrivateRoute />}>
            <Route path="/appointment" element={<AppointmentBookingSystem />} />
            <Route path="/helpcenter" element={<HelpCenter />} />

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
        </Route>

        {/* 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;