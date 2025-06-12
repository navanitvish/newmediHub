import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import PrivateRoute from './routes/PrivateRoute';
import { getUserProfile } from './redux/auth/authActions';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home/HomePage'));
const DoctorPage = lazy(() => import('./pages/Doctors/DoctorPage'));
const DoctorConsultationPlatform = lazy(() => import('./pages/Doctors/DoctorConsultation'));
const AppointmentForm = lazy(() => import('./pages/Appointment/AppointmentForm'));
const HelpCenter = lazy(() => import('./pages/HelpCenter/HelpCenter'));
const SmartHealthMembershipCards = lazy(() => import('./pages/smartcard/SmartHealthMembershipCards'));
const Medifarma = lazy(() => import('./pages/Medifarma/Medifarma'));
const Login = lazy(() => import('./pages/Login'));
const ProfilePage = lazy(() => import('./pages/Profile'));
const CartPages = lazy(() => import('./pages/CartPage'));
const DoctorSearchResults = lazy(() => import('./pages/Doctors/DoctorSearchResults'));
const MedicineSearch = lazy(() => import('./components/UI/MedicineSearch'));
const CategoryPage = lazy(() => import('./pages/LabTests/CategoryPage'));
const DoctorBookingModal = lazy(() => import('./components/UI/DoctorBookingModal'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 300000,
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div className="text-center py-10 text-lg">Loading...</div>}>
          <Routes>
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

              <Route element={<PrivateRoute />}>
                <Route path="/appointment" element={<AppointmentForm />} />
                <Route path="/helpcenter" element={<HelpCenter />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
