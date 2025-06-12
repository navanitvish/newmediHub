// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Routes
import PrivateRoute from './routes/PrivateRoute';
import { getUserProfile } from './redux/auth/authActions';
// Pages
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 300000, // 5 minutes
    },
  },
});

// import Dashboard from './pages/Dashboard'; // Create this
// import NotFound from './pages/NotFound'; // Create this
import Home from './pages/Home/HomePage';
import AppointmentForm from './pages/Appointment/AppointmentForm';
import HelpCenter from './pages/HelpCenter/HelpCenter';
import DoctorPage from './pages/Doctors/DoctorPage'
import DoctorConsultationPlatform from './pages/Doctors/DoctorConsultation';
import LabTestsPage from './pages/LabTests/Labtests';
import AppointmentBookingSystem from './pages/Appointment/AppointmentBookingSystem';
import SmartHealthMembershipCards from './pages/smartcard/SmartHealthMembershipCards';
import Medifarma from './pages/Medifarma/Medifarma';
import Login from './pages/Login';
import ProfilePage from './pages/Profile';
import CartPages from './pages/CartPage';
import DoctorSearchResults from './pages/Doctors/DoctorSearchResults';
import MedicineSearch from './components/UI/MedicineSearch';
import CategoryPage from './pages/LabTests/CategoryPage';
import DoctorBookingModal from './components/UI/DoctorBookingModal';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in localStorage and try to authenticate
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorPage />} />
            <Route path="/DoctorSearchResults" element={<DoctorSearchResults />} />
            <Route path="/consultation/:specialtyId" element={<DoctorConsultationPlatform />} />
            <Route path="/booking/:doctorId" element={<DoctorBookingModal />} />
            <Route path="/labs" element={<LabTestsPage />} />
            <Route path="/cart" element={<CartPages />} />
            <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />


            <Route path="/healthcard" element={<SmartHealthMembershipCards />} />
            <Route path="/medifarma" element={<Medifarma />} />
            <Route path="/search" element={<MedicineSearch />} />

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
              <Route path="/appointment" element={<AppointmentForm />} />
              <Route path="/helpcenter" element={<HelpCenter />} />

              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />

          </Route>

          {/* 404 page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;