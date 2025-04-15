// // src/components/layout/AuthLayout.jsx
// import React from 'react';
// // import { useSelector } from 'react-redux';
// // import { Navigate } from 'react-router-dom';


// const AuthLayout = ({ children }) => {
//   // const { isAuthenticated } = useSelector((state) => state.auth);
  
//   // // Redirect if already authenticated
//   // if (isAuthenticated) {
//   //   return <Navigate to="/dashboard" />;
//   // }
  
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
      
     
        
//         {/* Right side form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-8">
//           <div className="w-full max-w-md">
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;


// src/components/layout/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export default AuthLayout;