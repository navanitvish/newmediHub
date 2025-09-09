import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import PrivateRoute from './routes/PrivateRoute';
import { getUserProfile } from './redux/auth/authActions';
import BrandProductDetails from './pages/Medifarma/Productpage/BrandProductdetails';
import ProductDetails from './pages/Medifarma/ProductDetails';
import MyAppointments from './pages/Profiledata/MyAppointment';
import PrescriptionPage from './components/UI/Precription';
import OrderHistoryPage from './pages/Profiledata/OrderHistoryPage';
import PaymentShippingPolicy from './pages/PaymentShippingPolicy';
import ReplacementPolicy from './pages/ReplacementPolicy';



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

const MedicineSearch = lazy(() => import('./components/UI/MedicineSearch'));
const CategoryPage = lazy(() => import('./pages/LabTests/CategoryPage'));
const DoctorBookingModal = lazy(() => import('./components/UI/DoctorBookingModal'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const LabTestsPage = lazy(() => import('./pages/LabTests/Labtests'));
const DoctorSearchForm = lazy(() => import('./pages/Doctors/DoctorSearchForm'));
const DoctorResults = lazy(() => import('./pages/Doctors/DoctorResults'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

import { Toaster } from 'react-hot-toast';
import SDKVerification from './components/SDKVerification';
import VideoCallComponent from './components/Features/VideoCall';
import MediCatePage from './pages/Medifarma/Productpage/CategroyPage';

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
     {/* ✅ Global toast for entire app, shown only once */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />

    
      <BrowserRouter>

        <Suspense fallback={<div className="text-center py-10 text-lg">Loading...</div>}>
          <Routes>
          
            <Route element={<MainLayout />}>
          
           

              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<DoctorPage />} />

           
              <Route path="/consultation/:specialtyId" element={<DoctorConsultationPlatform />} />
              <Route path="/booking/:doctorId/:userId" element={<DoctorBookingModal />} />
              <Route path="/labs" element={<LabTestsPage />} />
              <Route path="/cart" element={<CartPages />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/categories/:categoryId" element={<CategoryPage />} />
              <Route path="/healthcard" element={<SmartHealthMembershipCards />} />
              <Route path="/medifarma" element={<Medifarma />} />
              <Route path="/medicategory/:mediId" element={<MediCatePage />} />
              <Route path="/search" element={<MedicineSearch />} />
              <Route path="/product/:productId" element={<ProductDetails />} />

              <Route path="/brands/:brandId" element={<BrandProductDetails />} />
             

              <Route path="/" element={<Navigate to="/doctors/search" replace />} />

            



         
              <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
              <Route path="/terms-of-service" element={<TermsOfService/>} />
              <Route path='/payement-shipping-policy' element={<PaymentShippingPolicy/>}/>
              <Route path="/replacement-policy" element={<ReplacementPolicy />} />
              

              
              
          {/* doctor video call */}
              <Route path="/video-call/:doctorId/:userId" element={<VideoCallComponent />} />
              
              {/* SDK Verification */}
              {/* <Route path="/sdk-verification" element={<SDKVerification />} /> */}
              
         




            
            {/* Doctor search form */}
            <Route path="/doctors/search" element={<DoctorSearchForm />} />
            
          
            {/* Doctor search results */}
            <Route path="/doctors/search-results" element={<DoctorResults />} />

              <Route element={<PrivateRoute />}>
                <Route path="/appointment" element={<AppointmentForm />} />
                <Route path="/helpcenter" element={<HelpCenter />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-appointments" element={<MyAppointments/>} />
                <Route path="/prescription-upload" element={<PrescriptionPage/>} />
                <Route path="/orders" element={<OrderHistoryPage />} />
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




// import React, { useEffect, Suspense, lazy } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import MainLayout from "./components/layout/MainLayout";
// import AuthLayout from "./components/layout/AuthLayout";
// import PrivateRoute from "./routes/PrivateRoute";
// import { getUserProfile } from "./redux/auth/authActions";
// import BrandProductDetails from "./pages/Medifarma/Productpage/BrandProductdetails";
// import ProductDetails from "./pages/Medifarma/ProductDetails";
// import MyAppointments from "./pages/Profiledata/MyAppointment";
// import PrescriptionPage from "./components/UI/Precription";

// // Lazy loaded pages
// const Home = lazy(() => import("./pages/Home/HomePage"));
// const DoctorPage = lazy(() => import("./pages/Doctors/DoctorPage"));
// const DoctorConsultationPlatform = lazy(() =>
//   import("./pages/Doctors/DoctorConsultation")
// );
// const AppointmentForm = lazy(() =>
//   import("./pages/Appointment/AppointmentForm")
// );
// const HelpCenter = lazy(() => import("./pages/HelpCenter/HelpCenter"));
// const SmartHealthMembershipCards = lazy(() =>
//   import("./pages/smartcard/SmartHealthMembershipCards")
// );
// const Medifarma = lazy(() => import("./pages/Medifarma/Medifarma"));
// const Login = lazy(() => import("./pages/Login"));
// const ProfilePage = lazy(() => import("./pages/Profile"));
// const CartPages = lazy(() => import("./pages/CartPage"));

// const MedicineSearch = lazy(() => import("./components/UI/MedicineSearch"));
// const CategoryPage = lazy(() => import("./pages/LabTests/CategoryPage"));
// const DoctorBookingModal = lazy(() =>
//   import("./components/UI/DoctorBookingModal")
// );
// const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
// const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
// const LabTestsPage = lazy(() => import("./pages/LabTests/Labtests"));
// const DoctorSearchForm = lazy(() => import("./pages/Doctors/DoctorSearchForm"));
// const DoctorResults = lazy(() => import("./pages/Doctors/DoctorResults"));
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import TermsOfService from './pages/TermsOfService';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//       staleTime: 300000,
//     },
//   },
// });

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       dispatch(getUserProfile());
//     }
//   }, [dispatch]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Suspense
//           fallback={<div className="text-center py-10 text-lg">Loading...</div>}
//         >
//           <Routes>
//             {/* Public Route: Login */}
//             <Route element={<AuthLayout />}>
//               <Route path="/login" element={<Login />} />
//             </Route>

//             {/* All other routes are protected */}
//             <Route element={<PrivateRoute />}>
//               <Route element={<MainLayout />}>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/doctors" element={<DoctorPage />} />
//                 <Route
//                   path="/consultation/:specialtyId"
//                   element={<DoctorConsultationPlatform />}
//                 />
//                 <Route
//                   path="/booking/:doctorId/:userId"
//                   element={<DoctorBookingModal />}
//                 />
//                 <Route path="/labs" element={<LabTestsPage />} />
//                 <Route path="/cart" element={<CartPages />} />
//                 <Route path="/checkout" element={<CheckoutPage />} />
//                 <Route path="/order-success" element={<OrderSuccessPage />} />
//                 <Route
//                   path="/category/:categoryId"
//                   element={<CategoryPage />}
//                 />
//                 <Route
//                   path="/healthcard"
//                   element={<SmartHealthMembershipCards />}
//                 />
//                 <Route path="/medifarma" element={<Medifarma />} />
//                 <Route path="/search" element={<MedicineSearch />} />
//                 <Route
//                   path="/product/:productId"
//                   element={<ProductDetails />}
//                 />
//                 <Route
//                   path="/brands/:brandId"
//                   element={<BrandProductDetails />}
//                 />
//                 <Route path="/my-appointments" element={<MyAppointments />} />
//                 <Route
//                   path="/prescription-upload"
//                   element={<PrescriptionPage />}
//                 />
//                 <Route path="/doctors/search" element={<DoctorSearchForm />} />
//                 <Route
//                   path="/doctors/search-results"
//                   element={<DoctorResults />}
//                 />
//                 <Route path="/appointment" element={<AppointmentForm />} />
//                 <Route path="/helpcenter" element={<HelpCenter />} />
//                 <Route path="/profile" element={<ProfilePage />} />
//               </Route>
//             </Route>
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// export default App;

