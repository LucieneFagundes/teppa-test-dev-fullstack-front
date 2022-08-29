import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import AddPlant from "../pages/AddPlant";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export function AppRoutes() {
  
  const Private = ({ children }: any) => {

    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Private> <Home /> </Private> } />
          <Route path="/add" element={ <Private> <AddPlant /> </Private> } />
          <Route path="/update/:id" element={ <Private> <AddPlant /> </Private> } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
