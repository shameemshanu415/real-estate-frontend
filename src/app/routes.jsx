// import { createBrowserRouter, Navigate } from "react-router-dom";
// import { Welcome } from "./components/Welcome";
// import { Login } from "./components/Login";
// import { SignUp } from "./components/SignUp"; 
// import MainApp from "./MainApp";

// // Protected Route Component
// function ProtectedRoute({ children }) {
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// }

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Welcome />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",  // Add this new route
//     element: <SignUp />,
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <ProtectedRoute>
//         <MainApp />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "*",
//     element: <Navigate to="/" replace />,
//   },
// ]);


import { createBrowserRouter, Navigate } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import MainApp from "./MainApp";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainApp />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);